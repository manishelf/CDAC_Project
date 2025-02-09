package com.parkngo.exception;

import lombok.Getter;

@Getter
public class MailingServiceException extends Exception {
	String msg;
	public MailingServiceException(String msg) {
		super(msg);
	}
}
