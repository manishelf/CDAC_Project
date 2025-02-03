package com.parkngo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkngo.dto.JWTAuthResponse;
import com.parkngo.dto.UserAuthenticationDto;
import com.parkngo.dto.UserRegistrationDto;
import com.parkngo.dto.UserRegistrationResponseDto;
import com.parkngo.exception.InvalidCredentialsException;
import com.parkngo.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Value("${STATIC_CONTENT_HOST}")
	String staticServerHost;
	
	@PostMapping("/register")
	public ResponseEntity<?> userRegistration(@RequestBody @Valid UserRegistrationDto userRegDto){				
		userService.registerUser(userRegDto);
		
		System.out.println(userRegDto.getPassword());
		
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(new UserRegistrationResponseDto(userRegDto.getEmail()));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> userAuthentication(@RequestBody @Valid UserAuthenticationDto userAuthDto){
		System.out.println(userAuthDto.getPassword());
		JWTAuthResponse response;
		try {
			response = userService.authenticate(userAuthDto);
			return ResponseEntity.status(HttpStatus.OK)
					.body(response);
		} catch (InvalidCredentialsException e) {
			System.out.println(e);
			log.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
	}
}
