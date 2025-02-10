package com.parkngo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.parkngo.dto.ApiResponse;
import com.parkngo.dto.JWTAuthResponse;
import com.parkngo.dto.UserAuthenticationDto;
import com.parkngo.dto.UserRegistrationDto;
import com.parkngo.exception.EmailOtpNotValidException;
import com.parkngo.exception.InvalidCredentialsException;
import com.parkngo.exception.MailingServiceException;
import com.parkngo.service.OtpService;
import com.parkngo.service.UserService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	OtpService otpService;

	@PostMapping("/register")
	public ResponseEntity<?> userRegistration(@RequestBody @Valid UserRegistrationDto userRegDto) throws EmailOtpNotValidException{
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(userService.registerUser(userRegDto));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> userAuthentication(@RequestBody @Valid UserAuthenticationDto userAuthDto) throws InvalidCredentialsException{
		JWTAuthResponse response;
		response = userService.authenticate(userAuthDto);
		return ResponseEntity.status(HttpStatus.OK)
				.body(response);
	}
	
	@PostMapping("/otp")
	public ResponseEntity<?> generateEmailOtp(@RequestParam @Email(message = "invalid email") String email) throws MailingServiceException{
		Integer otp = otpService.generateOtp();
		otpService.sendEmail(email, otp);
		
        return ResponseEntity.ok("OTP sent to email "+email);	
	}
}
