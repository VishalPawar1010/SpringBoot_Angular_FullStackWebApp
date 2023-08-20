package com.luv2code.ecommerce.security;
import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.luv2code.ecommerce.entity.Role;
import com.luv2code.ecommerce.security.dao.UserDetailForToken;

public class UserDetailForTokenTests {

    private UserDetailForToken userDetail;

    @BeforeEach
    public void setUp() {
        // Initialize the UserDetailForToken object
        String email = "test@example.com";
        Integer id = 1;
        Set<Role> roles = new HashSet<>();
        roles.add(new Role("ROLE_USER"));
        userDetail = new UserDetailForToken(email, id, roles);
    }

    @Test
    public void getEmailTest() {
        // Verify the getEmail() method returns the expected email
        String expectedEmail = "test@example.com";
        String actualEmail = userDetail.getEmail();
        Assertions.assertEquals(expectedEmail, actualEmail);
    }

    @Test
    public void setEmailTest() {
        // Set a new email and verify it is updated
        String newEmail = "new@example.com";
        userDetail.setEmail(newEmail);
        Assertions.assertEquals(newEmail, userDetail.getEmail());
    }

    @Test
    public void getIdTest() {
        // Verify the getId() method returns the expected id
        Integer expectedId = 1;
        Integer actualId = userDetail.getId();
        Assertions.assertEquals(expectedId, actualId);
    }

    @Test
    public void setIdTest() {
        // Set a new id and verify it is updated
        Integer newId = 2;
        userDetail.setId(newId);
        Assertions.assertEquals(newId, userDetail.getId());
    }

    @Test
    public void getRolesTest() {
        // Verify the getRoles() method returns the expected roles
        Set<Role> expectedRoles = new HashSet<>();
        expectedRoles.add(new Role("ROLE_USER"));
        Set<Role> actualRoles = userDetail.getRoles();
        Assertions.assertEquals(expectedRoles, actualRoles);
    }

    @Test
    public void setRolesTest() {
        // Set new roles and verify they are updated
        Set<Role> newRoles = new HashSet<>();
        newRoles.add(new Role("ROLE_ADMIN"));
        userDetail.setRoles(newRoles);
        Assertions.assertEquals(newRoles, userDetail.getRoles());
    }
}

