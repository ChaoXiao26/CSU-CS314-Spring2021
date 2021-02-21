package com.tco.requests;
import com.tco.requests.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class FindRequest extends RequestHeader {
    private String match;
    private String[] type, where;
    private Integer limit;
    private Integer found = 0;
    ArrayList places = new ArrayList();

 
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

        Map<String, String> placeInfo;
        // = new HashMap();
        // placeInfo.put("name", "Dave's Airport");
        // placeInfo.put("latitude", "40.0332984924");
        // placeInfo.put("longitude", "-105.124000549");
        // placeInfo.put("id", "0CO1");
        // placeInfo.put("altitude", "5170");
        // placeInfo.put("municipality", "Louisville");
        // placeInfo.put("type", "small_airport");
        // placeInfo.put("region", "Colorado");
        // placeInfo.put("country", "United States");
        // placeInfo.put("url", "https://www.aopa.org/destinations/airports/0CO1/details");
        // places.add(placeInfo);
        int lim;
        try {
            lim = limit.intValue();
        }
        catch (NullPointerException e) {
            lim = 100;
        }
        if(lim == 0){
            lim = 100;
        }

        FindDatabase db = new FindDatabase(this.match, lim, this.where, this.type);
        db.match(match);
        db.Database();
        ArrayList<String> dbNameAL = new ArrayList();
        ArrayList<String> dbLatAL = new ArrayList();
        ArrayList<String> dbLngAL = new ArrayList();
        ArrayList<String> dbCityAL = new ArrayList();
        dbNameAL = db.getNameAL();
        dbLatAL = db.getLatAL();
        dbLngAL = db.getLngAL();
        dbCityAL =  db.getCityAL();

        for (int i = 0; i < dbNameAL.size(); i++) {
            placeInfo = new HashMap();
            placeInfo.put("name", dbNameAL.get(i));
            placeInfo.put("latitude", dbLatAL.get(i));
            placeInfo.put("longitude", dbLngAL.get(i));
            placeInfo.put("municipality", dbCityAL.get(i));
            places.add(placeInfo);
        }
        
        found = db.getCount();
        log.trace("buildResponse -> {}", this);
    }
    




      /* The following method exist only for testing purposes and are not used
  during normal execution, including the constructor. */

       public FindRequest(){
        this.requestType = "find";
       }
}

