package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.User;
import com.exadel.carpoolfree.model.view.UserForAdminVO;
import com.exadel.carpoolfree.model.view.UserVO;
import com.exadel.carpoolfree.service.NewDetails;
import com.exadel.carpoolfree.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserVO getById(final @PathVariable Long id){
        return userService.findById(id);
    }

    @GetMapping("/admin/startTime/{startTime}/finTime/{finTime}")
    public Set<UserForAdminVO> getAllUsersByMonth(final @PathVariable String startTime,
                                                  final @PathVariable String finTime) {
        return userService.findAllUsersByMonth(startTime, finTime);
    }

    @GetMapping()
    public UserVO getCurrentUser() {
        return userService.findCurrentUser();
    }

    @GetMapping("/admin")
    public List<UserForAdminVO> getAllUsers() {
        return userService.findAllUsers();
    }

    @PutMapping()
    public UserVO updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

}
