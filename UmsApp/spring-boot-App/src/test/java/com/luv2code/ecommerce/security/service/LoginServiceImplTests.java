package com.luv2code.ecommerce.security.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.luv2code.ecommerce.exceptions.MissingParameterException;
import com.luv2code.ecommerce.security.dao.AuthenticationResponse;
import com.luv2code.ecommerce.security.dao.LoginDetail;

public class LoginServiceImplTests {

    @Mock
    private LoginService loginDao;

    @InjectMocks
    private LoginServiceImpl loginService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoginRequest() throws MissingParameterException {
        // Mock data
        LoginDetail loginDetail = new LoginDetail("username", "password");
        AuthenticationResponse expectedResult;
        expectedResult = new AuthenticationResponse("token");

        // Mock LoginService behavior
        when(loginDao.loginRequest(loginDetail)).thenReturn(expectedResult);

        // Call the service method
        AuthenticationResponse result = loginService.loginRequest(loginDetail);

        // Verify the result
        assertNotNull(result);
        assertEquals(expectedResult.getToken(), result.getToken());
//        assertEquals(expectedResult.getStatus(), result.getStatus());
        verify(loginDao, times(1)).loginRequest(loginDetail);
    }
}
