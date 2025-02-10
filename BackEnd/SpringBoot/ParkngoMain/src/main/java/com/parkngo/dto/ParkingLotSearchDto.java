package com.parkngo.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ParkingLotSearchDto {
	Long pincode;
	
	String address;
	
	List<Double> coords; // latitude, longitude of client and range to search in
	
}
