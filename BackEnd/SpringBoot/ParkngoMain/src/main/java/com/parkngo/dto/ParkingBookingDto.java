package com.parkngo.dto;

import java.time.LocalDateTime;

import com.parkngo.pojos.Section;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

public class ParkingBookingDto {

	@NotEmpty(message = "Invalid request token missing")
	String JWT;
	
	@NotNull(message = "vehicle type missing")
	Section.VehicleType VehicleType;
	
	@NotNull(message = "start date missing")
	@PastOrPresent(message = "date out of bound")
	LocalDateTime startDate;
	
	@NotNull(message = "end date missing")
	@FutureOrPresent(message = "date out of bound")
	LocalDateTime endDate;
}
