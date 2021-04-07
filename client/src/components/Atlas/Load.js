import React, { Component } from 'react';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import Coordinates from "coordinate-parser";

export default class Load extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.handlefile = this.handlefile.bind(this);
        this.anaylyzeFile = this.anaylyzeFile.bind(this);
        this.csvFile = this.csvFile.bind(this);
        this.jsonFile = this.jsonFile.bind(this);
        this.state = {
            uplodedFile: null
        }
    }

    render() {
        return (
            <div>
                <b>Trip File Upload</b><br></br>
                <input type="file" id = 'input' multiple onClick ={() => this.handlefile()}/>
                {/* <Button type="submit" onClick ={() => this.handlefile()} >Upload</Button> */}
            </div>
            
        );
    }

    handlefile(){
        var ths = this;
        var fileInput = document.getElementById('input');
        fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {  
                ths.setState({uplodedFile: e.target.result})
                ths.anaylyzeFile(ths.state.uplodedFile, file.type);
            }
            reader.readAsText(file); 
        });
    }

    anaylyzeFile(data, type){
        switch(type){
            case "application/vnd.ms-excel": this.csvFile(data); break;
            case "application/json": this.jsonFile(data); break;
            default: break;
        }
    }

    csvFile(data){
        console.log("csv")
    }

    jsonFile(data){
        console.log("json")
    }
}