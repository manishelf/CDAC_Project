package com.parkngo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkngo.pojos.User;
import com.parkngo.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PutMapping("/update-status/{userId}")
    public ResponseEntity<?> updateUserStatus(@PathVariable long userId) {
        try {
            boolean isActive = adminService.updateStatus(userId);
            return ResponseEntity.ok(isActive);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User not found.");
        }
    }
    
    
    @GetMapping("/users-list")
    public ResponseEntity<?> getUserDetails() {
        try {
            List<User> userDetails = adminService.getUserDetails();
            return ResponseEntity.status(HttpStatus.OK).body(userDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found."); 
    }

    }
}
