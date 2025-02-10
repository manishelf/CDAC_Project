package com.parkngo.pojos;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class EmailOTP {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@Column(length = 100, nullable = false)
	String email;
	
	@Min(100000)
    @Max(999999)
    Integer emailOTP;

	@CreationTimestamp
	@Column(name="creation_timestamp")
	LocalDateTime creationTimestamp;

	public EmailOTP(String email, @Min(100000) @Max(999999) Integer emailOTP) {
		super();
		this.email = email;
		this.emailOTP = emailOTP;
	}
}
