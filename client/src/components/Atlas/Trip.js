import React, {Component, useEffect} from 'react';
import {Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import Coordinates from "coordinate-parser";
import { sendServerRequest, isJsonResponseValid, getOriginalServerPort } from "../../utils/restfulAPI";

const SerPort = getOriginalServerPort()


export default class Trip extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.getLocationsFromAtlas = this.getLocationsFromAtlas.bind(this);
        this.testLocations = this.testLocations.bind(this);
        this.state = {

        }
    }

    getLocationsFromAtlas(){
        const locations = [];
        for(let i =0; i< this.props.locations.length; i++){
            let location = {
                name: this.props.locations[i].name,
                latitude: this.props.locations[i].lat,
                longitude: this.props.locations[i].lng
            };
            locations.push(location);
        }
        return locations;
    }

    render() {
        //this.testLocations(); 
        return(
            <div>
                {/*"Trip"*/}
            </div>
       );
    }

    testLocations(){
        console.log(this.getLocationsFromAtlas());
     }
}