package com.parkngo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.parkngo.dao.UserDao;
import com.parkngo.pojos.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
		
		User user = userDao.findByEmail(userEmail)
				.orElseThrow(()-> new UsernameNotFoundException("no user with email '"+userEmail+"'"));
		
		return new CustomUserDetails(user);
	}

}
