package com.parkngo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.parkngo.pojos.EmailOTP;

@Repository
public interface EmailOTPDao extends JpaRepository<EmailOTP, Long>{
	
	@Query("SELECT e FROM EmailOTP e WHERE e.email = :email ORDER BY e.creationTimestamp DESC LIMIT 1")
    EmailOTP findLatestByEmail(@Param("email") String email);

	
	void deleteAllByEmail(String email);
}
