package com.luv2code.ecommerce.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.luv2code.ecommerce.entity.Role;

@Repository
@CrossOrigin("http://localhost:4200")
public interface RoleRepository extends JpaRepository<Role, Integer> {

}
