package com.growth10Mindset.admin.security.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@ToString
public class LoginDetail {

    private String email;

    private String password;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public LoginDetail() {
//		super();
	}

	public LoginDetail(String email, String password) {
//		super();
		this.email = email;
		this.password = password;
	}
	
}
