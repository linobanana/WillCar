package com.exadel.carpoolfree.controller;

import com.exadel.carpoolfree.model.User;
import com.exadel.carpoolfree.model.view.UserForAdminVO;
import com.exadel.carpoolfree.model.view.UserVO;
import com.exadel.carpoolfree.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
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

//    public static void main(String[] args) {
//        String passwd = "password1";
//       String sss =  BCrypt.gensalt();
//        String hash1 = BCrypt.hashpw(passwd , sss);
//        String hash2 = BCrypt.hashpw(passwd , sss);
//        boolean checkpw = BCrypt.checkpw(passwd, hash1);
//        boolean checkpw1 = BCrypt.checkpw(passwd, hash2);
//        boolean checkpw2 = BCrypt.checkpw(hash1, hash2);
//        boolean checkpw3 = BCrypt.checkpw(hash2, hash1);
//        System.out.println();
//    }

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
