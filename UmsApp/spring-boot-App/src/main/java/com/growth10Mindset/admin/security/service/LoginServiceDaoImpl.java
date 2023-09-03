package com.growth10Mindset.admin.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.growth10Mindset.admin.entity.User;
import com.growth10Mindset.admin.exceptions.MissingParameterException;
import com.growth10Mindset.admin.security.dao.AuthenticationResponse;
import com.growth10Mindset.admin.security.dao.LoginDetail;
import com.growth10Mindset.admin.security.dao.UserDetailForToken;
import com.growth10Mindset.admin.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginServiceDaoImpl implements LoginService {

	@Autowired
	private UserService userService;
	
	@Autowired
    private  JwtService jwtService;
	
	@Autowired
    private  AuthenticationManager authenticationManager;
	
	@Autowired
    private  AuthenticationProvider authenticationProvider;

    @Override
    public AuthenticationResponse loginRequest(LoginDetail loginDetail) throws MissingParameterException {
        User user = userService.findByEmail(loginDetail.getEmail());
    	authenticationManager.authenticate(
    	        new UsernamePasswordAuthenticationToken(
    	        		loginDetail.getEmail(),
    	        		loginDetail.getPassword()
    	        )
    	    );
    	UserDetailForToken userDetailForToken = new UserDetailForToken(user.getEmail(), user.getId(), user.getRoles());
		String jwtToken = jwtService.generateToken(userDetailForToken);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
