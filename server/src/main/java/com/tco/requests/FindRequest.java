package com.tco.requests;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


//Below codes should be changed for find feature

public class FindRequest extends RequestHeader {

    private String serverName;
    private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);
    private ArrayList<String> features;

    @Override
    public void buildResponse() {
        serverName = "t16 404 Brain Not Found";
        features = new ArrayList<String>();
        features.add("find");
        log.trace("buildResponse -> {}", this);
    }
}