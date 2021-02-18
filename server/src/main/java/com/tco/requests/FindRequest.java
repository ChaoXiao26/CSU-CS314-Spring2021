package com.tco.requests;
import com.tco.requests.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class FindRequest extends RequestHeader {
    private String match;
    private String[] type, where;
    private Integer limit;
    private Integer found = 1;
    //private List<Map<String, String>> places;
    ArrayList places = new ArrayList();

    public FindRequest(){
        this.requestType = "find";
    }

    public FindRequest(String match, Integer limit, String[] type, String[] where){
        this.requestType = "find";
        this.match = match;
        this.limit = limit;
        this.type = type;
        this.where = where;
    }

    private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);

    @Override
    public void buildResponse() {

        Map<String, String> placeInfo = new HashMap();
        placeInfo.put("name", "Dave's Airport");
        placeInfo.put("latitude", "40.0332984924");
        placeInfo.put("longitude", "-105.124000549");
        placeInfo.put("id", "0CO1");
        placeInfo.put("altitude", "5170");
        placeInfo.put("municipality", "Louisville");
        placeInfo.put("type", "small_airport");
        placeInfo.put("region", "Colorado");
        placeInfo.put("country", "United States");
        placeInfo.put("url", "https://www.aopa.org/destinations/airports/0CO1/details");
        places.add(placeInfo);

        log.trace("buildResponse -> {}", this);
    }

}
