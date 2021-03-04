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
        int lim;
        try {
            lim = limit.intValue();
        }
        catch (NullPointerException e) {
            lim = 100;
        }
        if (lim == 0){
            lim = 100;
        }
        putPlaceInfo(lim);
        log.trace("buildResponse -> {}", this);
    }
    private void putPlaceInfo(int lim){
        Map<String, String> placeInfo;
        FindDatabase db = new FindDatabase(this.match, lim, this.where, this.type);
        db.match(match);
        db.Database();
        for (int i = 0; i < db.nameAL.size(); i++) {
            placeInfo = new HashMap();
            placeInfo.put("name", db.nameAL.get(i));
            placeInfo.put("latitude", db.latAL.get(i));
            placeInfo.put("longitude", db.lngAL.get(i));
            placeInfo.put("municipality", db.cityAL.get(i));
            placeInfo.put("region", db.regionAL.get(i));
            placeInfo.put("country", db.countryAL.get(i));
            placeInfo.put("id", db.idAL.get(i));
            placeInfo.put("type", db.typeAL.get(i));
            placeInfo.put("altitude", db.altAL.get(i));
            places.add(placeInfo);
        }
        found = db.getCount();
    }
      /* The following method exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public FindRequest(){
    this.requestType = "find";
    }
}