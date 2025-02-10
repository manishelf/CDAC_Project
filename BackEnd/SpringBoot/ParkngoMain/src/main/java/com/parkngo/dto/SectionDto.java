package com.parkngo.dto;

import com.parkngo.pojos.Section.VehicleType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SectionDto {
	Long id;
	
	int occupancy = 0;
	
	int capacity = 0;
	
	Double chargeRate;
	
	VehicleType vehicleType = VehicleType.TWO_WHEELER;
}
