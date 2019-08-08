package com.exadel.carpoolfree.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    public void addViewControllers(ViewControllerRegistry registry) {
//        registry.addViewController("/**").setViewName("login");

        registry.addViewController("/main").setViewName("main");
        registry.addViewController("/personalarea/**").setViewName("main");
        registry.addViewController("/").setViewName("login");
        registry.addViewController("/login").setViewName("login");
    }

}
