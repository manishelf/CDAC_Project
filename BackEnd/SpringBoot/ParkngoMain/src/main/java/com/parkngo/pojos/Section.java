package com.parkngo.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString(exclude = {"lot"})
public class Section {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@ManyToOne
	ParkingLot lot = new ParkingLot();
	
	int occupancy = 0;
	
	int capacity = 0;
	
	@Column(name= "charge_rate")
	Double chargeRate;
	
	@Enumerated(EnumType.STRING)
	VehicleType vehicleType=VehicleType.TWO_WHEELER;
	
	
	public static enum VehicleType {
			TWO_WHEELER(1),
			FOUR_WHEELER(4),
			SIXTEEN_WHEELER(24);
			
			final int occupies;
			
			VehicleType(int occupies){
				this.occupies=occupies;
			}
	}
}
