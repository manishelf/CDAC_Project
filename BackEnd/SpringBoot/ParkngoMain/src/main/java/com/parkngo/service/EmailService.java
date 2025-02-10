package com.parkngo.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.parkngo.dto.MailRequestDto;
import com.parkngo.exception.MailingServiceException;

import jakarta.annotation.PostConstruct;
import jakarta.validation.constraints.Email;

@Service
public class EmailService {
	
    RestTemplate restTemplate = new RestTemplate();

    @Value("${EMAIL_SERVICE_URL}")
    String mailingHost;
    
    String emailServiceJWT;
    
    // to register with the mailing service for JWT
    @PostConstruct
    public void init() {
		
		HttpHeaders registrationHeaders = new HttpHeaders();
        registrationHeaders.setContentType(MediaType.APPLICATION_JSON);

        String email = Integer.toString(new Random().nextInt(10000));
        
        Map<String, String> registrationRequest = new HashMap<>();
        registrationRequest.put("clientName", "parkngo");
        registrationRequest.put("email", email);
        registrationRequest.put("password", "xyzpqr");
        
        ResponseEntity<String> registrationResponse = restTemplate.postForEntity(mailingHost+"register", registrationRequest, String.class);
        System.out.println("Registration Response: " + registrationResponse.getBody());

        String response = registrationResponse.getBody();
        
        int tokenStartIndex = response.indexOf("\"token\":\"") + 9; // 9 is the length of "token":"
        int tokenEndIndex = response.indexOf("\"", tokenStartIndex);
        
        this.emailServiceJWT = response.substring(tokenStartIndex,tokenEndIndex);
        
        
        HttpHeaders templateHeaders = new HttpHeaders();
        templateHeaders.setContentType(MediaType.APPLICATION_JSON);
        templateHeaders.add("Authorization", "Bearer "+emailServiceJWT);

        Map<String, Object> mailTemplate = new HashMap<>();
        mailTemplate.put("subject", "Your OTP Verification Code");
        mailTemplate.put("header", "<html><body><h2 style=\"color:#4CAF50;\">OTP Verification</h2></body></html>");
        mailTemplate.put("body", "<html><body style=\"font-family:Arial, sans-serif; line-height:1.6;\"><h1>Welcome #[key1]!</h1><p>Thank you for choosing Parkngo, your reliable online parking service. To complete your verification, please use the OTP provided below:</p><div style=\"text-align:center; margin:20px;\"><p style=\"font-size:24px; font-weight:bold; color:#ff6f61;\">#[otp]</p></div><p>If you did not request this OTP, please contact our support team immediately.</p></body></html>");
        mailTemplate.put("footer", "<html><body><p>Best regards,<br/>The Parkngo Team</p><p style=\"color:#888;\">#[key2]</p></body></html>");


        Map<String, Object> templateRequest = new HashMap<>();
        templateRequest.put("templateTitle", "otpVerificationTemplate");
        templateRequest.put("mailTemplate", mailTemplate);
        templateRequest.put("keys", Arrays.asList("key1", "key2", "otp"));
        templateRequest.put("callback", "http://localhost:4000/otpCallback");

        HttpEntity<Map<String, Object>> templateEntity = new HttpEntity<>(templateRequest, templateHeaders);

        ResponseEntity<String> templateResponse = restTemplate.postForEntity(mailingHost+"template", templateEntity, String.class);
        
        System.out.println(templateResponse.getBody());
        
    }
	
	
	public void sendVerificationOtp(@Email String email, Integer otp) throws MailingServiceException {
		MailRequestDto mailRequest = new MailRequestDto();
		mailRequest.setRecipients(email);
		mailRequest.setTemplateName("otpVerificationTemplate");
		mailRequest.setEntries(
				Map.of("email",email,"otp",otp.toString(),"key1","","key2","This is a auto generated email! please do not reply to it.")
				);
		
		HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Authorization", "Bearer "+emailServiceJWT); 

        HttpEntity<MailRequestDto> requestEntity = new HttpEntity<>(mailRequest, headers);

        ResponseEntity<String> response = restTemplate.exchange(mailingHost+"mail", HttpMethod.POST, requestEntity, String.class);
        
        if(response.getStatusCode().isError()) throw new MailingServiceException(response.getBody());		
	}
	
	
	
	
	 /* OTP Template
	{
	  "templateTitle": "otpVerificationTemplate",
	  "mailTemplate": {
	    "subject": "Your OTP Verification Code",
	    "header": "<html><body><h2 style=\"color:#4CAF50;\">OTP Verification</h2></body></html>",
	    "body": "<html><body style=\"font-family:Arial, sans-serif; line-height:1.6;\"><h1>Welcome #[key1]!</h1><p>Thank you for choosing Parkngo, your reliable online parking service. To complete your verification, please use the OTP provided below:</p><div style=\"text-align:center; margin:20px;\"><p style=\"font-size:24px; font-weight:bold; color:#ff6f61;\">#[otp]</p></div><p>If you did not request this OTP, please contact our support team immediately.</p></body></html>",
	    "footer": "<html><body><p>Best regards,<br/>The Parkngo Team</p><p style=\"color:#888;\">#[key2]</p></body></html>"
	  },
	  "keys": ["key1", "key2", "otp"],
	  "callback": "http://localhost:4000/otpCallback"
	}
     */

}
