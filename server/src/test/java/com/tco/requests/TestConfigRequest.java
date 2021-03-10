package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestConfigRequest {

    private ConfigRequest conf;

    @BeforeEach
    public void createConfigurationForTestCases() {
        conf = new ConfigRequest();
        conf.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"config\"")
    public void testType() {
        String type = conf.getRequestType();
        assertEquals("config", type);
    }

    @Test
    @DisplayName("Features includes \"config\"")
    public void testFeatureConfig(){
        assertTrue(conf.validFeature("config"));
    }
    
    @Test
    @DisplayName("Features includes \"find\"")
    public void testFeatureFind(){
        assertTrue(conf.validFeature("find"));
    }

    @Test
    @DisplayName("Features includes \"distances\"")
    public void testFeatureDistances(){
        assertTrue(conf.validFeature("distances"));
    }

    @Test
    @DisplayName("Team name is t16 404 Brain Not Found")
    public void testServerName() {
        String name = conf.getServerName();
        assertEquals("t16 404 Brain Not Found", name);
    }
}
