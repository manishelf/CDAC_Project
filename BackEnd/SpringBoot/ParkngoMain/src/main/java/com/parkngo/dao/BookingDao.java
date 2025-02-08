package com.parkngo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkngo.pojos.Booking;

public interface BookingDao extends JpaRepository<Booking, Long> {

}
