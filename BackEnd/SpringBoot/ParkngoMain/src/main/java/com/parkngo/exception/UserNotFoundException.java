package com.parkngo.exception;

import lombok.Getter;

@Getter
public class UserNotFoundException extends Exception{
	
	String msg;

	public UserNotFoundException(String msg) {
		super(msg);
		this.msg = msg;
	}

}
