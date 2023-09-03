package com.growth10Mindset.admin.security.service;


import com.growth10Mindset.admin.exceptions.MissingParameterException;
import com.growth10Mindset.admin.security.dao.AuthenticationResponse;
import com.growth10Mindset.admin.security.dao.LoginDetail;

public interface LoginService {

    public AuthenticationResponse loginRequest(LoginDetail loginDetail) 
    		throws MissingParameterException
    		;
}
