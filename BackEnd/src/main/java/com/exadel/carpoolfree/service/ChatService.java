package com.exadel.carpoolfree.service;

import com.exadel.carpoolfree.model.Message;
import com.exadel.carpoolfree.model.User;
import com.exadel.carpoolfree.repository.DriveRepository;
import com.exadel.carpoolfree.repository.MessageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

@Service
public class ChatService {

    public static final String MESSAGE_KEY = "message";
    public static final String DRIVE_ID_KEY = "driveId";
    public static final String TIME_KEY = "time";
    public static final String USER_KEY = "user";
    public static final String SOCKET_URL = "/socket-publisher/";
    private final MessageRepository messageRepository;
    private final DriveRepository driveRepository;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public ChatService(MessageRepository messageRepository, DriveRepository driveRepository) {
        this.messageRepository = messageRepository;
        this.driveRepository = driveRepository;
    }

    public Map<String, String> useSocketCommunication(String message) {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> messageConverted;
        Message messageObject = new Message();
        try {
            messageConverted = mapper.readValue(message, Map.class);
            messageObject = new Message(messageConverted.get(MESSAGE_KEY),
                    Long.valueOf(messageConverted.get(DRIVE_ID_KEY)),
                    messageConverted.get(TIME_KEY),
                    mapper.readValue(messageConverted.get(USER_KEY), User.class),
                    false);
        } catch (IOException e) {
            messageConverted = null;
        }
        if (messageConverted != null) {
            if (messageConverted.containsKey(DRIVE_ID_KEY) && messageConverted.get(DRIVE_ID_KEY) != null && !messageConverted.get(DRIVE_ID_KEY).equals("")) {
                if (!driveRepository.findById(Long.valueOf(messageConverted.get(DRIVE_ID_KEY))).get().isArchive()) {
                    messageRepository.save(messageObject);
                  /*  this.simpMessagingTemplate.convertAndSend(SOCKET_URL + messageConverted.get(DRIVE_ID_KEY) + "_" + messageConverted.get(USER_KEY),
                            this.generateJSONStringForUIResponce(messageConverted));*/
                    this.simpMessagingTemplate.convertAndSend(SOCKET_URL + messageConverted.get(DRIVE_ID_KEY),
                            this.generateJSONStringForUIResponce(messageConverted));

                }
            }
        }
        return messageConverted;
    }

    private String generateJSONStringForUIResponce(Map<String, String> messageConverted){
        return "{\"message\": \"" + messageConverted.get(MESSAGE_KEY) +
                "\", \"user\": { \"id\":" + messageConverted.get(USER_KEY) +
                "}, \"driveId\": " + Integer.valueOf(messageConverted.get(DRIVE_ID_KEY)) +
                ", \"time\": \"" + messageConverted.get(TIME_KEY) +
                "\", \"notify\": false}";
    }

    private String generateJSONStringForUIResponce(String message, Long driverId, String time){
        return "{\"message\": \"" + message +
                "\", \"user\": {\"id\": 1" +
                "}, \"driveId\": \"" + driverId.toString() +
                "\", \"time\": \"" + time +
                "\", \"notify\": \"true\"}";
    }

    public void sendNotification(String message, Long id, User driver){
        Message messageObject = new Message(message,  id, LocalDateTime.now(), driver, true);
        messageRepository.save(messageObject);
        this.simpMessagingTemplate.convertAndSend(SOCKET_URL + id,
                this.generateJSONStringForUIResponce(message, id, messageObject.getTime().toString()));
    }

}
