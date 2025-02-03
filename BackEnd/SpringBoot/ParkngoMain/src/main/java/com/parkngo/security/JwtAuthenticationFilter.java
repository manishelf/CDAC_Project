package com.parkngo.security;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	
	@Autowired
	JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String authHeader = request.getHeader("Authorization");
		
		if(authHeader != null && authHeader.startsWith("Bearer ")) {
			
			String jwt = authHeader.substring(7);

			Claims payloadClaims = jwtUtil.validateJwtToken(jwt);
			
			String email = jwtUtil.getUserNameFromJwtToken(payloadClaims);
			
			List<GrantedAuthority> authorities = jwtUtil.getAuthoritiesFromClaims(payloadClaims);

			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email, null,
					authorities);
			
			SecurityContextHolder.getContext().setAuthentication(token);
			
		}
		
		
		
		filterChain.doFilter(request, response);
		
	}

}
