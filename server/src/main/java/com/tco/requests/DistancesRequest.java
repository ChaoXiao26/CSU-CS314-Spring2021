package com.tco.requests;
import com.tco.requests.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class DistancesRequest extends RequestHeader {
    ArrayList<Map<String, String>> places = new ArrayList<Map<String, String>>();
    private Float earthRadius;
    ArrayList<Integer> distances = new ArrayList<Integer>();
    
    public DistancesRequest(ArrayList<Map<String, String>> places, float earthRadius, ArrayList<Integer> distances){
        this.requestType = "distances";
        this.places = places;
        this.earthRadius = earthRadius;
        this.distances = distances;
    }

    private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);
    
    @Override
    public void buildResponse(){
       this.distances = new ArrayList<Integer>();
       //log.trac("buildResponse -> {}", this);
    }
    
}

