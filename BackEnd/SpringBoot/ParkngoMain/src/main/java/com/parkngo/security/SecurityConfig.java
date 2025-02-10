package com.parkngo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
public class SecurityConfig{
	
	@Autowired
	private PasswordEncoder enc;

	@Autowired
	private JwtAuthenticationFilter jwtFilter;

	@Autowired
	private CustomAuthenticationEntryPoint authEntry;
	
	 @Bean
	    public CorsFilter corsFilter() {
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        CorsConfiguration config = new CorsConfiguration();
	        config.setAllowCredentials(true);
	        config.addAllowedHeader("*");
	        config.addAllowedMethod("*");
	        config.addAllowedOriginPattern("*");
	        source.registerCorsConfiguration("/**", config);
	        return new CorsFilter(source);
	    }


	 @Bean
	 public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
		 http.csrf(csrf -> csrf.disable())
		  .exceptionHandling(handler -> handler.authenticationEntryPoint(authEntry))
		  .authorizeHttpRequests(auth ->
		        auth.requestMatchers("/user/login", "/user/register", "/user/otp").permitAll()
		          .requestMatchers(HttpMethod.OPTIONS).permitAll()
		          .requestMatchers("/v3/api-docs/**").permitAll()
		          .requestMatchers("/swagger-ui/**").permitAll()
		          .anyRequest().authenticated()
		    )
	         .sessionManagement( sm->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	         .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);	             
	     return http.build();
	 }

	
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception
	{
		return config.getAuthenticationManager();
	}
	
}
