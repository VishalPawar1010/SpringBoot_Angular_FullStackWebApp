package com.luv2code.ecommerce.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.luv2code.ecommerce.entity.Role;

public class RoleRepositoryTests {
	private Role role1;
	private Role role2;
	private Role role3;
	private Role role4;
	
	@BeforeEach
	public void setUp() {
		role1 = new Role();
		role1.setId(7);
		role1 = new Role("Tester");
		role2 = new Role("Analyst");
		role3 = new Role(6);
		role4 = new Role("HR","To make strategy for effectuve recruitment");
	}
	@Test
    public void testGettersAndSetters() {
		assertEquals("Tester", role1.getName());
		
		role1.setName("DataEngineer");
		assertEquals("DataEngineer", role1.getName());
		
		role1.setDescription("Tester role is for testing the code");
		assertEquals("Tester role is for testing the code", role1.getDescription());
		
		role1.setDescription("DataEngineer role for engieering the data flow");
		assertEquals("DataEngineer role for engieering the data flow", role1.getDescription());
		
		assertFalse(role1.equals(null));
		assertFalse(role1.equals(new Object()));
		assertTrue(role1.equals(role1));
//		assertFalse(role1.equals(role2));
		assertTrue(role1.equals(role2));
		assertEquals(6, role3.getId());
		assertEquals("HR", role4.getName());
	}


	
	@Test
	public void testToString() {
		assertEquals("Tester", role1.toString());
		
		boolean flag = equals(role1);
		assertFalse(flag);
	}
	
	@Test
	public void testHashCode() {
//		assertNotNull(role2.hashCode());
		assertEquals(role1.hashCode(), role2.hashCode());
		assertNotEquals(role3.hashCode(),role4.hashCode());
	}


}
