package com.parkngo.dto;

import com.parkngo.pojos.Booking;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParkingBookingResponse {

	Booking.Status bookingStatus = Booking.Status.PENDING;
	
	Double paymentAmount = 0.0;
	
	String lotName;
	
	String section;
}
