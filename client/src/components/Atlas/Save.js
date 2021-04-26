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
                            <Button onClick={() => this.downloadFile(this.props.locations,'Tour','csv')} color="success">Map.svg</Button>
                        </InputGroup>
                        <InputGroup>
                        <Button onClick={() => this.downloadFile(this.props.locations,'Tour','csv')} color="success">Map.kml</Button>
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
       else{

           let arrayheader = ["\"Address\"","\"Latitude\"", "\"Longitude\"","\"Distance\""];
           this.export_csv(arrayheader, data,',', fileName);


       }
       
       //TO DO: Parse CSV file 
      // else{
        
       // file = new Blob([fileText], {type: fileType});
      // }
       //TODO: IMPLEMENT FOR MAP.SVG

       //TODO IMPLEMENT FOR MAP.KML
        
      }

      //TODO: create function  to parse csv file
      //Source: https://seegatesite.com/tutorial-read-and-write-csv-file-with-javascript/
      export_csv = (arrayHeader, arrayData, delimiter, fileName) => {
          //let data = this.combineDistancesAndLocations();
         // console.log(data);
        let header = arrayHeader.join(delimiter) + '\n';
        let csv = header;
        // for (let i = 0; i < arrayData.length; i++) { 
        //     csv += [arrayData[i]["name"]].replace(/,/g, "").replace(".", "")+[arrayData[i]["lat"]].join(delimiter)+"\n";
        //   }
        let i = 0;
        arrayData.forEach( location => {

             csv += "\"" +[location["name"].replace(/,/g, "").replace(".", "")] + "\"" +","+"\""+[location["lat"]]+"\""+ ','+"\""+ [location["lng"]] + "\"" +','+"\""+[location["distance"]]+["\""].join(delimiter)+"\n";
         });


        let csvData = new Blob([csv], { type: 'text/csv' });  
        let csvUrl = URL.createObjectURL(csvData);

        let hiddenElement = document.createElement('a');
        hiddenElement.href = csvUrl;
        hiddenElement.target = '_blank';
        hiddenElement.download = fileName + '.csv';
        hiddenElement.click();
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

      
   

}
