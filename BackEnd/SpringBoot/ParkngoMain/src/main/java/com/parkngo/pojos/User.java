package com.parkngo.pojos;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString(exclude = {"password"})
public class User {
	
	@Id
	@Column(length = 100, nullable = false, unique = true)
	String email;
	
	@Column(nullable = false)
	String password;
	
	String firstName;
	
	String lastName;
	
	
	@Column(length=100, nullable = false, unique = true)
	String drivingLiscence;
	
	
	//for soft delete
	@Column(name = "is_active")
	Boolean isActive;
	
	@Enumerated(EnumType.STRING)
	Role role = Role.END_USER;
	
	public static enum Role {
		END_USER, LOT_MANAGER, LOT_OWNER, SITE_ADMIN
	}
	
	
	//logs
	@CreationTimestamp
	@Column(name="creation_timestamp")
	LocalDateTime creationTimestamp;
	
	@UpdateTimestamp
	@Column(name="updation_timestamp")
	LocalDateTime updationTimestamp;
}
