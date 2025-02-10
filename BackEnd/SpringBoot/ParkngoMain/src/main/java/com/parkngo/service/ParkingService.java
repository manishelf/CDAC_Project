package com.parkngo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkngo.dao.ParkingLotDao;
import com.parkngo.dao.ZoneDao;
import com.parkngo.dto.ParkingLotDto;
import com.parkngo.exception.AddressNotFoundException;
import com.parkngo.exception.PincodeNotFoundException;
import com.parkngo.pojos.ParkingLot;
import com.parkngo.pojos.Zone;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ParkingService {

    @Autowired
    private ParkingLotDao parkingLotRepository;
    
    @Autowired
    private ZoneDao zoneRepository;
    
    @Autowired
    private ModelMapper modelMapper;

    public List<ParkingLotDto> findParkingLotsByPincode(Long pincode) throws PincodeNotFoundException, AddressNotFoundException {
        Zone zone = zoneRepository.findByPincode(pincode);
        System.out.println(zone);
        if (zone == null || zone.getLots().isEmpty()) {
            throw new PincodeNotFoundException("No parking zone found for the given pincode: " + pincode);
        }
        
        return zone.getLots().stream().map((lot)->modelMapper.map(lot, ParkingLotDto.class)).collect(Collectors.toList());
    }

    public List<ParkingLotDto> findParkingLotsByAddress(String address) throws AddressNotFoundException {
        List<ParkingLot> parkingLots = parkingLotRepository.findByAddressContainingIgnoreCase(address);
        
        if (parkingLots.isEmpty()) {
            throw new AddressNotFoundException("No parking lots found for the given address: " + address);
        }
        return parkingLots.stream().map((lot)->modelMapper.map(lot, ParkingLotDto.class)).collect(Collectors.toList());
    }
}
