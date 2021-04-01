import React, { Component, useEffect } from 'react';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'leaflet/dist/leaflet.css';



export default class Save extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        
        this.state = {  
            modalNew: false,
            
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
                        {/*this.textBox("Match", "Match Name Text", this.functionTakingMatchInput)*/}
                        <InputGroup>
                            <Button onClick={this.fetchFind} color="success">Tour</Button>
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
    // textBox(name, text, func){
    //     return(
    //         <InputGroup>
    //             <InputGroupAddon addonType="prepend">
    //                 <InputGroupText>{name}</InputGroupText>
    //             </InputGroupAddon>
    //             <Input
    //                 placeholder={text}
    //                 onChange={func}
    //             />
    //         </InputGroup>
    //     );
    // }
    saveToggleNew=()=>{
        this.setState({
            modalNew: !this.state.modalNew
        });
    }
   

   

}