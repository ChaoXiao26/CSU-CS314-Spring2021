import React, {Component, useEffect} from 'react';
import {Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import { sendServerRequest, isJsonResponseValid, getOriginalServerPort} from "../../utils/restfulAPI";
import * as findSchema from "../../../schemas/FindResponse";
import axios from 'axios'

export default class Find extends Component {
    constructor(props) {
        super(props);
        this.findToggleNew = this.findToggleNew.bind(this);
        this.fetchFind = this.fetchFind.bind(this);
        this.state = {
            sPort: getOriginalServerPort(),
            testVal: 'test',
            modalNew: false
        }
    }
    render() {
        return ( 
            <div>
            {this.renderFindInput()}
            {(this.state.sPort+"/api/find")}
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

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Limit</InputGroupText>
                            </InputGroupAddon>
                                <Input
                                    placeholder="Enter the number of locations to return"
                                    onChange={this.functionTakingLimitInput}
                                />
                        </InputGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.fetchFind} color="success">Find</Button>
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
    fetchFind(){
        const url = this.state.sPort + '/api/find';
        const [matchName] = useState(null)
        useEffect(()=>{
            axions.get(url)
            .then(response => {
                matchName(response.data)
            })
        }, [url])
    }
}
