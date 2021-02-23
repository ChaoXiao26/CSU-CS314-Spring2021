import React, {Component} from 'react';
import {Col, Container, Row, Button, InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {LOG} from "../../utils/constants";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Coordinates from "coordinate-parser";
import 'leaflet/dist/leaflet.css';

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

        this.state = {
            mapCenter: MAP_CENTER_DEFAULT,
            markerPosition: MAP_CENTER_DEFAULT,
            locations: [],
            coordinates: {
                inputText: "",
                latLng: null
            }
        };
    }

    render() {
        return (
            <div>
                <Container>
                    {this.renderCoordinatesInput()}
                    {/* {this.renderResultText()} */}
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            {this.renderLeafletMap()}
                            {this.renderFindMeButtom()}
                            {this.renderLocationTable()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    renderLeafletMap() {
        return (
            <Map
                className={'mapStyle'}
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
                {this.getMarker()}
            </Map>
        );
    }
    renderLocationTable() {
        //apply this function to each element in locations array
        const locations = this.state.locations.map((location, i) =>
            <tr key={i+=1}>
                <th>#{i}</th>
                <th>{location.lat.toFixed(6)}</th>
                <th>{location.lng.toFixed(6)}</th> 
                <th><button color="primary" type="button" className="btn btn-secondary" onClick ={() => this.handleRemoveDestination(i)}>X </button></th> 
            </tr>
            );
        return(
            <table width="100%" border="1">
                <thead>
                    <tr> 
                        <th><b>Number</b></th>
                        <th><b>Latitude</b></th>
                        <th><b>Longitude</b></th>   
			            <th><Button color="primary" type="button" className="btn btn-secondary" onClick={this.clearTable}>Clear</Button></th>
                    </tr>
                </thead>
                <tbody>
                        {locations}
                </tbody>
            </table>
        );
    }
	
    clearTable(){
	    this.state.locations.length = 0;
	    this.setState({markerPosition: L.latLng(40.5734, -105.0865), locations : this.state.locations});
    }

   handleRemoveDestination(i){
       this.state.locations.splice(i,1);
        this.setState({locations: this.state.locations});
    }  

    setMarker(mapClickInfo) {
        const locations = this.state.locations;
        locations.unshift(mapClickInfo.latlng);
        this.setState({markerPosition: mapClickInfo.latlng,
            locations: locations});
        this.getAddress(mapClickInfo.latlng).then();
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
        const AddressData = await(await fetch(GEOCODE_URL+`${latlng.lng},${latlng.lat}`)).json();
        const addressLabel = AddressData.address.LongLabel;
        this.setState({address: addressLabel});
    }

    renderCoordinatesInput() {
        const coordinates = this.state.coordinates;
        return (
            <InputGroup className="mt-4">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Coordinates Find</InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder="Latitude, Longitude"
                    onChange={this.processCoordinatesInput}
                    value={coordinates.inputText}
                />
            </InputGroup>
        );
      }

    renderFindMeButtom(){
        return (
        <Button onClick ={this.requestUserLocation} color = "success" block>Find Me</Button>
        ); 
    }
    requestUserLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.handleGeolocation, this.handleGeolocationError);
        }else {
            LOG.info("Geolocation is turned off or not supported by your browser.");
          }
    }
    handleGeolocation(position){
        const latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
        const locations = this.state.locations;
        locations.unshift(latlng);
        this.setState({mapCenter: latlng, markerPosition: latlng, locations: locations});
        this.getAddress(latlng).then()
        LOG.info('The user is located at ${JSON.stringify(latlng)}.');
    }
    handleGeolocationError(){
        LOG.info("Error retrieving the user's positions.")
    }
      
    processCoordinatesInput(onChangeEvent) {
        const inputText = onChangeEvent.target.value;
        const coordinates = this.state.coordinates;
        coordinates.inputText = inputText;
        coordinates.latLng = this.getCoordinatesOrNull(inputText);
        this.setState({mapCenter: coordinates.latLng, markerPosition: coordinates.latLng});//2
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
            <h4 className="mt-4">
              Latitude: {latLng.lat}, Longitude: {latLng.lng}
            </h4>
          );
        }
    }
}

