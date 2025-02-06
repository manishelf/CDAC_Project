package com.parkngo.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkngo.pojos.User;

public interface AdminDao extends JpaRepository<User, Long> {
    
    Optional<User> findById(Long id);
    
    List<User> findAll();
    
}
