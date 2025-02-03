package com.parkngo.service;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.parkngo.dao.UserDao;
import com.parkngo.dto.JWTAuthResponse;
import com.parkngo.dto.UserAuthenticationDto;
import com.parkngo.dto.UserRegistrationDto;
import com.parkngo.pojos.User;
import com.parkngo.pojos.User.Role;
import com.parkngo.security.JwtUtil;

import jakarta.validation.Valid;

@Service
public class UserService {

	@Autowired
	UserDao userDao;

	@Autowired
	ModelMapper mapper;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	AuthenticationManager authMgr;
	
	@Autowired
	JwtUtil jwtUtil;
	
	public void registerUser(@Valid UserRegistrationDto userRegDto) {
		
		User user = mapper.map(userRegDto, User.class);
		
		user.setPassword(encoder.encode(user.getPassword()));
		
		userDao.save(user);
	}

	public JWTAuthResponse authenticate(@Valid UserAuthenticationDto userAuthDto) {
		
		Authentication verifiedAuth = authMgr
				.authenticate(new UsernamePasswordAuthenticationToken
						(userAuthDto.getEmail(), userAuthDto.getPassword()));
		
		String authorities = verifiedAuth.getAuthorities().toArray()[0].toString();
		
		Role userRole = Role.valueOf(authorities);
		
		String JWT = jwtUtil.generateJwtToken(verifiedAuth);
		
		return new JWTAuthResponse(JWT, userRole);
	}

}
