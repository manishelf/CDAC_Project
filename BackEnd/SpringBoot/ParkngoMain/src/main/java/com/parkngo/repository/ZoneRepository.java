package com.parkngo.repository;

import com.parkngo.pojos.Zone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZoneRepository extends JpaRepository<Zone, Long> {
    Zone findByPincode(Long pincode);
}
