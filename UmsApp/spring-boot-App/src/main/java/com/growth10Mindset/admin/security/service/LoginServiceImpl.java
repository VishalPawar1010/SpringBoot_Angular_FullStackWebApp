package com.growth10Mindset.admin.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.growth10Mindset.admin.exceptions.MissingParameterException;
import com.growth10Mindset.admin.security.dao.AuthenticationResponse;
import com.growth10Mindset.admin.security.dao.LoginDetail;


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