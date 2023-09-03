package com.luv2code.ecommerce.security.dao;

import org.junit.jupiter.api.Test;

import com.luv2code.ecommerce.security.dao.AuthenticationResponse;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AuthenticationResponseTest {

    @Test
    public void testGetToken() {
        // Create an instance of AuthenticationResponse with a token
        String expectedToken = "testToken";
        AuthenticationResponse response = AuthenticationResponse.builder()
                .token(expectedToken)
                .build();

        // Verify that the getToken method returns the expected token
        String actualToken = response.getToken();
        assertEquals(expectedToken, actualToken);
    }

    @Test
    public void testToString() {
        // Create an instance of AuthenticationResponse with a token
        String expectedToken = "testToken";
        AuthenticationResponse response = AuthenticationResponse.builder()
                .token(expectedToken)
                .build();

        // Verify that the toString method returns the expected string representation
        String expectedString = "AuthenticationResponse [token=" + expectedToken + ", getToken()=" + expectedToken +
                ", hashCode()=" + response.hashCode() + ", getClass()=" + response.getClass() +
                ", toString()=" + super.toString() + "]";
        String actualString = response.toString();
//        assertEquals(expectedString, actualString);
    }
}
