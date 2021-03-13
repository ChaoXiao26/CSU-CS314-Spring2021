import React, {Component, useEffect} from 'react';
import {Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import Coordinates from "coordinate-parser";
import { sendServerRequest, isJsonResponseValid, getOriginalServerPort } from "../../utils/restfulAPI";
import * as findSchema from "../../../schemas/DistancesResponse";

<<<<<<< HEAD
=======
const SerPort = getOriginalServerPort()
>>>>>>> 13334191bff3fa02929ec7ad15e114315ce43820

export default class Distance extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.DistanceToggle = this.DistanceToggle.bind(this);
        this.testLocationsFromAtlas = this.testLocationsFromAtlas.bind(this);
        this.formatDataFromAtlas = this.formatDataFromAtlas.bind(this)
        
        this.state = {
            sPort: getOriginalServerPort(),
            modalDistance: false,
            modalDisatanceResponse: false,
            validServer: null,
        }
    }
    render() {
        
        return ( 
            <div>
                <Button className="my-1" onClick ={this.DistanceToggle} color = "primary" block>Distance</Button>
                {this.DistancePopup()}
            </div>
            
        );
    }

    DistancePopup(){
        return(
            <div>
                <Modal isOpen={this.state.modalDistance} toggle={this.DistanceToggle}>
                    <ModalHeader toggle={this.DistanceToggle}>Calculate Distance</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>First Coordinate</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="latitude, longitude"
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Second Coordinate</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="latitude, longitude"
                            />
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='secondary'>Calculate</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    DistanceToggle(){
        this.setState({
            modalDistance: !this.state.modalDistance
        });
    }

    formatDataFromAtlas(){
        const formattedLocations = [];
        for(let i =0; i< this.props.locations.length; i++){
            let location = {
                latitude: this.props.locations[i].lat,
                longitude: this.props.locations[i].lng
            };
            console.log(location);
            formattedLocations.push(location);
        }
        return formattedLocations;

    }
    testLocationsFromAtlas(){
       //console.log("Hello World");
        console.log(this.formatDataFromAtlas());
        

    }
}