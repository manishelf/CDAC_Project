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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString(exclude = {"password"})
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@Column(length = 100, nullable = false, unique = true)
	String email;
	
	@Column(nullable = false)
	String password;
	
	@Column(length = 50, nullable = false)
	String name;
	
	@Column(length=100, nullable = false, unique = true)
	String drivingLiscence;
	
	
	//for soft delete
	@Column(name = "is_active")
	Boolean isActive = true;
	
	@Enumerated(EnumType.STRING)
	Role role = Role.END_USER;
	
	@Getter
	@AllArgsConstructor
	public static enum Role{
		END_USER(
				List.of(Authority.BOOK_PARKING, Authority.CANCEL_BOOKING, Authority.VIEW_BOOKING_HISTORY, Authority.CREATE_SUPPORT_TICKET, Authority.UPDATE_PROFILE)),
        MANAGER(
        		List.of(Authority.BOOK_PARKING, Authority.CANCEL_BOOKING, Authority.VIEW_BOOKING_HISTORY, Authority.CREATE_SUPPORT_TICKET, Authority.UPDATE_PROFILE, Authority.VIEW_LOT_BOOKINGS, Authority.UPDATE_SUPPORT_TICKET)),
        OWNER(
        		List.of(Authority.BOOK_PARKING, Authority.CANCEL_BOOKING, Authority.VIEW_BOOKING_HISTORY, Authority.CREATE_SUPPORT_TICKET, Authority.UPDATE_PROFILE, Authority.VIEW_LOT_BOOKINGS, Authority.UPDATE_SUPPORT_TICKET, Authority.MANAGE_USERS)),
        ADMIN(
        		List.of(Authority.BOOK_PARKING, Authority.CANCEL_BOOKING, Authority.VIEW_BOOKING_HISTORY, Authority.CREATE_SUPPORT_TICKET, Authority.UPDATE_PROFILE, Authority.VIEW_LOT_BOOKINGS, Authority.UPDATE_SUPPORT_TICKET, Authority.MANAGE_USERS, Authority.VIEW_LOGS));

        private List<Authority> authorities;
	}
	
	private static enum Authority{
		BOOK_PARKING, 
		CANCEL_BOOKING,
		VIEW_BOOKING_HISTORY,
		CREATE_SUPPORT_TICKET,
		UPDATE_PROFILE,
		VIEW_LOT_BOOKINGS,
		UPDATE_SUPPORT_TICKET,
		MANAGE_USERS,
		VIEW_LOGS,
	}
	
	//logs
	@CreationTimestamp
	@Column(name="creation_timestamp")
	LocalDateTime creationTimestamp;
	
	@UpdateTimestamp
	@Column(name="updation_timestamp")
	LocalDateTime updationTimestamp;
}
