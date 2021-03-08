package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestDistancesRequest {
  
  private DistanceRequest distanceRequest;
  
  @BeforeEach
  public void createConfigurationForTestCases(){
    distanceRequest = new DistanceRequest();
    distanceRequest.buildResponse();
  }

}
