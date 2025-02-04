package com.parkngo.exception;

public class EmailOtpNotValidException extends Exception {
	String msg;
	
	public EmailOtpNotValidException(String msg) {
		super(msg);
	}
}
