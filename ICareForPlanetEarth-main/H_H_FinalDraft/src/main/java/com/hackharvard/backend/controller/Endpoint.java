package com.hackharvard.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


public class Endpoint {
    

@RestController
@RequestMapping("/api")
public class FrontendController {

    @GetMapping("/data")
    public String getData() {
        System.out.println("Request received for /api/data"); 
        return "Hello from Spring Boot Backend!";
    }
}
}