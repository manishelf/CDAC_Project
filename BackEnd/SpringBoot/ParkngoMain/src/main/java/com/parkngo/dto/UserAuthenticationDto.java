package com.parkngo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
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
	@Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters")
	String password;
}
