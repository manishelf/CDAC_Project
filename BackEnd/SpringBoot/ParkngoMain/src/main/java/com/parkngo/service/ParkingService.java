package com.parkngo.service;

import com.parkngo.exception.AddressNotFoundException;
import com.parkngo.exception.PincodeNotFoundException;
import com.parkngo.pojos.ParkingLot;
import com.parkngo.pojos.Zone;
import com.parkngo.repository.ParkingLotRepository;
import com.parkngo.repository.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ParkingService {

    @Autowired
    private ParkingLotRepository parkingLotRepository;
    
    @Autowired
    private ZoneRepository zoneRepository;

    public List<ParkingLot> findParkingLotsByPincode(Long pincode) throws PincodeNotFoundException {
        Zone zone = zoneRepository.findByPincode(pincode);
        if (zone == null || zone.getLots().isEmpty()) {
            throw new PincodeNotFoundException("No parking zone found for the given pincode: " + pincode);
        }
        return zone.getLots();
    }

    public List<ParkingLot> findParkingLotsByAddress(String address) throws AddressNotFoundException {
        List<ParkingLot> parkingLots = parkingLotRepository.findByAddressContainingIgnoreCase(address);
        if (parkingLots.isEmpty()) {
            throw new AddressNotFoundException("No parking lots found for the given address: " + address);
        }
        return parkingLots;
    }
}
