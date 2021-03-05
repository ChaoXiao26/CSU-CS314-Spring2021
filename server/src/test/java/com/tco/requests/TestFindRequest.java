package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestFindRequest {

    private FindRequest req;

    @BeforeEach
    public void createConfigurationForTestCases() {
        req = new FindRequest();
        req.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType() {
        String type = req.getRequestType();
        assertEquals("find", type);
    }
    
    @Test
    @DisplayName("Test request match is \"Dave\"")
    public void testMatch() {
        String match = req.getMatch();
        assertEquals("Dave", match);
    }

    @Test
    @DisplayName("Test request result found is \"28\"")
    public void testFound() {
        Integer Found = req.getFound();
        assertEquals("28", Integer.toString(Found));
    }     
}
