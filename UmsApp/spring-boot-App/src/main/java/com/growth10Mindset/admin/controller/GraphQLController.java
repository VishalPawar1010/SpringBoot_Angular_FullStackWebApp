package com.growth10Mindset.admin.controller;

import com.growth10Mindset.admin.entity.Role;
import com.growth10Mindset.admin.repo.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class GraphQLController{
	
	@Autowired
	private RoleRepository roleRepository;
	
	@QueryMapping("getAllRoles")
	public List<Role>getAllRoles() {
        List<Role> roles = roleRepository.findAll();
		System.out.println("============");
		System.out.println("Roles"+roles );

		return roles;
    }
    
}