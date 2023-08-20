package com.luv2code.ecommerce.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.entity.User;
import com.luv2code.ecommerce.repo.UserRepository;
import com.luv2code.ecommerce.security.service.JwtService;
import com.luv2code.ecommerce.service.UserService;

@Service
public class eComUserDetailsService implements UserDetailsService {

	private UserService userService;
	
	@Autowired
	private JwtService jwtService;
	
	public eComUserDetailsService(UserService userService) {
		super();
		this.userService = userService;
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userService.findByEmail(email);
		if (user != null) {
			return new eComUserDetails(user);
		}
		throw new UsernameNotFoundException("Could not find user with email: " + email);
	}

}
