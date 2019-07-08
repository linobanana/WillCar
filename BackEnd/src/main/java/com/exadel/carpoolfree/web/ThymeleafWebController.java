package com.exadel.carpoolfree.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.thymeleaf.util.StringUtils;

import java.util.Arrays;
import java.util.List;

@Controller
public class ThymeleafWebController {

    // inject via application.properties
    @Value("${welcome.message}")
    private String message;

    private List<String> tasks = Arrays.asList("a", "b", "c", "d", "e", "f", "g");

    // /hello?name=yourname
    @GetMapping("/hello")
    public String mainWithParam(@RequestParam(name = "name", required = false, defaultValue = "")
                                        String name, Model model) {

        if (StringUtils.isEmpty(name)) {
            model.addAttribute("message", message);
            model.addAttribute("tasks", tasks);
        }

        model.addAttribute("message", name);

        return "welcome"; //view
    }
}
