package com.parkngo.dto;

import com.parkngo.pojos.User.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegistrationDto {

	@NotEmpty(message = "Invalid request email id cannot be empty")
	@Email
	String email;
	
	@Min(100000)
	@Max(999999)
	Integer emailOtp;
	
	@NotEmpty(message = "Invalid request password cannot be empty")
	@Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters")
	String password;
	
	@NotEmpty(message = "first name cannot be empty")
	String name;

	@NotEmpty(message = "Driving Liscence cannot be empty")
	String drivingLiscence;
	
	@NotNull(message = "user role missing")
	Role role;

}
