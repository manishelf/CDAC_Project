package com.parkngo.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.parkngo.dao.EmailOTPDao;
import com.parkngo.dao.UserDao;
import com.parkngo.dto.JWTAuthResponse;
import com.parkngo.dto.UserAuthenticationDto;
import com.parkngo.dto.UserRegistrationDto;
import com.parkngo.exception.EmailOtpNotValidException;
import com.parkngo.exception.InvalidCredentialsException;
import com.parkngo.pojos.User;
import com.parkngo.pojos.User.Role;
import com.parkngo.security.JwtUtil;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
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
	
	@Autowired
    RestTemplate restTemplate;
	
	@Autowired
	EmailOTPDao otpDao;
	
	public JWTAuthResponse registerUser(@Valid UserRegistrationDto userRegDto) throws EmailOtpNotValidException {
		User user = mapper.map(userRegDto, User.class);
		
		user.setPassword(encoder.encode(user.getPassword()));
				
		int otp = otpDao.findLatestByEmail(userRegDto.getEmail()).getEmailOTP();
		if(userRegDto.getEmailOtp() == otp) {
			otpDao.deleteAllByEmail(userRegDto.getEmail());
			userDao.save(user);
			String JWT = jwtUtil.generateJwtToken(user);
			System.out.println("--------------");
			return new JWTAuthResponse(JWT, user.getRole());
		}
		else throw new EmailOtpNotValidException("Invalid otp! please try again");
	}

	public JWTAuthResponse authenticate(@Valid UserAuthenticationDto userAuthDto) throws InvalidCredentialsException {
		
		try {
			
			String email = userAuthDto.getEmail();
			
			String password = userAuthDto.getPassword();
						
			Authentication verifiedAuth = authMgr
					.authenticate(new UsernamePasswordAuthenticationToken
							(email, password));
			
			System.out.println(verifiedAuth);
			
			String authorities = verifiedAuth.getAuthorities().toArray()[0].toString();

			
			Role userRole = Role.valueOf(authorities);
			
			if(!userDao.getIsActiveByEmail(email)) return new JWTAuthResponse("", null);
			
			String JWT = jwtUtil.generateJwtToken(verifiedAuth);

			return new JWTAuthResponse(JWT, userRole);
		}catch(Exception e) {
			throw new InvalidCredentialsException(e.getMessage());
		}
	}

}
