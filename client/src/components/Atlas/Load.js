import React, { Component } from 'react';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import Coordinates from "coordinate-parser";

export default class Load extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.handlefile = this.handlefile.bind(this);
        this.state = {
            uplodedFile: null
        }
    }

    render() {
        return (
            <div>
                <b>Trip File Upload</b><br></br>
                <input type="file" id = 'input' multiple onClick ={() => this.handlefile()}/>
                <Button type="submit" onClick ={() => this.handlefile()} >Upload</Button>
                {/* <pre id="fileDisplayArea"></pre>              */}
            </div>
            
        );
    }

    handlefile(){
        var ths = this;
        var fileInput = document.getElementById('input');
        //var fileDisplayArea = document.getElementById('fileDisplayArea');
        fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                //fileDisplayArea.innerText = reader.result;
                console.log(e.target.result);  
                ths.setState({uplodedFile: e.target.result})
                console.log(ths.state.uplodedFile);  
            }
            reader.readAsText(file); 
        });

    }
}