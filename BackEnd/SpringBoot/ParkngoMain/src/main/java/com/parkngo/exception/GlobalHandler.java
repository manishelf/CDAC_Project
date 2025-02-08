package com.parkngo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.RestClientException;

import com.parkngo.service.MailingServiceException;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalHandler {

	@ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<String> handleInvalidCredentialsException(InvalidCredentialsException e) {
		log.error(e.getMessage());
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }
	
	@ExceptionHandler(RestClientException.class)
	public ResponseEntity<String> handleRestClientException(RestClientException e) {
		log.error(e.getMessage());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
	
	@ExceptionHandler(MailingServiceException.class)
    public ResponseEntity<String> handleMailingServiceException(MailingServiceException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
    }
	
	@ExceptionHandler(EmailOtpNotValidException.class)
    public ResponseEntity<String> handleEmailOtpNotValidException(EmailOtpNotValidException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("An error occurred: " + e.getMessage());
    }
	
	@ExceptionHandler(PincodeNotFoundException.class)
    public ResponseEntity<String> handlePincodeNotFoundException(PincodeNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
	
	@ExceptionHandler(AddressNotFoundException.class)
    public ResponseEntity<String> handdleAddressNotFoundException(AddressNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
	
	@ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
    }
	
}
