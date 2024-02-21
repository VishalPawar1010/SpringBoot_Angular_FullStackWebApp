package com.growth10Mindset.admin.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.growth10Mindset.admin.entity.Role;
import com.growth10Mindset.admin.entity.User;

@Repository
@CrossOrigin("http://localhost:4200")
public interface RoleRepository extends JpaRepository<Role, Integer> {
	
//	List<Role> getAllRoles();

}
