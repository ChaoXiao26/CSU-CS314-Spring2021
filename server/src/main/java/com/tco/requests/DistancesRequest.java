package com.tco.requests;
import com.tco.requests.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class DistancesRequest extends RequestHeader {
    ArrayList<Map<String, String>> places = new ArrayList<Map<String, String>>();
    private double earthRadius;
    ArrayList<Long> distances = new ArrayList<Long>();

    public DistancesRequest(ArrayList<Map<String, String>> places, double earthRadius, ArrayList<Long> distances){
        this.requestType = "distances";
        this.places = places;
        this.earthRadius = earthRadius;
        this.distances = distances;
    }

    private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);
    
    public void tripDistances(){
        String[] names = new String[2], lats = new String[2], lngs = new String[2];
        double[] la = new double[2], ln = new double[2];
        
        if(this.places.size() != 0){
            int max = (this.places.size() - 1);
            int bonus = 0;
            //add a bonus pass in this instance that will be caught by an if statement inside the for loop
            if(this.places.size() > 2){bonus = 1;}

            for(int i = 0; i < max+bonus; i++){
                for(int j = 0; j < 2; j++){
                    Map<String, String> myPlace;
                    //if bonus pass was wanted, the last pass will add first and last places instead
                    if(i == max){myPlace = this.places.get(j*(this.places.size() - 1));}
                    else{myPlace = this.places.get(i+j);}

                    names[j] = myPlace.get("name");
                    lats[j] = myPlace.get("latitude");
                    lngs[j] = myPlace.get("longitude");
                    
                    la[j] = Double.parseDouble(lats[j]);
                    ln[j] = Double.parseDouble(lngs[j]);
                }
                distances.add((long)greatCircle(la, ln, this.earthRadius));
            }
        }
        if(this.places.size() == 1)
            {distances.add(0L);}
    }

    public double greatCircle(double[] lats, double[] lngs, double earthRad){
        if ((lats[0] != lats[1]) && (lngs[0] != lngs[1])){

			double dLat = Math.toRadians(lats[1] - lats[0]);
            double dLng = Math.toRadians(lngs[1] - lngs[0]);

			double a = Math.sin(dLat/2) * Math.sin(dLat/2)
                     + Math.cos(Math.toRadians(lats[0])) * Math.cos(Math.toRadians(lats[1]))
                     * Math.sin(dLng/2) * Math.sin(dLng/2);
            double angle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

			double dist = 0;
            dist = angle * earthRad + 0.5;

			return (dist);
		}

        else{
            return 0;
        }
    
    }

    @Override
    public void buildResponse(){
        this.tripDistances();
        log.trace("buildResponse -> {}", this);
    }
    
    /* The following methods exist only for testing purposes and are not used
    during normal execution, including the constructor. */
    
    public DistancesRequest(){
        this.requestType = "distances";
        this.earthRadius = 3959;
    }

    public DistancesRequest(double earthRadius){
        this.requestType = "distances";
        this.earthRadius = earthRadius;
    }

    public double getEarthRadius() {
        return earthRadius;
    }

}
