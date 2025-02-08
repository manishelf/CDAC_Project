package com.parkngo.dto;

import java.util.List;

import com.parkngo.pojos.Location;
import com.parkngo.pojos.Section;

import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParkingLotDto extends ApiResponse{
	
	Long id;
	
	String address;

	List<SectionDto> sections;
	

	@OneToOne
	Location location = new Location();

}
