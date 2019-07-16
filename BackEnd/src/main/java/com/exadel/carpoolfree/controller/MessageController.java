package com.exadel.carpoolfree.controller;


import com.exadel.carpoolfree.model.Message;
import com.exadel.carpoolfree.repository.MessageRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/messages")
public class MessageController {

    private final MessageRepository messageRepository;

    public MessageController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @GetMapping("/{id}")
    public Message getById(final @PathVariable Long id) {
        return messageRepository.findById(id).get();
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
    public void delete(@PathVariable Long id) {
        messageRepository.deleteById(id);
    }
}
