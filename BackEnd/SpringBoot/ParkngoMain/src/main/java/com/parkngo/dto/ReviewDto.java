package com.parkngo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDto {

	@NotEmpty(message = "Invalid request token empty")
	String JWT;
	
	@NotNull(message = "Invalid request lot id missing")
	Long lotId;
	
	@NotNull(message = "Invalid request score missing")
	Integer score;
	
	String description;
}
