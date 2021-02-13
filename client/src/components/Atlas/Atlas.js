import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';

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

        this.state = {
            markerPosition: null,
            locations: [],//holds an array of all locations clicked
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            {this.renderLeafletMap()}
                            <table width="100%" border="1">
                            <thead>
                                <tr> 
                                    <th><b>Number</b></th>
                                    <th><b>Address</b></th>
                                    <th><b>Latitude</b></th>
                                    <th><b>Longitude</b></th>     
                                </tr>
                            </thead>
                            <tbody>
                                    <tr> 
                                        <th>test1</th>
                                        <th>test2</th>
                                        <th>test3</th>
                                        <th>test4</th>     
                                    </tr>
                            </tbody>
                            </table>
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

    setMarker(mapClickInfo) {
        const locations = this.state.locations;//array inside constructor in this.state
        locations.push(mapClickInfo.latlng);//object that holds .lat and .lng(lattitude and longitude of location clicked)
        //console.log(mapClickInfor.latlng);//this is how I knew what was stored inside this object
        this.setState({markerPosition: mapClickInfo.latlng,
                      locations: locations});//return changes in locations variable to this.state.locations
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
