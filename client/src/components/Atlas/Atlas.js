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
import Save from './Save';
import CoordinatesFind from './CoordinatesFind';
import Load from './Load';

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
	    
        //Mark-These are async functions-these statements are not necessary if the function is changed to = () =>{ } format
        //It is possible we can remove these statements as well, but when I tried, I got an error, so I will get back to it later
        this.handleGeolocation = this.handleGeolocation.bind(this);
        this.setMarker = this.setMarker.bind(this);
        this.updateCooInput = this.updateCooInput.bind(this);
        this.addTableAndPinOnMap = this.addTableAndPinOnMap.bind(this);
        this.fetchDistances = this.fetchDistances.bind(this);
        this.processDistanceResponse = this.processDistanceResponse.bind(this);
        this.requestUserLocation();
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
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            <Find AddTrip={this.addTrip}/>
                            <CoordinatesFind
                                coordinates = {this.state.coordinates}
                                processCoordinatesInput = {this.processCoordinatesInput}
                                updateCooInput = {this.updateCooInput}
                            />
                            {this.renderLeafletMap()}
                            {this.renderFindMeButtom()}
                            <Load AddTrip={this.addTrip}/>
                            <Distance
                                locations = {this.state.locations}
                                parentCallback = {this.handleCallback}
                            />
                            <Trip locations = {this.state.locations}/>
                            <h4><p><b>Round Trip distance: {this.sumDistances(this.state.distances.length)} miles</b> </p></h4>
                            {this.renderLocationTable()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
    addTrip = (lat, lng)=>{
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

    processLocationForLine=()=>{
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
    }
    renderLeafletMap=()=>{
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
    returnFeatureGroup=()=>{
        return (
            <FeatureGroup>
                {this.state.locations.map((location, i) => {
                    return <Marker key = {i} icon={MARKER_ICON} position={location}/>
                    }
                )}
                {this.state.line.map(({fromlat, fromlng, tolat, tolng}, i) => {
                    return <Polyline key = {i} positions={[[fromlat, fromlng], [tolat, tolng],]} color={'blue'} />
                    }
                )}
            </FeatureGroup>
        );
    }
    sumDistances=(end)=>{
        let sum=0;
        for (let i=0; i<end; i++){
            sum+=this.state.distances.slice(0).reverse()[i]
        }
        return sum;
    }
    renderLocationTable=()=>{
        //apply this function to each element in locations array
        //reverseDistances = this.state.distances.slice(0).reverse();
        const locations = this.state.locations.map((location, i) =>
            <tr key={i}>
                
                <th>{location.name}</th>
                <th>{location.lat.toFixed(6)}</th>
                <th>{location.lng.toFixed(6)}</th>
                <th>  {this.state.distances[i]}</th>
                <th><button color="primary" type="button" className="btn btn-secondary btn-block float-right" onClick ={() => this.MarkSelect(location)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin" viewBox="0 0 16 16">
  <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z"/>
</svg></button></th>      
                <th><button color="primary" type="button" className="btn btn-secondary btn-block float-right" onClick ={() => this.handleRemoveDestination(i)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg> </button></th> 
                
            </tr>
            );



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
            		        <th className="smallCell"><Save locations = {this.state.locations} distances ={this.state.distances} /></th>
                    </tr>
                </thead>
                <tbody>{locations}</tbody>
            </table>
        );
    }
	
    clearTable=()=>{
    	this.state.locations.length = 0;
    	this.setState({markerPosition: MAP_CENTER_DEFAULT, mapCenter: MAP_CENTER_DEFAULT, locations : this.state.locations});
        this.getAddress(MAP_CENTER_DEFAULT).then();
        this.processLocationForLine();
        this.fetchDistances();
    }

    handleRemoveDestination=(i)=>{
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
    }
    //render marker
    getMarker=()=>{
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

    showMarkerPopup(ref){
        if (ref) {
            ref.leafletElement.openPopup();
        }
    }

    getLatLngText(latLng){
        return latLng.lat.toFixed(6) + ', ' + latLng.lng.toFixed(6);
    }

    async getAddress(latlng){
        const addressData = await(await fetch(GEOCODE_URL+`${latlng.lng},${latlng.lat}`)).json();
        const addressLabel = (addressData.address !== undefined) ? addressData.address.LongLabel : "Unknown";
        this.setState({address: addressLabel});
    }

    renderCoordinatesInput=()=>{
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

    renderFindMeButtom=()=>{
        return (
        <Button className="my-1" onClick ={this.requestUserLocation} color = "success" block>Find Me</Button>
        ); 
    }
    requestUserLocation=()=>{
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
      
    processCoordinatesInput=(onChangeEvent)=>{
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

    renderResultText=()=>{
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
    
    MarkSelect=(location)=>{
        this.getAddress(location);
        this.setState({markerPosition: location, mapCenter: location});
    }
   formatDataFromAtlas=()=>{
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
