package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.Message;
import com.exadel.carpoolfree.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@Controller
//public class ChatController {
//
//    @MessageMapping("/chat.sendMessage")
//    @SendTo("/topic/public")
//    public Message sendMessage(@Payload Message message) {
//        return message;
//    }
//
//    @MessageMapping("/chat.addUser")
//    @SendTo("/topic/driveId/{driveId}")
//    public Message addUser(@Payload Message message,
//                           SimpMessageHeaderAccessor headerAccessor) {
//        // Add username in web socket session
//        headerAccessor.getSessionAttributes().put("username", message.getUser().getFirstName());
//        return message;
//    }
//
//}

@RestController
@RequestMapping(value = "/api/socket")
@CrossOrigin("*")
public class ChatController {

    private final MessageRepository messageRepository;

    public ChatController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/send/message")
    public Message sendMessage(@Payload Message message) {
        messageRepository.save(message);
        this.simpMessagingTemplate.convertAndSend("/socket-publisher/" + message.getDriveId() + " " + message.getUser().getId(), message);
        return message;
    }


//    @MessageMapping("/send/message")
//    public Map<String, String> useSocketCommunication(@Payload Message message) {
//        ObjectMapper mapper = new ObjectMapper();
//        Map<String, String> messageConverted = null;
//        try {
//            messageConverted = mapper.readValue(message, Map.class);
//        } catch (IOException e) {
//            messageConverted = null;
//        }
//        if (messageConverted != null) {
//            if (messageConverted.containsKey("driveId") && messageConverted.get("driveId") != null && !messageConverted.get("driveId").equals("")) {
//                this.simpMessagingTemplate.convertAndSend("/socket-publisher/" + messageConverted.get("driveId"), messageConverted);
//            } else {
//                this.simpMessagingTemplate.convertAndSend("/socket-publisher", messageConverted);
//            }
//        }
//        return messageConverted;
//    }

    @MessageMapping("/{driveId}/connect")
    @SendTo("/socket-publisher/{driveId}/connect")
    public Message addUser(@DestinationVariable String driveId, @Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", message.getUser().getName());
        return message;
    }
}
