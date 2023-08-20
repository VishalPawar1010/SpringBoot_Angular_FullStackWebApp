package com.luv2code.ecommerce.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.exceptions.MissingParameterException;
import com.luv2code.ecommerce.security.dao.AuthenticationResponse;
import com.luv2code.ecommerce.security.dao.LoginDetail;


@Qualifier("loginDaoImpl")
@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private LoginService loginDao;

 	@Override
 	public AuthenticationResponse loginRequest(LoginDetail loginDetail) throws MissingParameterException {
 		return loginDao.loginRequest(loginDetail);
}
}