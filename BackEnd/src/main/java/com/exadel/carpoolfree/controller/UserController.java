package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.User;
import com.exadel.carpoolfree.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping()
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getById(final @PathVariable Long id) {
        return userRepository.findById(id).orElseThrow((() -> new RuntimeException("User not found")));
    }

    @PutMapping()
    public User updateUser(@RequestBody User user) {
        return userRepository.findById(user.getId())
                .map(user1 -> {
                    user1.setPrefCommunication(user.getPrefCommunication());
                    return userRepository.save(user1);
                })
                .orElseThrow((() -> new RuntimeException("User not found")));
    }

}
