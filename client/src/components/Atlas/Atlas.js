import React, {Component, useState} from 'react';
import {Col, Container, Row, Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
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
	    this.updateCooInput = this.updateCooInput.bind(this);
        this.findToggle = this.findToggle.bind(this);
        this.requestUserLocation();

        this.state = {
            modal: false,
            mapCenter: MAP_CENTER_DEFAULT,
            markerPosition: MAP_CENTER_DEFAULT,
            locations: [],
            coordinates: {
                inputText: "",
                latLng: null
            }
        };
    }

    findToggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            {this.renderFindInput()}
			                {this.renderCoordinatesInput()}
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
                {this.getMarker()}
            </Map>
        );
    }
    renderLocationTable() {
        //apply this function to each element in locations array
        const locations = this.state.locations.map((location, i) =>
            <tr key={i+=1}>
                <th>{i}</th>
                <th>{location.lat.toFixed(6)}</th>
                <th>{location.lng.toFixed(6)}</th> 
                <th><button color="primary" type="button" className="btn btn-secondary btn-block float-right" onClick ={() => this.handleRemoveDestination(i-=1)}>X </button></th> 
            </tr>
            );
        return(
            <table className="table table-striped table-bordered table-sm">
                <thead>
                    <tr> 
                        <th className="smallCell"><b>#</b></th>
                        <th><b>Latitude</b></th>
                        <th><b>Longitude</b></th>   
			            <th className="smallCell"><Button color="primary" type="button" className="btn btn-secondary btn-block float-right" onClick={this.clearTable}>Clear</Button></th>
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
	this.setState({markerPosition: MAP_CENTER_DEFAULT, mapCenter: MAP_CENTER_DEFAULT, locations : this.state.locations});
        this.getAddress(MAP_CENTER_DEFAULT).then();
    }

    handleRemoveDestination(i){
        if(this.state.locations.length <= 1){this.clearTable()}
        else
        {
            const locations = this.state.locations;
            locations.splice(i,1);
            this.setState({markerPosition: locations[0], mapCenter: locations[0], locations: locations});
            this.getAddress(locations[0]).then();
        }
    }  

    setMarker(mapClickInfo) {
        const locations = this.state.locations;
        locations.unshift(mapClickInfo.latlng);
        this.setState({markerPosition: mapClickInfo.latlng, mapCenter: mapClickInfo.latlng, locations: locations});
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
        this.setState({coordinates: coordinates});
    }

    updateCooInput() {
        const coordinates = this.state.coordinates;
	if(coordinates.latLng != null){
        this.setState({mapCenter: coordinates.latLng, markerPosition: coordinates.latLng});
        this.getAddress(coordinates.latLng);
        this.setState({locations: [coordinates.latLng, ...this.state.locations]});
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

    renderFindInput() {
        //https://6-4-0--reactstrap.netlify.app/components/modals/
        return (
            <div>
                <Button color='success' onClick={this.findToggle} className="mb-1" block>Find Places</Button>
                <Modal isOpen={this.state.modal} toggle={this.findToggle}>
                    <ModalHeader toggle={this.findToggle}>Find places</ModalHeader>
                    <ModalBody>
                        {/* InputGroup here */}
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Match</InputGroupText>
                            </InputGroupAddon>
                                <Input
                                    placeholder="Match Name Text"
                                    onChange={this.functionTakingMatchInput}
                                />
                            <InputGroupAddon addonType="append">
                                <Button onClick={this.functionFind} color="success">Find!</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='secondary' onClick={this.findToggle}>Cancel/Done</Button>
                    </ModalFooter>
                </Modal>
            </div>
    );
  }
}
