package com.parkngo.pojos;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@ToString( exclude = {"user"})
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@OneToOne(cascade = {CascadeType.MERGE , CascadeType.PERSIST})
	User user = new User();
	
	Double payment;
	
	@OneToOne
	Section section = new Section();
	
	@Column(name = "start_date", nullable = false)
	LocalDateTime startDate;
	
	@Column(name = "end_date", nullable = false)
	LocalDateTime endDate;
	
	@Enumerated(EnumType.STRING)
	Status statu = Status.PENDING;
	
	public static enum Status{
		FAILED, REFUNDED, PROCESSED, PENDING
	};
	
	//logs
	@CreationTimestamp
	@Column(name="creation_timestamp")
	LocalDateTime creationTimestamp;
	
	@UpdateTimestamp
	@Column(name="updation_timestamp")
	LocalDateTime updationTimestamp;
	
	
}
