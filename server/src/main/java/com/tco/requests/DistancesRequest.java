package com.tco.requests;
import com.tco.requests.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class DistancesRequest extends RequestHeader {
    ArrayList<Map<String, String>> places = new ArrayList<Map<String, String>>();
    private float earthRadius;
    private int[] distances;
    
    public DistancesRequest(ArrayList<Map<String, String>> places, float earthRadius, int[] distances){
        this.requestType = "distances";
        this.places = places;
        this.earthRadius = earthRadius;
        this.distances = distances;
    }

    private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);
    
    @Override
    public void buildResponse(){
       // log.trac("buildResponse -> {}", this);
    }
}
