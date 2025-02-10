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
@ToString(exclude= {"user", "description"})
public class SupportTicket {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@OneToOne(cascade = {CascadeType.MERGE , CascadeType.PERSIST})
	User user = new User();

	String title;
	
	@Column(columnDefinition = "LONGTEXT")
	StringBuffer description;
	
	@Enumerated(EnumType.STRING)
	Type type;
	
	public static enum Type {
		COMPLAINT, RECOMENDATION, REFUND
	}
	
	//logs
	@CreationTimestamp
	@Column(name="creation_timestamp")
	LocalDateTime creationTimestamp;
	
	@UpdateTimestamp
	@Column(name="updation_timestamp")
	LocalDateTime updationTimestamp;
}
