import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {LOG} from "../../utils/constants";
import 'leaflet/dist/leaflet.css';


export default class FindMeButton extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Button className="my-1" onClick ={this.requestUserLocation} color = "success" block>Find Me</Button>
        );
    }
    uselessFunction(){
        console.log("Useless Function");
    }
    requestUserLocation=()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.props.handleGeolocation, this.handleGeolocationError);
        }else {
            LOG.info("Geolocation is turned off or not supported by your browser.");
        }
    }
    handleGeolocationError(){
        LOG.info("Error retrieving the user's positions.")
    }
}
