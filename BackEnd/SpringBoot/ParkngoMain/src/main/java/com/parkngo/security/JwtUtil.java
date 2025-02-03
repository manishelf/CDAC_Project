package com.parkngo.security;

import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtUtil {
	
	@Value("${JWT_SECRET_KEY}")
	private String jwtSecret;

	@Value("${EXP_TIMEOUT}")
	private int jwtExpirationMs;
		
	private Key key;

	@PostConstruct
	public void init() {
		key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}

	public String generateJwtToken(Authentication authentication) {
		
		CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();
		
		String JWT = Jwts.builder() 
						.setSubject((userPrincipal.getUsername())) 
						.setIssuedAt(new Date())
						.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
						.claim("authorities", getAuthoritiesInString(userPrincipal.getAuthorities()))
						.signWith(key, SignatureAlgorithm.HS512) 
						.compact();
		
		log.info("generate jwt token " + authentication);
		return JWT;
	}
	
	private String getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities) {
		
		String authorityString = authorities.stream().
				map(authority -> authority.getAuthority())
				.collect(Collectors.joining(","));
		
		return authorityString;
	}

	public String getUserNameFromJwtToken(Claims claims) {
		return claims.getSubject();
	}

	public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {
		String authString = (String) claims.get("authorities");
		
		List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(authString);
		
		return authorities;
	}

	public Claims validateJwtToken(String JWT) {
		
		Claims claims = Jwts.parserBuilder()
							.setSigningKey(key)
							.build()
							.parseClaimsJws(JWT)
							.getBody();
		
		return claims;
	}


}
