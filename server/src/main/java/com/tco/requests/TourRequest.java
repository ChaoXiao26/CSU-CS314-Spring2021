package com.tco.requests;
import com.tco.requests.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class TourRequest extends RequestHeader {
    ArrayList<Map<String, String>> places;
    private double earthRadius;
    private double response;

    public TourRequest(double earthRadius, double response, ArrayList<Map<String, String>> places){
        this.requestType = "tour";
        this.earthRadius = earthRadius;
        this.response = response;
        this.places = places;
    }
    @Override
    public void buildResponse() {
        
    }
}
