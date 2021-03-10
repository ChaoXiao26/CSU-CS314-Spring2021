package com.tco.requests;
import com.tco.requests.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class DistancesRequest extends RequestHeader {
    ArrayList<Map<String, String>> places = new ArrayList<Map<String, String>>();
    private float earthRadius;
    ArrayList<Integer> distances = new ArrayList<Integer>();

    public DistancesRequest(ArrayList<Map<String, String>> places, float earthRadius, ArrayList<Integer> distances){
        this.requestType = "distances";
        this.places = places;
        this.earthRadius = earthRadius;
        this.distances = distances;
    }

    private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);
    
    public double greatCircle(double lat1, double lng1, double lat2, double lng2, double earthRad){
        if ((lat1 != lat2) && (lng1 != lng2)){

			double dLat = Math.toRadians(lat1 - lat2);
            double dLng = Math.toRadians(lng2 - lng1);

			double a = Math.sin(dLat/2) * Math.sin(dLat/2)
                     + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                     * Math.sin(dLng/2) * Math.sin(dLng/2);
            double angle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

			double dist = 0;
            dist = angle * earthRad;

			return (dist);
		}

        else{
            return 0;
        }
    
    }

    @Override
    public void buildResponse(){
        distances.add((int)greatCircle(40.6, -105.1, -33.9, 151.2, 3959));      //a few test cases
        distances.add((int)greatCircle(40.6, -105.1, -33.9, 151.2, 6371));
        distances.add((int)greatCircle(0, 0, 0, 0, 0));
        log.trace("buildResponse -> {}", this);
    }
    
    /* The following methods exist only for testing purposes and are not used
    during normal execution, including the constructor. */
    
    public DistancesRequest(){
        this.requestType = "distances";
        this.earthRadius = 3959;
    }

    public DistancesRequest(float earthRadius){
        this.requestType = "distances";
        this.earthRadius = earthRadius;
    }

    public float getEarthRadius() {
        return earthRadius;
    }

}

