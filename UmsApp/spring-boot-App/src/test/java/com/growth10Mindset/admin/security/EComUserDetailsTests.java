package com.growth10Mindset.admin.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.growth10Mindset.admin.entity.Role;
import com.growth10Mindset.admin.entity.User;

import java.util.Collections;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class EComUserDetailsTests {

    @Test
    void testGetAuthorities() {
        Role role = new Role("ROLE_USER");
        Set<Role> roles = Collections.singleton(role);

        User user = new User();
        user.setRoles(roles);

        eComUserDetails userDetails = new eComUserDetails(user);
        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_USER");

        assertTrue(userDetails.getAuthorities().contains(authority));
    }

    @Test
    void testGetPassword() {
        User user = new User();
        user.setPassword("password");

        eComUserDetails userDetails = new eComUserDetails(user);
        assertEquals("password", userDetails.getPassword());
    }

    @Test
    void testGetUsername() {
        User user = new User();
        user.setEmail("email@example.com");

        eComUserDetails userDetails = new eComUserDetails(user);
        assertEquals("email@example.com", userDetails.getUsername());
    }

    @Test
    void testIsAccountNonExpired() {
        User user = new User();

        eComUserDetails userDetails = new eComUserDetails(user);
        assertTrue(userDetails.isAccountNonExpired());
    }

    @Test
    void testIsAccountNonLocked() {
        User user = new User();

        eComUserDetails userDetails = new eComUserDetails(user);
        assertTrue(userDetails.isAccountNonLocked());
    }

    @Test
    void testIsCredentialsNonExpired() {
        User user = new User();

        eComUserDetails userDetails = new eComUserDetails(user);
        assertTrue(userDetails.isCredentialsNonExpired());
    }

    @Test
    void testIsEnabled() {
        User user = new User();
        user.setEnabled(true);

        eComUserDetails userDetails = new eComUserDetails(user);
        assertTrue(userDetails.isEnabled());
    }

    @Test
    void testGetFullname() {
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");

        eComUserDetails userDetails = new eComUserDetails(user);
        assertEquals("John Doe", userDetails.getFullName());
    }

    @Test
    void testSetFirstName() {
        User user = new User();

        eComUserDetails userDetails = new eComUserDetails(user);
        userDetails.setFirstName("John");

        assertEquals("John", user.getFirstName());
    }

    @Test
    void testSetLastName() {
        User user = new User();

        eComUserDetails userDetails = new eComUserDetails(user);
        userDetails.setLastName("Doe");

        assertEquals("Doe", user.getLastName());
    }
}

