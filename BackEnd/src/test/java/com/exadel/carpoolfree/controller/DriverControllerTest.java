package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.Driver;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Transactional
public class DriverControllerTest {

    private final String DRIVER_API_ROOT = "/api/driver";

    @Autowired
    private MockMvc mockMvc;
    private JacksonTester<Driver> json;

    breaking the test

    @Before
    public void setup() {
        ObjectMapper objectMapper = new ObjectMapper();
        JacksonTester.initFields(this, objectMapper);
    }

    @Test
    public void saveAndReadDriver() throws Exception {
        Driver driver = getNextDriver();

        //save driver
        MvcResult mvcResultSaved = mockMvc.perform(
                post(DRIVER_API_ROOT)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.write(driver).getJson()))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();
        String response = mvcResultSaved.getResponse().getContentAsString();
        Driver saved = json.parseObject(response);
        Assert.assertNotNull(saved.getId());

        //read driver
        MvcResult mvcResultRead = mockMvc.perform(get(DRIVER_API_ROOT + "/" + saved.getId()))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();
        Driver driverRead = json.parseObject(mvcResultRead.getResponse().getContentAsString());
        Assert.assertEquals(saved.getId(), driverRead.getId());
    }

    private Driver getNextDriver() {
        Long timestamp = System.currentTimeMillis();
        final String name = "Test_" + timestamp;
        return new Driver(name, name, name);
    }

}
