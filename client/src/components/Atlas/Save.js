import React, { Component, useEffect } from 'react';
import { Col, Container, Row, Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { LatLng } from 'leaflet';


export default class Save extends Component {
    constructor(props) {
        super(props);
        
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
        const fileTypes = ['json', 'csv', 'svg', 'kml'];
        return (
            <div>
                <Button color='success' type="button" className="btn btn-secondary btn-block float-right" onClick={this.saveToggleNew} >Save</Button>
                <Modal isOpen={this.state.modalNew} toggle={this.findToggleNew}>
                    <ModalHeader toggle={this.saveToggleNew}>Save Tour and Map</ModalHeader>
                    <ModalBody>
                        {/* Create four buttons of each format */}
                        {fileTypes.map((type, i)=>{
                            return (
                                <InputGroup key = {i}>
                                    <Button onClick={() => this.downloadFile('Tour', type)} color="success">{"Tour."+type}</Button>
                                </InputGroup>
                            )}
                        )}
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
   downloadFile = (fileName, fileType) =>{
    let data = this.combineDistancesAndLocations()
    let  file;
        if(fileType == 'json'){
            file = new Blob([JSON.stringify(data)], {type: fileType});
            fileName+='.json';
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
            file = this.CreateKMLMap(data);
            fileName+='.kml';
        }

        let a = document.createElement('a'),
            url = URL.createObjectURL(file);
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
       
        
    }
      combineDistancesAndLocations=()=>{
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
      export_csv = (arrayHeader, arrayData, delimiter) => {
        let header = arrayHeader.join(delimiter) + '\n';
        let csv = header;
        let i = 0;
        arrayData.forEach( location => {

             csv += "\"" +[location["name"].replace(/,/g, "").replace(".", "")] + "\"" +","+"\""+[location["lat"]]+"\""+ ','+"\""+ [location["lng"]] + "\"" +','+"\""+[location["distance"]]+["\""].join(delimiter)+"\n";
         });


        let csvData = new Blob([csv], { type: 'text/csv' });
        return csvData;  
    }

    CreateSVGMap=()=>{
        let SVG_Map = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="720" viewBox="-180 -90 360 180">'+
          '<image href="https://instructor-uploaded-content.s3.amazonaws.com/MAP.svg-6983777" x="-180" y="-90" height="180" width="360" />'+
          '<g transform="matrix(1,0,0,-1,0,0)">';
          
       let pairs = this.getPairValues();
       pairs.forEach(pair=> {
        SVG_Map+= '<polyline points="'+ pair + '"' + ' style="fill:none; stroke:red; stroke-width:0.5" />';

       });

       SVG_Map+='</g>'+
       '</svg>';
       let file = new Blob([SVG_Map], { type: 'svg' });
       return file;


    }
    getPairValues = ()=>{
        let LatLngPairs = [];
        let length = this.props.locations.length;
        let lat1,lat2,lng1,lng2;
        for(let i =1; i<= length;i++){
            lat1 = this.props.locations[i-1].lat.toFixed(5)
            lng1 = this.props.locations[i-1].lng.toFixed(5)
            lat2 = this.props.locations[i%length].lat.toFixed(5)
            lng2 = this.props.locations [i%length].lng.toFixed(5)
            console.log(lat1,lat2)
            LatLngPairs.push(this.CovertToPair(lng1,lat1,lng2,lat2));
        }
        console.log(LatLngPairs);
        return LatLngPairs;
    }
    
    CovertToPair = (lng1,lat1,lng2,lat2)=>{
        let pair = "";
        pair += lng1+','+lat1+ ' '+lng2+','+lat2;
        return pair;
    }

    //TODO: break up into separate functions
    CreateKMLMap=(file_data)=>{
        let KML_Map = '<?xml version="1.0" encoding="UTF-8"?>\n'+
        '<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">\n'+
            '\t<Document>\n'+
                '\t\t<name>Tour</name>\n'+
                '\t\t<open>1</open>\n'+
                '\t\t<description>Saved Tour</description>\n'+
                '\t\t<Style id="CrossStyle">\n'+
                    '\t\t\t<LineStyle>\n'+
                        '\t\t\t\t<color>ffffffb6</color>\n'+
                        '\t\t\t\t<width>4</width>\n'+
                    '\t\t\t</LineStyle>\n'+
                '\t\t</Style>\n'+
                '\t\t<Placemark>\n' +
                    '\t\t\t<name>Cross-corner line</name>\n'+
                    '\t\t\t<styleUrl>#CrossStyle</styleUrl>\n'+

            //HARDCODED SECTION FOR TEST
            '\t\t\t<LineString>'+ '\n'+
            '\t\t\t\t<coordinates>' +'\n';

                    
            let lat ,lng;
            let lines = "";
            file_data.forEach( location => {
                
                lat = location.lat;
                lng = location.lng;
                lines += '\t\t\t\t'+lng+','+ lat+','+'0\n';
                console.log(lines);
            });
            lines += '\t\t\t\t'+file_data[0].lng+','+ file_data[0].lat+','+'0\n';
            KML_Map += lines;
            KML_Map +='\t\t\t\t</coordinates>' +'\n'+
            '\t\t\t</LineString>'+ '\n'+
             '\t\t</Placemark>\n' +
             '\t</Document>\n' +
            '</kml>';

            let file = new Blob([KML_Map], { type: 'kml' });
            return file;


    }

    

      
   

}
