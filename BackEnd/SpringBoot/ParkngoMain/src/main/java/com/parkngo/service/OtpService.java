package com.parkngo.service;

import java.security.SecureRandom;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.parkngo.dao.EmailOTPDao;
import com.parkngo.dto.MailRequestDto;
import com.parkngo.pojos.EmailOTP;

import jakarta.validation.constraints.Email;

@Service
public class OtpService {

    private SecureRandom secureRandom = new SecureRandom();
    
    @Autowired
    RestTemplate restTemplate;
    
    @Value("${EMAIL_SERVICE_URL}")
    String emailerHost;
    
    @Value("${EMAIL_SERVICE_JWT}")
    String emailServiceJWT;
    
	@Autowired
	EmailOTPDao otpDao;
    
	
	public Integer generateOtp() {
		return 100000 + secureRandom.nextInt(900000);
	}

	public void sendEmail(@Email String email, Integer otp) throws MailingServiceException {
		
		otpDao.save(new EmailOTP(email, otp));
		
		String url = emailerHost+"mail";
		
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

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        
        if(response.getStatusCode().isError()) throw new MailingServiceException(response.getBody());
        
        
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

}
