package com.tco.requests;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConfigRequest extends RequestHeader {

    private String serverName;
    private final transient Logger log = LoggerFactory.getLogger(ConfigRequest.class);
    private ArrayList<String> features;
    private String[] type, where;

    @Override
    public void buildResponse() {
        serverName = "t16 404 Brain Not Found";
        features = new ArrayList<String>();
        features.add("config");
        features.add("find");
        features.add("distances");
        features.add("tour");
        //features.add("type");
        //features.add("where"); maybe for feture?
        log.trace("buildResponse -> {}", this);
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public ConfigRequest() {
        this.requestType = "config";
    }

    public String getServerName() {
        return serverName;
    }

    public boolean validFeature(String feature){
        return features.contains(feature);
    }
}
