package com.parkngo.dao;

import com.parkngo.pojos.Zone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZoneDao extends JpaRepository<Zone, Long> {
    Zone findByPincode(Long pincode);
}
