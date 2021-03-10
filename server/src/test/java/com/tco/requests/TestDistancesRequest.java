package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestDistancesRequest {
  
  private DistancesRequest disReq;
  private DistancesRequest disReq2;
  
  @BeforeEach
  public void createConfigurationForTestCases(){
    disReq = new DistancesRequest();
    disReq2 = new DistancesRequest(3959);
    disReq.buildResponse();
    disReq2.buildResponse();
  }
  
//    @Test
//   @DisplayName("Request type is \"distances\"")
//   public void testType(){
//     String type = distancesRequest.getRequestType();
//     assertEquals("distances", type);
//   }
}
