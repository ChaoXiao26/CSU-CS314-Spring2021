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
    distanceRequest = new DistancesRequest();
    distanceRequest.buildResponse();
  }
  
   @Test
  @DisplayName("Request type is \"distances\"")
  public void testType(){
    String type = distanceRequest.getRequestType();
    assertEquals("distances", type);
  }
}
