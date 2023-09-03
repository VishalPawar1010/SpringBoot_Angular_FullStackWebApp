package com.growth10Mindset.admin.security.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.growth10Mindset.admin.entity.User;
import com.growth10Mindset.admin.exceptions.MissingParameterException;
import com.growth10Mindset.admin.security.dao.AuthenticationResponse;
import com.growth10Mindset.admin.security.dao.LoginDetail;
import com.growth10Mindset.admin.security.dao.UserDetailForToken;
import com.growth10Mindset.admin.security.service.JwtService;
import com.growth10Mindset.admin.security.service.LoginServiceDaoImpl;
import com.growth10Mindset.admin.service.UserService;

public class LoginServiceDaoImplTests {

    @Mock
    private UserService userService;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private AuthenticationProvider authenticationProvider;

    @InjectMocks
    private LoginServiceDaoImpl loginServiceDao;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoginRequest() throws MissingParameterException {
        // Mock data
        LoginDetail loginDetail = new LoginDetail("username", "password");
        User user = new User(null, "email@example.com", "password", "ROLE_USER", null, null, false, null);


        // Mock UserService behavior
        when(userService.findByEmail(loginDetail.getEmail())).thenReturn(user);

        // Mock JwtService behavior
        when(jwtService.generateToken(any(UserDetailForToken.class))).thenReturn("jwtToken");

        // Mock AuthenticationManager behavior
        doReturn(null).when(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));

        // Call the service method
        AuthenticationResponse result = loginServiceDao.loginRequest(loginDetail);

        // Verify the result
        assertNotNull(result);
        assertEquals("jwtToken", result.getToken());
        verify(userService, times(1)).findByEmail(loginDetail.getEmail());
        verify(jwtService, times(1)).generateToken(any(UserDetailForToken.class));
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }
}

