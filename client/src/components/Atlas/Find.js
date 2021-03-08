import React, {Component, useEffect} from 'react';
import {Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import { sendServerRequest, isJsonResponseValid, getOriginalServerPort} from "../../utils/restfulAPI";
import Coordinates from "coordinate-parser";
import * as findSchema from "../../../schemas/FindResponse";


const SerPort = getOriginalServerPort()

export default class Find extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.findToggleNew = this.findToggleNew.bind(this);
        this.findResponseToggle = this.findResponseToggle.bind(this);
        this.fetchFind = this.fetchFind.bind(this);
        this.state = {
            sPort: getOriginalServerPort(),
            matchName: "",      //defult as empty
            modalNew: false,
            modalFindResponse: false,
            validServer: null,
            find: [],
            foundLocations: []
        }
    }
    render() {
        return ( 
            <div>
            {this.renderFindInput()}
            {this.renderFindResponse()}
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
                        <div>
                            {this.protocolTest()}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div>
                            {"url: " + (this.state.sPort+"/api/find")}
                        </div>
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
    renderFindResponse(){
        return (
            <div>
            <Modal className="findplaces-custom-modal" isOpen={this.state.modalFindResponse} toggle={this.findResponseToggle}>
                <ModalHeader toggle={this.findResponseToggle}>Places Found</ModalHeader>
                <ModalBody>
                    {this.renderFindTableResponse()}
                </ModalBody>
            </Modal>
        </div>
        );
       
    }
    
    renderFindTableResponse(){
        //const foundLocations = this.state.find.names;
        const foundLocations = this.state.find.map((location) =>
            <tr key={location.id}>
                <th>{location.name}</th>  
                <th>{location.region}</th>
                <th><Button color="primary" type="button" className="btn btn-secondary btn-block float-right" onClick={() => this.props.AddTrip(location.latitude, location.longitude)}>Add</Button></th> 
            </tr>
            );
        //this.createLocationTable();  
        return(
            <table className="table table-striped table-bordered table-sm">
                <thead>
                    <tr> 
                        <th>
                        <b>name</b></th>
                        <th><b>region</b></th>
			            <th><Button color="primary" type="button" className="btn btn-secondary btn-block float-right" onClick={this.clearTable}>Clear</Button></th>
                    </tr>
                </thead>
                <tbody>
                    {foundLocations}
                </tbody>
            </table>
        );
    }
    findResponseToggle() {
        this.setState({
            modalFindResponse: !this.state.modalFindResponse
        });
    }
    functionTakingMatchInput = (event) =>{
        //this.fetchFind(event.target.value);
        this.setState({matchName: event.target.value})
        //console.log(this.state.validServer);
        //console.log(this.find);
    }
    processFindResponse(findResponse) {
        if (!isJsonResponseValid(findResponse, findSchema)) {
            this.setState({validServer: false, find: false});
        } else {
            this.setState({validServer: true, find: findResponse.places});
            this.findResponseToggle();
        }
    }

    fetchFind(){
        const url = this.state.sPort;
        sendServerRequest({requestType: "find", match: this.state.matchName, limit: 30 }, url)
        .then(findResponse => {
            if (findResponse) {
                this.processFindResponse(findResponse);
            } else {
                this.setState({validServer: false, find: null});
            }
        });
    }

    protocolTest(){
        return(
            <div>
                {"Current limit(should be 30 after Find): " + this.state.find.limit}
            </div>
        );
    }
}
