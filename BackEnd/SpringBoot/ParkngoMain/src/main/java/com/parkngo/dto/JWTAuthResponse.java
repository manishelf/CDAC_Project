package com.parkngo.dto;

import com.parkngo.pojos.User.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JWTAuthResponse extends ApiResponse{
	String JWT;
	
	Role userRole;
	
}
