package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.User;
import com.exadel.carpoolfree.model.view.UserForAdminVO;
import com.exadel.carpoolfree.model.view.UserVO;
import com.exadel.carpoolfree.service.UserService;
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

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public List<UserForAdminVO> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{id}")
    public UserVO getById(final @PathVariable Long id) {
        return userService.findById(id);
    }

    @PutMapping()
    public UserVO updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

}
