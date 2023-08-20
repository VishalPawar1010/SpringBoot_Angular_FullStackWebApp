package com.luv2code.ecommerce.security.dao;

import java.util.HashSet;
import java.util.Set;

import com.luv2code.ecommerce.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Data
@Builder
//@AllArgsConstructor
@NoArgsConstructor
public class UserDetailForToken {

	private String email;
    private Integer id;
	private Set<Role> roles = new HashSet<>();
    
    
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

//	public UserDetailForToken(String email, Integer id) {
//		super();
//		this.email = email;
//		this.id = id;
//	}

	public UserDetailForToken(String email, Integer id, Set<Role> roles) {
		super();
		this.email = email;
		this.id = id;
		this.roles = roles;
	}

}
