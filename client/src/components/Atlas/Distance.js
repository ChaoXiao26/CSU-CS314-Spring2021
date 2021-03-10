import React, {Component, useEffect} from 'react';
import {Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import Coordinates from "coordinate-parser";

export default class Distance extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
        }
    }
    render() {
        return ( 
            <div>
                <Button className="my-1" onClick ={this.requestUserLocation} color = "primary" block>Distance</Button>
            </div>
        );
    }
}