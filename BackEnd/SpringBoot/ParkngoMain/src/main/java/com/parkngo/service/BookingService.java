package com.parkngo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.parkngo.dao.BookingDao;
import com.parkngo.dao.SectionDao;
import com.parkngo.dao.UserDao;
import com.parkngo.dto.ParkingBookingDto;
import com.parkngo.exception.UserNotFoundException;
import com.parkngo.pojos.Booking;
import com.parkngo.pojos.Section;
import com.parkngo.pojos.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BookingService {

    @Autowired
    private SectionDao sectionDao;

    @Autowired
    private BookingDao bookingDao;
    
    @Autowired
    UserDao userDao;

    public Booking book(ParkingBookingDto bookingDTO) throws UserNotFoundException {
        Booking booking = new Booking();
        
        Section section = sectionDao.findById(bookingDTO.getSectionId())
        		.orElseThrow(()->new RuntimeException("No section with id-"+bookingDTO.getSectionId()));
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User is not authenticated"); 
        }
        
        User user = userDao.findByEmail((String)authentication.getPrincipal()).orElseThrow(()->new UserNotFoundException("No user"));

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
