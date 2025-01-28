package com.parkngo.pojos;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
@ToString(exclude = {"message", "user"})
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	String message;
	
	@Enumerated(EnumType.STRING)
	Status status = Status.PENDING;
	
	
	@ManyToOne
	User user = new User();
	
	public static enum Status{
		DELIVERED, PENDING, STALE
	}
	
	//logs
	@CreationTimestamp
	@Column(name="creation_timestamp")
	LocalDateTime creationTimestamp;
	
	@UpdateTimestamp
	@Column(name="updation_timestamp")
	LocalDateTime updationTimestamp;
}
