package com.parkngo.controller;
import java.time.Duration;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.parkngo.dao.UserDao;
import com.parkngo.service.UptimeService;

@RestController
@RequestMapping("/admin/")
public class AdminController {

    @Autowired
    UptimeService uptimeListener;
    
    @Autowired
    UserDao userDao;
    
    @Value("${EMAIL_SERVICE_URL}")
    String emailerHost;
    
    @GetMapping("/uptime")
    public String getUptime() {
        Duration uptime = uptimeListener.getUptime();
        return "Uptime: " + uptime.toMillis() + " milliseconds";
    }
    
    @GetMapping("/dbstatus")
    public String getDbStatus() {
    	try {
        	userDao.count();
        	return "UP";
    	}catch(Exception e) {
    		return "DOWN Reason-"+e.getMessage();
    	}
    }
    
    @GetMapping("/mailingServiceStatus")
    public String getMailingServiceStatus() {
    	try {
    		 RestTemplate restTemplate = new RestTemplate();
    	     String response = restTemplate.getForObject(emailerHost.substring(0, emailerHost.length()-4), String.class);
        	return "UP "+response;
    	}catch(Exception e) {
    		return "DOWN Reason-"+e.getMessage();
    	}
    }
    
    @GetMapping("/serviceMetrics")
    public ResponseEntity<?> getServiceMetrics(){
    	Map<String,Long> metrics = new HashMap<>();
    	
    	metrics.put("UserCount", userDao.count());
    	
//    	metrics.add(lotsDto.count());
//    	
//    	metrics.add(bookingsDto.getRevinue());
//    	
    	return ResponseEntity.ok(metrics);
    }
    
}