package com.parkngo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkngo.dto.ParkingBookingDto;
import com.parkngo.dto.ParkingLotDto;
import com.parkngo.dto.ParkingLotSearchDto;
import com.parkngo.exception.AddressNotFoundException;
import com.parkngo.exception.PincodeNotFoundException;
import com.parkngo.pojos.Booking;
import com.parkngo.service.BookingService;
import com.parkngo.service.ParkingService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/parking")
@PreAuthorize("hasAnyRole('CLIENT', 'ADMIN')")
public class ParkingController {

    @Autowired
    private ParkingService parkingService;

    @Autowired
    private BookingService bookingService;
    
    @PostMapping("/search")
    public ResponseEntity<?> getParkingLotsByZone(@RequestBody @Valid ParkingLotSearchDto request) throws PincodeNotFoundException, AddressNotFoundException {
        	
    	if(request.getPincode()!=null) {
        	List<ParkingLotDto> parkingLots = parkingService.findParkingLotsByPincode(request.getPincode());
            return ResponseEntity.ok(parkingLots);
    	}else if(request.getAddress()!=null&&request.getAddress()!="") {
    		List<ParkingLotDto> parkingLots = parkingService.findParkingLotsByAddress(request.getAddress());
            return ResponseEntity.ok(parkingLots);
    	}else {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Either pincode or address required");
    	}
        
    }
   

    @PostMapping("/book")
    public ResponseEntity<Long> bookLater(@RequestBody @Valid ParkingBookingDto bookingDto) {
        Booking booking = bookingService.book(bookingDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(booking.getId());
    }
    
    @GetMapping("/booking/{id}")
    public ResponseEntity<Booking> getBookingDetails(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }
}
