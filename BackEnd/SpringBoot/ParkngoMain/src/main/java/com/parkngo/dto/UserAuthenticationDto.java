package com.parkngo.dto;

import com.parkngo.pojos.User.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserAuthenticationDto {
	@NotEmpty(message = "Invalid request email id cannot be empty")
	@Email(message = "Invalid emailid")
	String email;
	
	@NotEmpty(message = "Invalid request password cannot be empty")
	@Min(value = 8, message = "password cannot be smaller than 8 characters")
	@Max(value = 20, message = "password cannot be greater than 20 characters")
	String password;
	
	@NotNull
	Role role;
}
