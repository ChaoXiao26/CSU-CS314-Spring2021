import React, { Component } from 'react';
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
                    <h5><b>Trip File Upload</b></h5>
                    <input type="file" onChange={this.dummy} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        );
    }
} 