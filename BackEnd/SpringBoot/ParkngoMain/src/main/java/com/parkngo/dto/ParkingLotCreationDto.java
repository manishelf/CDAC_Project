package com.parkngo.dto;

import java.util.List;

import com.parkngo.pojos.Section;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParkingLotCreationDto {
	
	@NotEmpty(message = "Invalid request token empty")
	String JWT;

	@NotEmpty(message = "Invalid request name empty")
	String name;
	
	@NotNull(message = "Invalid request tags for lot missing")
	List<String> tags;
	
	@NotNull(message = "Invalid request sections for lot missing")
	List<Section> sections;
	
	@NotNull(message = "Invalid request location missing")
	Double latitude;
	
	@NotNull
	Double longitude;
	
}
