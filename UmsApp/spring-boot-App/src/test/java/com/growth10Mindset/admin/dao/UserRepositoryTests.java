package com.growth10Mindset.admin.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.growth10Mindset.admin.entity.Role;
import com.growth10Mindset.admin.entity.User;
import com.growth10Mindset.admin.repo.UserRepository;


//@DataJpaTest
//@AutoConfigureTestDatabase
//@Disabled
public class UserRepositoryTests {

	
	    @Autowired
	    private TestEntityManager entityManager;

	    @Autowired
	    private UserRepository userRepository;

	    private User testUser;
	    private Role role1;
	    private Role role2;

	    @BeforeEach
	    public void setUp() {
	    	testUser = new User(null, "ramesh@patel.com", "password", "Ramesh", "Patel", null, false, null);
	        role1 = new Role("Admin");
	        role2 = new Role("Editor");
	    }
	

	
	    @Test
	    public void testCreateAndGetUser() {
	        User user = new User();
//	        user.setId(1);
	        user.setFirstName("John");
	        user.setEnabled(true);
	        user.setEmail("john@gmail.com");
	        user.setLastName("Patel");
	        

	        assertEquals(true, user.isEnabled());
	        assertEquals("John", user.getFirstName());
	        assertEquals("Patel", user.getLastName());
	        assertEquals("john@gmail.com", user.getEmail());

	    }
	    @Test
	    public void testGettersAndSetters() {
	        Integer id = 123;
	        String email ="ramesh@patel.com";
	        String password = "password";
	        String firstName = "Ramesh";
	        String lastName = "Patel";
	        String photos = "photo.png";
	        boolean enabled = true;
	        Set<Role> roles = new HashSet<>();
	        roles.add(role1);
	        roles.add(role2);
	        
	        testUser.setId(id);
	        testUser.setEmail(email);
	        testUser.setPassword(password);
	        testUser.setFirstName(firstName);
	        testUser.setLastName(lastName);
//	        testUser.setPhoto(photos);
	        testUser.setEnabled(enabled);
	        testUser.setRoles(roles);
	        
	        assertEquals(id, testUser.getId());
	        assertEquals(email, testUser.getEmail());
	        assertEquals(password, testUser.getPassword());
	        assertEquals(firstName, testUser.getFirstName());
	        assertEquals(lastName, testUser.getLastName());
//	        assertEquals(photos, testUser.getPhoto());
	        assertTrue(testUser.isEnabled());
	        assertEquals(roles, testUser.getRoles());
	    }


	    
	    @Test
	    public void testConstructor() {
	        assertNotNull(testUser);
	        assertEquals("ramesh@patel.com", testUser.getEmail());
	        assertEquals("password", testUser.getPassword());
	        assertEquals("Ramesh", testUser.getFirstName());
	        assertEquals("Patel", testUser.getLastName());
	        
	    }
}
