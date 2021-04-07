import React, {Component} from 'react';
import {Button, InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import 'leaflet/dist/leaflet.css';

export default class CoordinatesFindButton extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const coordinates = this.props.coordinates;
        const validCoordinates = coordinates.latLng != null;
        const inputBoxEmpty = !coordinates.inputText;
        return (
            <InputGroup className="mb-1">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Coordinates Find</InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder="Latitude, Longitude"
                    onChange={this.props.processCoordinatesInput}
                    value={coordinates.inputText}
                    valid={validCoordinates}
                    invalid={!inputBoxEmpty && !validCoordinates}
                />
		        <InputGroupAddon addonType="append">
                    <Button onClick={this.props.updateCooInput} color="success">Go!</Button>
                </InputGroupAddon>
            </InputGroup>
        );
    }
}