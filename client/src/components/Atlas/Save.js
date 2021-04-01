import React, { Component, useEffect } from 'react';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'leaflet/dist/leaflet.css';



export default class Save extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        
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

                <Button color='success' onClick={this.saveToggleNew} >Save</Button>
                <Modal isOpen={this.state.modalNew} toggle={this.findToggleNew}>
                    <ModalHeader toggle={this.saveToggleNew}>Save Tour and Map</ModalHeader>
                    <ModalBody>
                        {/* InputGroup here */}
                        
                        <InputGroup>
                            <Button onClick={this.fetchFind} color="success">Tour</Button>
                            {this.textBox("Match", "Enter format as \"json\" or  \"csv\"", this.functionTakingTourInput)}
                        </InputGroup>
                        <InputGroup> 
                        <div></div>
                        </InputGroup>
                        <InputGroup>
                            <Button onClick={this.fetchFind} color="success">Map</Button>
                        </InputGroup>
                        


                       
                
                    </ModalBody>
                    <ModalFooter>
                        <Button  color="success">Find</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
    functionTakingTourInput = (event) => {
        this.setState({ saveTourFormat: event.target.value });
        downloadFile(this.props.distances, 'Tour', saveTourFormat);

    }
    textBox(name, text, func){
        return(
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>{name}</InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder={text}
                    onChange={func}
                />
            </InputGroup>
        );
    }
    saveToggleNew=()=>{
        this.setState({
            modalNew: !this.state.modalNew
        });
    }
   downloadFile(fileText, fileName, fileType) {
    let file;   
    if(fileType == 'json'){
        file = new Blob([JSON.stringify(fileText)], {type: fileType});
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

   

}