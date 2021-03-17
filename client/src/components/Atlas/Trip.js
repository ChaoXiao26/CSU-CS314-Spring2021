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
    
        this.state = {

        }
    }
    render() {
       
    }
}