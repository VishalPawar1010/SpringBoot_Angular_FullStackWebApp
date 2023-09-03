package com.growth10Mindset.admin.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.growth10Mindset.admin.controller.LoginController;
import com.growth10Mindset.admin.exceptions.MissingParameterException;
import com.growth10Mindset.admin.security.dao.AuthenticationResponse;
import com.growth10Mindset.admin.security.dao.LoginDetail;
import com.growth10Mindset.admin.security.service.LoginService;

public class LoginControllerTests {

    @Mock
    private LoginService loginService;

    @InjectMocks
    private LoginController loginController;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        objectMapper = new ObjectMapper();
    }

    @Test
    public void testHome() {
        // Call the controller method
        String response = loginController.home();

        // Verify the response
        assertEquals("Welcome to home", response);
    }

    @Test
    public void testLoginRequest() throws MissingParameterException {
        // Mock data
        LoginDetail loginDetail = new LoginDetail();
        AuthenticationResponse authenticationResponse = new AuthenticationResponse("token");

        // Mock LoginService behavior
        when(loginService.loginRequest(loginDetail)).thenReturn(authenticationResponse);

        // Call the controller method
        ResponseEntity<AuthenticationResponse> responseEntity = loginController.loginRequest(loginDetail);

        // Verify the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(authenticationResponse, responseEntity.getBody());
        verify(loginService, times(1)).loginRequest(loginDetail);
    }

    @Test
    public void testLogout() {
        // Mock data
        LoginDetail loginDetail = new LoginDetail();

        // Call the controller method
        ResponseEntity<AuthenticationResponse> responseEntity = loginController.logout(loginDetail);

        // Verify the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        verifyNoInteractions(loginService);
    }

    // Add more tests for other methods if needed...

    // Helper method to convert object to JSON string
    private String convertToJson(Object object) throws Exception {
        return objectMapper.writeValueAsString(object);
    }
}