package com.parkngo.controller;

import com.parkngo.dto.AddressRequestDto;
import com.parkngo.dto.PincodeRequestDto;
import com.parkngo.exception.AddressNotFoundException;
import com.parkngo.exception.PincodeNotFoundException;
import com.parkngo.pojos.ParkingLot;
import com.parkngo.service.ParkingService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parking")
@Slf4j
public class ParkingController {

    @Autowired
    private ParkingService parkingService;

    @PostMapping("/searchByPincode")
    public ResponseEntity<?> getParkingLotsByZone(@RequestBody @Valid PincodeRequestDto request) {
        log.info("Searching parking lots for pincode: {}", request.getPincode());

        try {
            List<ParkingLot> parkingLots = parkingService.findParkingLotsByPincode(request.getPincode());
            return ResponseEntity.ok(parkingLots);
        } catch (PincodeNotFoundException e) {
            log.error("Error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected Error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
            
        }
    }

    @PostMapping("/searchByAddress")
    public ResponseEntity<?> getParkingLotsByAddress(@RequestBody @Valid AddressRequestDto request) {
        log.info("Searching parking lots for address: {}", request.getAddress());

        try {
            List<ParkingLot> parkingLots = parkingService.findParkingLotsByAddress(request.getAddress());
            return ResponseEntity.ok(parkingLots);
        } catch (AddressNotFoundException e) {
            log.error("Error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected Error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }
}
