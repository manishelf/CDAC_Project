package com.parkngo.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class InvalidCredentialsException extends Exception {

	String msg;
	
	public InvalidCredentialsException(String msg) {
		super(msg);
	}
}
