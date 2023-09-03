package com.growth10Mindset.admin.security.dao;

import org.junit.jupiter.api.Test;

import com.growth10Mindset.admin.security.dao.LoginDetail;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LoginDetailTest {

    @Test
    public void testGetEmail() {
        // Create an instance of LoginDetail with an email
        String expectedEmail = "test@example.com";
        LoginDetail loginDetail = new LoginDetail();
        loginDetail.setEmail(expectedEmail);

        // Verify that the getEmail method returns the expected email
        String actualEmail = loginDetail.getEmail();
        assertEquals(expectedEmail, actualEmail);
    }

    @Test
    public void testGetPassword() {
        // Create an instance of LoginDetail with a password
        String expectedPassword = "testpassword";
        LoginDetail loginDetail = new LoginDetail();
        loginDetail.setPassword(expectedPassword);

        // Verify that the getPassword method returns the expected password
        String actualPassword = loginDetail.getPassword();
        assertEquals(expectedPassword, actualPassword);
    }

    @Test
    public void testSetEmail() {
        // Create an instance of LoginDetail
        LoginDetail loginDetail = new LoginDetail();

        // Set an email using the setEmail method
        String expectedEmail = "test@example.com";
        loginDetail.setEmail(expectedEmail);

        // Verify that the getEmail method returns the expected email
        String actualEmail = loginDetail.getEmail();
        assertEquals(expectedEmail, actualEmail);
    }

    @Test
    public void testSetPassword() {
        // Create an instance of LoginDetail
        LoginDetail loginDetail = new LoginDetail();

        // Set a password using the setPassword method
        String expectedPassword = "testpassword";
        loginDetail.setPassword(expectedPassword);

        // Verify that the getPassword method returns the expected password
        String actualPassword = loginDetail.getPassword();
        assertEquals(expectedPassword, actualPassword);
    }
}
