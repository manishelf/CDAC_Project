package com.parkngo.service;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkngo.dao.EmailOTPDao;
import com.parkngo.exception.MailingServiceException;
import com.parkngo.pojos.EmailOTP;

import jakarta.validation.constraints.Email;

@Service
public class OtpService {

    private SecureRandom secureRandom = new SecureRandom();
    
    @Autowired
    EmailService emailService;
    
	@Autowired
	EmailOTPDao otpDao;
    
	
	public Integer generateOtp() {
		return 100000 + secureRandom.nextInt(900000);
	}

	public void sendEmail(@Email String email, Integer otp) throws MailingServiceException {
		
		otpDao.save(new EmailOTP(email, otp));
		
		emailService.sendVerificationOtp(email, otp);
	}

}
