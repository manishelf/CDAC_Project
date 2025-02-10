package com.parkngo.pojos;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString(exclude = {"owner", "manager"})
public class ParkingLot {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@Column(nullable = false)
	String address;
	
	
	//Error org.hibernate.loader.MultipleBagFetchException: cannot simultaneously fetch multiple bags:
	//[com.parkngo.pojos.ParkingLot.manager, com.parkngo.pojos.ParkingLot.sections]
	@OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
	Set<User> manager = new HashSet<>();

	@OneToMany(mappedBy = "lot")
	Set<Section> sections = new HashSet<>();
	
	@OneToOne(cascade = {CascadeType.MERGE , CascadeType.PERSIST})
	User owner;
	
	@OneToOne
	Location location = new Location();

}
