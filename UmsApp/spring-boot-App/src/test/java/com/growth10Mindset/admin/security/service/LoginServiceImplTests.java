package com.growth10Mindset.admin.security.service;

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

import com.growth10Mindset.admin.exceptions.MissingParameterException;
import com.growth10Mindset.admin.security.dao.AuthenticationResponse;
import com.growth10Mindset.admin.security.dao.LoginDetail;
import com.growth10Mindset.admin.security.service.LoginService;
import com.growth10Mindset.admin.security.service.LoginServiceImpl;

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
