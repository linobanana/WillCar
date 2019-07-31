package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;


@RestController
@RequestMapping(value = "/api/socket")
@CrossOrigin("*")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService)
    {
        this.chatService = chatService;
    }

    @MessageMapping("/send/message")
    public Map<String, String> useSocketCommunication(String message) {
        return chatService.useSocketCommunication(message);
    }
}
