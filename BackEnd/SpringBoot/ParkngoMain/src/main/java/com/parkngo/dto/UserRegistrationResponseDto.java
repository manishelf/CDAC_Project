package com.parkngo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegistrationResponseDto extends ApiResponse{
	
	String userEmail;
	
	String message;
	
	public UserRegistrationResponseDto(String userEmail) {
		super();
		this.userEmail = userEmail;
		this.message = "user registered with email '"+userEmail+"'";
	}
}
