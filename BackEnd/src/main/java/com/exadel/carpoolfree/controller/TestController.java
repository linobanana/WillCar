package com.exadel.carpoolfree.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/passenger/test")
    public String getString() {
        return "Hi passenger!(test)";
    }

    @GetMapping("/admin/test")
    public String getAnotherString() {
        return "Hi admin!(test)";
    }

    @GetMapping("/driver/test")
    public String getAnotherTwoString() {
        return "Hi driver!(test)";
    }
}
