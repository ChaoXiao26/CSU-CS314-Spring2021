import React, {Component, useEffect} from 'react';
import {Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import Coordinates from "coordinate-parser";

export default class Distance extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.DistanceToggle = this.DistanceToggle.bind(this);
        this.state = {
            modalDistance: false
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
}