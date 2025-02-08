package com.parkngo.dto;

import java.time.LocalDateTime;

import com.parkngo.pojos.Section;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParkingBookingDto {
	
	@NotNull(message = "vehicle type missing")
	Section.VehicleType VehicleType;
	
	@NotNull(message="section id required")
	Long sectionId;
	
	@NotNull(message="user id required")
	Long userId;
	
	// date validation causes errors in mapping and transfer
	@NotNull(message = "start date missing")
//	@FutureOrPresent(message = "date out of bound")
	LocalDateTime startDate;
	
	@NotNull(message = "end date missing")
//	@FutureOrPresent(message = "date out of bound")
	LocalDateTime endDate;
	
	@NotNull(message="payment required")
	Double payment;
}
