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


// write the respective controller, dao 
// If got the address from the geolocation, i.e. pincode, then search in the zones table;
// if got the address from the user i.e. manually, then search in the lot table;
// Both the above addresses are the "to" locations.
// "from" location is been already been set manually.
// In frontend:
// You have to make the changes only in the MapWithDirection component.  // Write the appropriate useeffect there.
// and call the that axios in the HomeScreen component or the home.jsx page.  // or place where the dummy data is been written, there data should be coming from the backend, after calling the axios.


// target pages:
//1. MapWithDirection
//2. HomeScreen/Home.jsx
//3. Pojos:  Zone.java, Parking_lot.java

