package com.tco.requests;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;

public class FindRequest extends RequestHeader {
    private String match;
    private String[] type, where;
    private Integer limit;
    private Integer found;
    private List<Map<String, String>> places;
    
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
        // ////////////////
        // requestType = this.requestType;
        // match = this.match;
        // limit = this.limit;
        // type = this.type;
        // where = this.where;
        // ////////////////
        found = 0;
        //places = this.places;
        log.trace("buildResponse -> {}", this);
    }

}