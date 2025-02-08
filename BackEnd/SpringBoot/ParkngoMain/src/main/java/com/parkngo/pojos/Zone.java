package com.parkngo.pojos;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString(exclude = {"lots"})
public class Zone {

	@Id
	Long pincode;
	
	// rectangular region that groups together lots
	@OneToOne
	Location northWestBound = new Location();
	
	@OneToOne
	Location southEastBound = new Location();
	
	@OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
	List<ParkingLot> lots = new ArrayList<>();

}

