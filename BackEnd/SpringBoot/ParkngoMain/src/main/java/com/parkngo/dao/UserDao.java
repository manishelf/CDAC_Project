package com.parkngo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.parkngo.pojos.User;

@Repository
public interface UserDao extends JpaRepository<User, Long>{
	Optional<User> findByEmailAndPassword(String email, String password);
	
	Optional<User> findByEmail(String email);
	
}
