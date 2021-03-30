import React, {Component} from 'react';
import {Col, Container, Row, Button, InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import {Map, Marker,Polyline, Popup, TileLayer, FeatureGroup} from 'react-leaflet';
import {LOG} from "../../utils/constants";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Coordinates from "coordinate-parser";
import 'leaflet/dist/leaflet.css';
import Find from './Find';
import Distance from './Distance';
import Trip from './Trip';

import { sendServerRequest, isJsonResponseValid, getOriginalServerPort } from "../../utils/restfulAPI";
import * as distancesSchema from "../../../schemas/DistancesResponse";

const SerPort = getOriginalServerPort()

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = L.latLng(40.5734, -105.0865);
const MARKER_ICON = L.icon({iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";

export default class Atlas extends Component {

    constructor(props) {
        super(props);

        this.requestUserLocation = this.requestUserLocation.bind(this);
        this.handleGeolocation = this.handleGeolocation.bind(this);
        this.setMarker = this.setMarker.bind(this);
	    this.clearTable = this.clearTable.bind(this);
        this.handleRemoveDestination = this.handleRemoveDestination.bind(this);
        this.processCoordinatesInput = this.processCoordinatesInput.bind(this);
	    this.updateCooInput = this.updateCooInput.bind(this);
        this.addTrip = this.addTrip.bind(this);
        this.addTableAndPinOnMap = this.addTableAndPinOnMap.bind(this);
        this.MarkSelect = this.MarkSelect.bind(this);
        this.requestUserLocation();
        this.renderLocationTable = this.renderLocationTable.bind(this);
        this.formatDataFromAtlas = this.formatDataFromAtlas.bind(this);
        this.fetchDistances = this.fetchDistances.bind(this);
        this.processDistanceResponse = this.processDistanceResponse.bind(this);
        this.sumDistances = this.sumDistances.bind(this);
        

        this.state = {
            sPort: getOriginalServerPort(),
            modalDistanceResponse: false,
            validServer: null,
            mapCenter: MAP_CENTER_DEFAULT,
            markerPosition: MAP_CENTER_DEFAULT,
            names: null,
            locations: [],

            line: [],

            distances: [],
            coordinates: {
                inputText: "",
                latLng: null
            },
            testData: [
                {
                  fromlat: "40.570968",
                  fromlng: "-105.085838",
                  tolat: "39.955200",
                  tolng: "-104.928800",
                },
                {
                  fromlat: "39.955200",
                  fromlng: "-104.928800",
                  tolat: "34",
                  tolng: "-118",
                }
            ]
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            <Find AddTrip={this.addTrip}/>
			                {this.renderCoordinatesInput()}
                            {this.renderLeafletMap()}
                            {this.renderFindMeButtom()}
                            <Distance locations = {this.state.locations}
                            parentCallback = {this.handleCallback}/>
                            <Trip locations = {this.state.locations}/>
                            <h4><p><b>Round Trip distance: {this.sumDistances(this.state.distances.length)} miles</b> </p></h4>
                            {this.renderLocationTable()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
    addTrip(lat, lng){
        const inputtxt = lat + ',' + lng;
        const coordinates = this.state.coordinates;
        coordinates.latLng = this.getCoordinatesOrNull(inputtxt);
        this.setState({coordinates: coordinates});
        this.addTableAndPinOnMap();
    }

    async addTableAndPinOnMap(){
        const coordinates = this.state.coordinates;
        this.setState({mapCenter: coordinates.latLng, markerPosition: coordinates.latLng});
        //this.getAddress(coordinates.latLng);
	    //this.setState({locations: [coordinates.latLng, ...this.state.locations]});
        const addressData = await(await fetch(GEOCODE_URL+`${coordinates.latLng.lng},${coordinates.latLng.lat}`)).json();
        const addressLabel = (addressData.address !== undefined) ? addressData.address.LongLabel : "Unknown";
        this.setState({address: addressLabel});
        const locations = this.state.locations;
        const namelatlng = {name: addressLabel, ...coordinates.latLng};
        locations.unshift(namelatlng);
        this.setState({locations: locations});
        this.processLocationForLine();
        
    }

    processLocationForLine(){
        const loca = [];
        if(this.state.locations.length > 1){
            for(let i = 1; i< this.state.locations.length; i++){
                let location = {
                    fromlat: this.state.locations[i-1].lat,
                    fromlng: this.state.locations[i-1].lng,
                    tolat: this.state.locations[i].lat,
                    tolng: this.state.locations[i].lng
                };
                loca.push(location);
            }
        }

        this.setState({line: loca}); 

        if(this.state.locations.length > 2){
            let location = {
                fromlat: this.state.locations[0].lat,
                fromlng: this.state.locations[0].lng,
                tolat: this.state.locations[this.state.locations.length - 1].lat,
                tolng: this.state.locations[this.state.locations.length - 1].lng
            };
            loca.push(location);
        }
        this.setState({line: loca});
        //console.log(this.state.line);   
    }
    renderLeafletMap() {
        return (
            <Map
                className={'mapStyle mapHightRefine'}
                boxZoom={false}
                useFlyTo={true}
                zoom={15}
                minZoom={MAP_MIN_ZOOM}
                maxZoom={MAP_MAX_ZOOM}
                maxBounds={MAP_BOUNDS}
                center={this.state.mapCenter}
                onClick={this.setMarker}
            >   

                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
                {this.returnFeatureGroup()}
                {this.getMarker()}
            </Map>
        );
    }
    returnFeatureGroup() {
        return (
            <FeatureGroup>
                {this.state.locations.map((location, i) => {
                    return <Marker icon={MARKER_ICON} position={location}/>
                    }
                )}
                {this.state.line.map(({fromlat, fromlng, tolat, tolng}) => {
                    return <Polyline positions={[[fromlat, fromlng], [tolat, tolng],]} color={'blue'} />
                    }
                )}
            </FeatureGroup>
        );
    }
    sumDistances(end){
        let sum=0;
        for (let i=0; i<end; i++){
            sum+=this.state.distances.slice(0).reverse()[i]
        }
        return sum;
    }
    renderLocationTable() {
        //apply this function to each element in locations array
        //console.log(this.state.distances)
        //console.log(this.state.locations)
        //reverseDistances = this.state.distances.slice(0).reverse();
        const locations = this.state.locations.map((location, i) =>
            <tr key={i}>
                
                <th>{location.name}</th>
                <th>{location.lat.toFixed(6)}</th>
                <th>{location.lng.toFixed(6)}</th>
                <th>  {this.state.distances[i]}</th>
                <th><button color="primary" type="button" className="btn btn-secondary btn-block float-right" onClick ={() => this.MarkSelect(location)}>mark </button></th>      
                <th><button color="primary" type="button" className="btn btn-secondary btn-block float-right" onClick ={() => this.handleRemoveDestination(i)}>X </button></th> 
                
            </tr>
            );

            //DELETE
            //console.log(locations);



        return(

            <table className="table table-striped table-bordered table-sm table-responsive">
                <thead>
                    <tr> 
                        <th><b>Address</b></th>
                        <th><b>Latitude</b></th>
                        <th><b>Longitude</b></th>
                        <th><b>Cumulative Distance</b></th>
                        <th className="smallCell"><b>Mark</b></th>   
			<th className="smallCell"><Button color="primary" type="button" className="btn btn-secondary btn-block float-right" onClick={this.clearTable}>Clear</Button></th>
                    </tr>
                </thead>
                <tbody>{locations}</tbody>
            </table>
        );
    }
	
    clearTable(){
	    this.state.locations.length = 0;
	    this.setState({markerPosition: MAP_CENTER_DEFAULT, mapCenter: MAP_CENTER_DEFAULT, locations : this.state.locations});
        this.getAddress(MAP_CENTER_DEFAULT).then();
        this.processLocationForLine();
        this.fetchDistances();
    }

    handleRemoveDestination(i){
        if(this.state.locations.length <= 1){this.clearTable()}
        else
        {
            const locations = this.state.locations;
            locations.splice(i,1);
            this.setState({markerPosition: locations[0], mapCenter: locations[0], locations: locations});
            this.getAddress(locations[0]).then();
            this.fetchDistances();
        }
        this.processLocationForLine();

    }  

    async setMarker(mapClickInfo) {
        const addressData = await(await fetch(GEOCODE_URL+`${mapClickInfo.latlng.lng},${mapClickInfo.latlng.lat}`)).json();
        const addressLabel = (addressData.address !== undefined) ? addressData.address.LongLabel : "Unknown";
        this.setState({names: addressLabel});
        this.setState({address: addressLabel});
        const locations = this.state.locations;
        const namelatlng = {name: this.state.names, ...mapClickInfo.latlng};
        locations.unshift(namelatlng);
        this.setState({markerPosition: mapClickInfo.latlng, mapCenter: mapClickInfo.latlng, locations: locations});
        this.processLocationForLine()
        this.fetchDistances();
        //console.log(this.state.distances);
    }
    //render marker
    getMarker() {
        if (this.state.markerPosition) {
            return (
                <Marker ref={(ref) => this.showMarkerPopup(ref)} position={this.state.markerPosition} icon={MARKER_ICON}>
                    <Popup offset={[0, -18]} className="font-weight-bold">
                        {this.state.address}
                        <br/>
                        {this.getLatLngText(this.state.markerPosition)}
                    </Popup>
                </Marker>
            );
        }
    }

    showMarkerPopup(ref) {
        if (ref) {
            ref.leafletElement.openPopup();
        }
    }

    getLatLngText(latLng) {
        return latLng.lat.toFixed(6) + ', ' + latLng.lng.toFixed(6);
    }

    async getAddress(latlng){
        const addressData = await(await fetch(GEOCODE_URL+`${latlng.lng},${latlng.lat}`)).json();
        const addressLabel = (addressData.address !== undefined) ? addressData.address.LongLabel : "Unknown";
        this.setState({address: addressLabel});
    }

    renderCoordinatesInput() {
        const coordinates = this.state.coordinates;
        const validCoordinates = coordinates.latLng != null;
        const inputBoxEmpty = !coordinates.inputText;
        return (
            <InputGroup className="mb-1">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Coordinates Find</InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder="Latitude, Longitude"
                    onChange={this.processCoordinatesInput}
                    value={coordinates.inputText}
                    valid={validCoordinates}
                    invalid={!inputBoxEmpty && !validCoordinates}
                />
		        <InputGroupAddon addonType="append">
                    <Button onClick={this.updateCooInput} color="success">Go!</Button>
                </InputGroupAddon>
            </InputGroup>
        );
    }

    renderFindMeButtom(){
        return (
        <Button className="my-1" onClick ={this.requestUserLocation} color = "success" block>Find Me</Button>
        ); 
    }
    requestUserLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.handleGeolocation, this.handleGeolocationError);
        }else {
            LOG.info("Geolocation is turned off or not supported by your browser.");
        }
    }
    async handleGeolocation(position){
        const latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
        const addressData = await(await fetch(GEOCODE_URL+`${latlng.lng},${latlng.lat}`)).json();
        const addressLabel = (addressData.address !== undefined) ? addressData.address.LongLabel : "Unknown";
        this.setState({names: addressLabel});
        this.setState({address: addressLabel});
        const locations = this.state.locations;
        const namelatlng = {name: this.state.names, lat: position.coords.latitude, lng: position.coords.longitude};
        locations.unshift(namelatlng);
        this.setState({mapCenter: latlng, markerPosition: latlng, locations: locations});
        LOG.info('The user is located at ${JSON.stringify(latlng)}.');
        this.processLocationForLine();
    }
    handleGeolocationError(){
        LOG.info("Error retrieving the user's positions.")
    }
      
    processCoordinatesInput(onChangeEvent) {
        const inputText = onChangeEvent.target.value;
        const coordinates = this.state.coordinates;
        coordinates.inputText = inputText;
        coordinates.latLng = this.getCoordinatesOrNull(inputText);
        this.setState({coordinates: coordinates});
    }

    async updateCooInput() {
        const coordinates = this.state.coordinates;
	    if(coordinates.latLng != null){
            this.setState({mapCenter: coordinates.latLng, markerPosition: coordinates.latLng});
            const addressData = await(await fetch(GEOCODE_URL+`${coordinates.latLng.lng},${coordinates.latLng.lat}`)).json();
            const addressLabel = (addressData.address !== undefined) ? addressData.address.LongLabel : "Unknown";
            this.setState({address: addressLabel});
            const locations = this.state.locations;
            const namelatlng = {name: addressLabel, ...coordinates.latLng};
            locations.unshift(namelatlng);
            this.setState({locations: locations});
            //this.setState({locations: [coordinates.latLng, ...this.state.locations]});\
            this.processLocationForLine();
	    }
    }
    
    getCoordinatesOrNull(coordinateString) {
        try {
          const convertedCoordinates = new Coordinates(coordinateString);
          return {
            lat: convertedCoordinates.getLatitude(),
            lng: convertedCoordinates.getLongitude()
          };
        } catch (error) {
          return null;
        }
    }

    renderResultText() {
        const latLng = this.state.coordinates.latLng;
        if (latLng) {
          return (
            <h4 className="my-1">
              Latitude: {latLng.lat}, Longitude: {latLng.lng}
            </h4>
          );
        }
    }
    handleCallback = (childData) =>{
        this.setState({distances: childData})
    }
    
    MarkSelect(location){
        this.getAddress(location);
        this.setState({markerPosition: location, mapCenter: location});
    }
   formatDataFromAtlas(){
        const formattedLocations = [];
        for(let i =0; i< this.state.locations.length; i++){
            let location = {
                latitude: (this.state.locations[i].lat).toString(),
                longitude: (this.state.locations[i].lng).toString()
            };
            formattedLocations.push(location);
        }
        return formattedLocations;
    }
    async fetchDistances() {
        const url = this.state.sPort;
        sendServerRequest({ requestType: "distances", places: this.formatDataFromAtlas(), earthRadius: 3959 }, url)
            .then(distancesResponse => {
                if (Response) {
                    this.processDistanceResponse(distancesResponse);
                } else {
                    this.setState({ validServer: false, places: null, earthRadius: null, distances: null });
                }
            });
    }
   async processDistanceResponse(distancesResponse) {
        if (!isJsonResponseValid(distancesResponse, distancesSchema)) {
            this.setState({ validServer: false, find: false });
        } else {
            this.setState({ validServer: true, places: distancesResponse.places, earthRadius: distancesResponse.earthRadius, distances: distancesResponse.distances });
            return this.state.places;
            
        }
    }
}
