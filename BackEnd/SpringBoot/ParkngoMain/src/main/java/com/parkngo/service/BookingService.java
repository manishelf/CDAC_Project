package com.parkngo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkngo.dao.BookingDao;
import com.parkngo.dao.SectionDao;
import com.parkngo.dao.UserDao;
import com.parkngo.dto.ParkingBookingDto;
import com.parkngo.pojos.Booking;
import com.parkngo.pojos.Section;
import com.parkngo.pojos.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BookingService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private SectionDao sectionDao;

    @Autowired
    private BookingDao bookingDao;

    public Booking book(ParkingBookingDto bookingDTO) {
        Booking booking = new Booking();

        User user = userDao.findById(bookingDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Section section = sectionDao.findById(bookingDTO.getSectionId()).orElseThrow(() -> new RuntimeException("Section not found"));

        booking.setUser(user);
        booking.setSection(section);
        booking.setPayment(bookingDTO.getPayment());
        booking.setStartDate(bookingDTO.getStartDate());
        booking.setEndDate(bookingDTO.getEndDate());
        booking.setStatus(Booking.Status.PENDING);
        
        bookingDao.save(booking);
        
        return booking;
    }

    public Booking getBookingById(Long id) {
        return bookingDao.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
    }
}
