package com.parkngo.dto;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParkingLotSearchDto {
	
	@NotEmpty(message = "Invalid request token empty")
	String JWT;
	
	List<String> tag;
	
	List<Double> coords; // latitude, longitude of client and range to search in
	
}
