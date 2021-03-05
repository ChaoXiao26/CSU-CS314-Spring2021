import React, {Component} from 'react';
import {Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'leaflet/dist/leaflet.css';

export default class Find extends Component {
    constructor(props) {
        super(props);
        this.findToggleNew = this.findToggleNew.bind(this);
        this.state = {
            modalNew: false
        }
    }
    render() {
        return ( 
            <div>
            {this.renderFindInput()}
            </div>

        );

    }
    renderFindInput() {
        //https://6-4-0--reactstrap.netlify.app/components/modals/
        return (
            <div>

                <Button color='success' onClick={this.findToggleNew} className="mb-1" block>Find a place</Button>
                <Modal isOpen={this.state.modalNew} toggle={this.findToggleNew}>
                    <ModalHeader toggle={this.findToggleNew}>Find places</ModalHeader>
                    <ModalBody>
                        {/* InputGroup here */}
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Match</InputGroupText>
                            </InputGroupAddon>
                                <Input
                                    placeholder="Match Name Text"
                                    onChange={this.functionTakingMatchInput}
                                />
                            <InputGroupAddon addonType="append">
                                <Button onClick={this.functionFind} color="success">Find!</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Where</InputGroupText>
                            </InputGroupAddon>
                                <Input
                                    placeholder="Enter the name of an area to search"
                                    onChange={this.functionTakingWhereInput}
                                />
                        </InputGroup>

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Type</InputGroupText>
                            </InputGroupAddon>
                                <Input
                                    placeholder="Enter the type of location (Ex: Airport, Restaurant, etc)"
                                    onChange={this.functionTakingTypeInput}
                                />
                        </InputGroup>





                    </ModalBody>
                    <ModalFooter>
                        <Button color='secondary' onClick={this.findToggleNew}>Cancel/Done</Button>
                    </ModalFooter>
                </Modal>
            </div>
    );
  }
    findToggleNew() {
        this.setState({
            modalNew: !this.state.modalNew
        });
    }


}
