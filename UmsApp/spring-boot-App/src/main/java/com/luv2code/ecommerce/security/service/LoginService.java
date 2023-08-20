package com.luv2code.ecommerce.security.service;


import com.luv2code.ecommerce.exceptions.MissingParameterException;
import com.luv2code.ecommerce.security.dao.AuthenticationResponse;
import com.luv2code.ecommerce.security.dao.LoginDetail;

public interface LoginService {

    public AuthenticationResponse loginRequest(LoginDetail loginDetail) 
    		throws MissingParameterException
    		;
}
