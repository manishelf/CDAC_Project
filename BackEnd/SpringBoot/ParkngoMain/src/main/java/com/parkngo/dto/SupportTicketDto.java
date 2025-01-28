package com.parkngo.dto;

import com.parkngo.pojos.SupportTicket;
import com.parkngo.pojos.SupportTicket.Type;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupportTicketDto {

	@NotEmpty(message = "Invalid request token empty")
	String JWT;

	@NotEmpty 
	String title;
	
	@NotEmpty
	String description;

	SupportTicket.Type type = Type.COMPLAINT;
}
