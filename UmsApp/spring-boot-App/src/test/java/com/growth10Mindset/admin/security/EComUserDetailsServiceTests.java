package com.growth10Mindset.admin.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.growth10Mindset.admin.entity.User;
import com.growth10Mindset.admin.security.eComUserDetailsService;
import com.growth10Mindset.admin.security.service.JwtService;
import com.growth10Mindset.admin.service.UserService;

public class EComUserDetailsServiceTests {

	 @Mock
	    private UserService userService;

	    @Mock
	    private JwtService jwtService;

	    @BeforeEach
	    void setUp() {
	        MockitoAnnotations.openMocks(this);
	    }

	    @Test
	    void testLoadUserByUsername_ExistingUser() {
	        User user = new User();
	        user.setEmail("email@example.com");

	        when(userService.findByEmail("email@example.com")).thenReturn(user);

	        eComUserDetailsService userDetailsService = new eComUserDetailsService(userService);
	        UserDetails userDetails = userDetailsService.loadUserByUsername("email@example.com");

	        assertNotNull(userDetails);
	        assertEquals("email@example.com", userDetails.getUsername());

	        verify(userService, times(1)).findByEmail("email@example.com");
	    }

	    @Test
	    void testLoadUserByUsername_NonExistingUser() {
	        when(userService.findByEmail("email@example.com")).thenReturn(null);

	        eComUserDetailsService userDetailsService = new eComUserDetailsService(userService);

	        assertThrows(UsernameNotFoundException.class, () -> {
	            userDetailsService.loadUserByUsername("email@example.com");
	        });

	        verify(userService, times(1)).findByEmail("email@example.com");
	    }
}
