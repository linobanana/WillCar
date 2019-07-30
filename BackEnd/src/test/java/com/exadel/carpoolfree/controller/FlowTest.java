package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.*;
import com.exadel.carpoolfree.model.view.DriveVO;
import com.exadel.carpoolfree.model.view.UserVO;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Transactional
public class FlowTest {

    private final String DRIVE_API_ROOT = "/api/drive";
    private final String MESSAGE_API_ROOT = "/api/messages";
    private final String USER_API_ROOT = "/api/users";
    private final String CAR_API_ROOT = "/api/car";
    ObjectMapper objectMapper = new ObjectMapper();
    private Car car = getNextCar();
    private User user = getNextUser();
    private UserVO user2;
    private Message message = getNextMessage();
    private Drive drive = getNextDrive();
    private DriveVO driveVO;
    private UserVO userVO;

    @Autowired
    private MockMvc mockMvc;
    private JacksonTester<Message> jsonMessage;
    private JacksonTester<Drive> jsonDriveConverter;
    private JacksonTester<User> jsonUser;
    private JacksonTester<Car> jsonCar;

    @Before
    public void setup() {
        ObjectMapper objectMapper = new ObjectMapper();
        JacksonTester.initFields(this, objectMapper);

        this.objectMapper.registerModule(new JavaTimeModule());
        this.objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }


    @Test
    public void getFlow() throws Exception {

        //read user1
        MvcResult mvcUserResultRead = doRead(USER_API_ROOT + "/" + 1);
        UserVO userRead = objectMapper.readValue(mvcUserResultRead.getResponse().getContentAsString(), UserVO.class);
        this.userVO = userRead;

        //read user2
        MvcResult mvcUser2ResultRead = doRead(USER_API_ROOT + "/" + 2);
        UserVO user2Read = objectMapper.readValue(mvcUser2ResultRead.getResponse().getContentAsString(), UserVO.class);
        user2 = user2Read;

        //save car
        MvcResult mvcCarResultSaved = doPost(CAR_API_ROOT, car);
        String responseCar = mvcCarResultSaved.getResponse().getContentAsString();
        Car savedCar = objectMapper.readValue(responseCar, Car.class);
        this.car = savedCar;
        Assert.assertNotNull(savedCar.getId());

        //save message
        MvcResult mvcMessageResultSaved = doPost(MESSAGE_API_ROOT, message);
        String responseMessage = mvcMessageResultSaved.getResponse().getContentAsString();
        Message savedMessage = objectMapper.readValue(responseMessage, Message.class);
        Assert.assertNotNull(savedMessage.getId());

        //save drive
        MvcResult mvcDriveResultSaved = doPost(DRIVE_API_ROOT, drive);
        String responseDrive = mvcDriveResultSaved.getResponse().getContentAsString();
        DriveVO savedDrive = objectMapper.readValue(responseDrive, DriveVO.class);
        this.driveVO = savedDrive;
        Assert.assertNotNull(savedDrive.getId());

        //read car
        MvcResult mvcCarResultRead = doRead(CAR_API_ROOT + "/userId/" + savedCar.getId());
        //Car carRead = jsonCar.parseObject(mvcCarResultRead.getResponse().getContentAsString());
        //Assert.assertEquals(savedCar.getId(), carRead.getId());

        //read message
        MvcResult mvcMessageResultRead = doRead(MESSAGE_API_ROOT + "/" + savedMessage.getId());

        //read drive
        MvcResult mvcDriveResultRead = doRead(DRIVE_API_ROOT + "/" + savedDrive.getId());

        //delete drive
        doDelete(DRIVE_API_ROOT + "/" + savedDrive.getId());

        //update user
        doUpdate(USER_API_ROOT, getNextUser());
    }

    private Car getNextCar() {
        Long timestamp = System.currentTimeMillis();
        Long userId = 1L;
        String text = "Test_text";
        return new Car(timestamp, text, text, text, userId);
    }

    private User getNextUser() {
        Long num = 1L;
        boolean active = true;
        String testTxt = "Test text";
        Set<Role> role = new HashSet<>();
        List<Car> cars = new ArrayList<>();
        cars.add(getNextCar());
        cars.add(getNextCar());
        User user = new User(num, testTxt, testTxt,
                testTxt, testTxt, testTxt);
        return user;
    }

    private Message getNextMessage() {
        Long timestamp = 1L;
        String text = "Test_message";
        LocalDateTime time = LocalDateTime.now();

        return new Message(timestamp, text, timestamp, time, user);
    }

    private Drive getNextDrive() {
        Date date = new Date();
        LocalDateTime localDateTime = LocalDateTime.now();
        int test = (int) (1 + Math.random() * 4);
        String startPoint = "";

        List<Message> messages = new ArrayList<>();
        messages.add(getNextMessage());
        messages.add(getNextMessage());

        return new Drive(localDateTime, localDateTime,
                test, user, startPoint, startPoint, startPoint);
    }

    private MvcResult doPost(String url, Object data) throws Exception {
        return mockMvc.perform(
                post(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(data)))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();
    }

    private MvcResult doRead(String url) throws Exception {
        return mockMvc.perform(
                get(url))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();
    }

    private ResultActions doDelete(String url) throws Exception {
        return mockMvc.perform(delete(url))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private MvcResult doUpdate(String url, Object data) throws Exception {
        return mockMvc.perform(
                put(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(data)))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();
    }
}
