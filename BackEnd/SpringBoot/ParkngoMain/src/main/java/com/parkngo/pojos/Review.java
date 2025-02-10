package com.parkngo.pojos;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString(exclude= {"user", "lot", "description"})
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@OneToOne(cascade = {CascadeType.MERGE , CascadeType.PERSIST})
	User user = new User();
	
	@OneToOne(cascade = {CascadeType.MERGE , CascadeType.PERSIST})
	ParkingLot lot = new ParkingLot();

	Integer score = 0;
	
	@Column(columnDefinition = "LONGTEXT")
	StringBuffer description;
	
	//logs
	@CreationTimestamp
	@Column(name="creation_timestamp")
	LocalDateTime creationTimestamp;
		
	@UpdateTimestamp
	@Column(name="updation_timestamp")
	LocalDateTime updationTimestamp;
	
}

