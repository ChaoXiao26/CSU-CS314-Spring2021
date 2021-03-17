import React, {Component, useEffect} from 'react';
import {Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import Coordinates from "coordinate-parser";
import { sendServerRequest, isJsonResponseValid, getOriginalServerPort } from "../../utils/restfulAPI";
import * as distancesSchema from "../../../schemas/DistancesResponse";

const SerPort = getOriginalServerPort()


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
            modalDistanceResponse: false,
            validServer: null,
            distances: [],
        }
    }
    render() {
       this.testLocationsFromAtlas(); 
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
    
    distancesResponseToggle() {
        this.setState({
            modalDistanceResponse: !this.state.modalDistanceResponse
        });
    }

    functionTakingFormattedLocations = (event) => {
        this.setState({ distances: event.target.value })
    }


    fetchFind() {
        const url = this.state.sPort;
        sendServerRequest({ requestType: "distances", places: this.formatDataFromAtlas, radius: 3959 }, url)
            .then(distancesResponse => {
                if (Response) {
                    this.processDistanceResponse(distancesResponse);
                } else {
                    this.setState({ validServer: false, places: null, radius: null, distances: null });
                }
            });
    }

    processDistanceResponse(distancesResponse) {
        if (!isJsonResponseValid(distancesResponse, distancesSchema)) {
            this.setState({ validServer: false, find: false });
        } else {
            this.setState({ validServer: true, places: distancesResponse.places, radius: distancesResponse.radius, distances: distancesResponse.distances });
            this.distancesResponseToggle();
        }
    }
    testLocationsFromAtlas(){
       //console.log("Hello World");
        console.log(this.formatDataFromAtlas());
        

    }
}
