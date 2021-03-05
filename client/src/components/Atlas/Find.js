import React, {Component, useState} from 'react';
import {Col, Container, Row, Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {LOG} from "../../utils/constants";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Coordinates from "coordinate-parser";
import Atlas from "./Atlas";
import 'leaflet/dist/leaflet.css';

export default class Find extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    render() {
        return ( 
            <div>
                
            </div>

        );

    }


}
