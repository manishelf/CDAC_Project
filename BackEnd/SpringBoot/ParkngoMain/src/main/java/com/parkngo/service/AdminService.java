package com.parkngo.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkngo.dao.AdminDao;
import com.parkngo.exception.UserNotFoundException;
import com.parkngo.pojos.User;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class AdminService {

	@Autowired
	ModelMapper mapper;
	
    @Autowired
    AdminDao adminDao;

    public boolean updateStatus(long usrID) throws UserNotFoundException {
        Optional<User> optionalUser = adminDao.findById(usrID);

            User user = optionalUser.orElseThrow(()->new UserNotFoundException("User Not Found with id - "+usrID));
            
            boolean currentStatus = user.getIsActive();
            user.setIsActive(!currentStatus);
            adminDao.save(user);
            
            log.info("User status updated successfully. New status: " + (!currentStatus ? "Active" : "Inactive"));
            
            return user.getIsActive();
    }
    
    public List<User> getUserDetails() {
        List<User> users = adminDao.findAll(); 

        if (users.isEmpty()) {
            throw new RuntimeException("No users found");
        }

        return users;
    
    }
}
