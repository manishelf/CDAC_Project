package com.parkngo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.parkngo.pojos.ParkingLot;

@Repository
public interface ParkingLotDao extends JpaRepository<ParkingLot, Long> {
	List<ParkingLot> findByAddressContainingIgnoreCase(String address);
}
