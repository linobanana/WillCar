package com.exadel.carpoolfree.controller;


import com.exadel.carpoolfree.model.Message;
import com.exadel.carpoolfree.repository.MessageRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/chat")
public class MessageController {

    private final MessageRepository messageRepository;

    public MessageController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @GetMapping("/{id}")
    public Message getById(final @PathVariable Long id) {
        return messageRepository.findById(id).get();
    }

    @GetMapping()
    public List<Message> getAllMessages() {
        List<Message> msgs = messageRepository.findAll();
        return msgs;
    }

    @GetMapping("/drive/{driveId}")
    public List<Message> findAllByDriveId(final @PathVariable Long driveId) {
        return messageRepository.findAllByDriveId(driveId);
    }

    @PostMapping()
    public Message addMessage(@RequestBody Message message) {
        return messageRepository.save(message);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable Long id) {
        messageRepository.deleteById(id);
        return true;
    }
}
