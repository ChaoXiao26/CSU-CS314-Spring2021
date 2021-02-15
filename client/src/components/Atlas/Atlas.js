import React, {Component} from 'react';
import {Col, Container, Row, Button} from 'reactstrap';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = L.latLng(40.5734, -105.0865);
const MARKER_ICON = L.icon({iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

export default class Atlas extends Component {

    constructor(props) {
        super(props);

        this.setMarker = this.setMarker.bind(this);
	      this.clearTable = this.clearTable.bind(this);
        this.handleRemoveDestination = this.handleRemoveDestination.bind(this);

        this.state = {
            markerPosition: null,
            locations: [],
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            {this.renderLeafletMap()}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
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
                center={MAP_CENTER_DEFAULT}
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
            <tr key={i}> 
                <th>#{i}</th>
                <th>{location.lat.toFixed(6)}</th>
                <th>{location.lng.toFixed(6)}</th> 
                <th><button onClick ={() => this.handleRemoveDestination(i)}>remove </button></th> 
            </tr>
            );
        return(
            <table width="100%" border="1">
                <thead>
                    <tr> 
                        <th><b>Number</b></th>
                        <th><b>Latitude</b></th>
                        <th><b>Longitude</b></th>   
			            <th><Button color="primary" type="button" class="btn btn-secondary" onClick={this.clearTable}>Clear</Button></th>
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
	    this.setState({markerPosition: null, locations : this.state.locations});
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
    }

    getMarker() {
        if (this.state.markerPosition) {
            return (
                <Marker ref={(ref) => this.showMarkerPopup(ref)} position={this.state.markerPosition} icon={MARKER_ICON}>
                    <Popup offset={[0, -18]} className="font-weight-bold">
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

}
