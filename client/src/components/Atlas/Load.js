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
        // this.jsonFile = this.jsonFile.bind(this);
        this.state = {
            uplodedFile: null,
            Location: []
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
            default: this.jsonFile(data); break;
        }
    }

    csvFile(data){     
        var line = data.split('\n');

        line[0] = line[0].substring(1, line[0].length - 1);
        
        var name = line[0].split("\",\"");
        var lat = name.indexOf("latitude");
        var long = name.indexOf("longitude");

        for(var i = 1; i < line.length; i++){
            line[i] = line[i].substring(1, line[i].length - 1);
            var message = line[i].split("\",\"");
            if(message == "") break;
            this.props.AddTrip(message[lat], message[long]);
        }
    }

    jsonFile=(data)=>{
        var tmp = JSON.parse(data);
        for(var i = 0; i < tmp.places.length; i++){
            var place = JSON.parse(JSON.stringify(tmp.places[i]));
            this.props.AddTrip(place.latitude.toString(), place.longitude.toString());
        }
        //console.log(tmp.map(loc => loc.lat));
        // tmp.map((loc) => 
        //     this.props.AddTrip(loc.places.latitude.toString(), loc.places.longitude.toString())
        // );
    }
}