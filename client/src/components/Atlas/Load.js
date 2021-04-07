import React, { Component } from 'react';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import Coordinates from "coordinate-parser";

export default class Load extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            uplodedFile: null
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.dummy}>
                    <b>Trip File Upload</b><br></br>
                    <input type="file" onChange={this.dummy} />
                    <Button type="submit">Upload</Button>
                </form>
            </div>
        );
    }
} 