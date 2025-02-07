package com.parkngo.pojos;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
	
	@OneToMany(cascade = {CascadeType.MERGE , CascadeType.PERSIST})
	List<User> manager = new ArrayList<>();
	
	@OneToOne(cascade = {CascadeType.MERGE , CascadeType.PERSIST})
	User owner;
	
	@OneToOne
	Location location = new Location();
	
	@OneToMany(mappedBy = "lot")
	List<Section> sections = new ArrayList<>();
}
