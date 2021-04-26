import React, { Component, useEffect } from 'react';
import { Col, Container, Row, Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


export default class Save extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.downloadFile = this.downloadFile.bind(this);
        this.combineDistancesAndLocations = this.combineDistancesAndLocations.bind(this);
        this.CreateSVGMap =this.CreateSVGMap.bind(this);
        this.CreateKMLMap =this.CreateKMLMap.bind(this);
        
        this.state = {  
            modalNew: false,
            saveTourFormat: null,
            saveMapFormat: null,
            
        }
    }
    render() {
        return (
            <div>
                {this.renderSave()}
               
            </div>

        );

    }
    renderSave=()=>{
        //https://6-4-0--reactstrap.netlify.app/components/modals/
        return (
            <div>

                <Button color='success' type="button" className="btn btn-secondary btn-block float-right" onClick={this.saveToggleNew} >Save</Button>
                <Modal isOpen={this.state.modalNew} toggle={this.findToggleNew}>
                    <ModalHeader toggle={this.saveToggleNew}>Save Tour and Map</ModalHeader>
                    <ModalBody>
                        {/* InputGroup here */}
                        
                        <InputGroup>
                            <Button onClick={() => this.downloadFile(this.props.locations,'Tour','json')} color="success">Tour.json</Button>
                        </InputGroup>
                        <InputGroup> 
                        <Button onClick={() => this.downloadFile(this.props.locations,'Tour','csv')} color="success">Tour.csv</Button>
                        </InputGroup>
                        <InputGroup>
                            <Button onClick={() => this.downloadFile(this.props.locations,'Tour','svg')} color="success">Map.svg</Button>
                        </InputGroup>
                        <InputGroup>
                        <Button onClick={() => this.downloadFile(this.props.locations,'Tour','kml')} color="success">Map.kml</Button>
                        </InputGroup>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
    
    saveToggleNew=()=>{
        this.setState({
            modalNew: !this.state.modalNew
        });
    }
   downloadFile(fileText, fileName, fileType) {
    let data = this.combineDistancesAndLocations()
    let  file;
        if(fileType == 'json'){
            file = new Blob([JSON.stringify(data)], {type: fileType});
            
        }
        else if (fileType == 'csv'){

           let arrayheader = ["\"Address\"","\"Latitude\"", "\"Longitude\"","\"Distance\""];
           file = this.export_csv(arrayheader, data,',', fileName);
        }
        else if (fileType == 'svg'){
            file = this.CreateSVGMap();
            fileName+='.svg';
        }
        else{
            console.log(data);
            file = this.CreateKMLMap(data);
            fileName+='.kml';
        }

        let a = document.createElement('a'),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = fileName;
            console.log(fileName);
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
       
        
    }
      combineDistancesAndLocations(){
        console.log(this.props.locations)
        let combineData =[]
         for (var i of this.props.locations){
             combineData.push(i)
         }
         let j =0;
         for (var distance of this.props.distances){
                combineData[j].distance = distance;
                 j+=1;
             }

         return combineData;
    }
      //Source: https://seegatesite.com/tutorial-read-and-write-csv-file-with-javascript/
      export_csv = (arrayHeader, arrayData, delimiter, fileName) => {
        let header = arrayHeader.join(delimiter) + '\n';
        let csv = header;
        let i = 0;
        arrayData.forEach( location => {

             csv += "\"" +[location["name"].replace(/,/g, "").replace(".", "")] + "\"" +","+"\""+[location["lat"]]+"\""+ ','+"\""+ [location["lng"]] + "\"" +','+"\""+[location["distance"]]+["\""].join(delimiter)+"\n";
         });


        let csvData = new Blob([csv], { type: 'text/csv' });
        return csvData;  
    }

    CreateSVGMap(){
        let SVG_Map = '<?xml version="1.0" encoding="UTF-8"?>\n '+
        '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="768"> \n' +
         '<image href= "https://instructor-uploaded-content.s3.amazonaws.com/MAP.svg-6983777" />\n'+
       ' </svg>';
       let file = new Blob([SVG_Map], { type: 'svg' });
       return file;


    }
    CreateKMLMap(file_data){
        let KML_Map = '<?xml version="1.0" encoding="UTF-8"?>'+
        '<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">'+
            '<Document>'+
                '<name>Tour</name>'+
                '<open>1</open>'+
                '<description>Saved Tour</description>'+
                '<Style id="CrossStyle">'+
                    '<LineStyle>'+
                        '<color>ffffffb6</color>'+
                        '<width>4</width>'
                    '</LineStyle>'
                '</Style>'+
                '<Placemark>' +
            '<name>Cross-corner line</name>'+
            '<styleUrl>#CrossStyle</styleUrl>'+
            '<LineString>'+
            '<coordinates>';
            let lat,lng;
            file_data.forEach( location => {
                lat = location.lat.toFixed(2).toString().replace(".", ",")+',0';
                lng = location.lng.toFixed(2).toString().replace(".", ",") + ',0';
                console.log(lat);
                
            });
         
            let file = new Blob([KML_Map], { type: 'kml' });
            return file;


    }

    

      
   

}
