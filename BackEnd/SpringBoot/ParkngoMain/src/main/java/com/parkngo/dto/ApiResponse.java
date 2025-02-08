package com.parkngo.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse {
	LocalDateTime timeStamp;
	Object data;
	public ApiResponse(){
		this.timeStamp = LocalDateTime.now();
	}
}
