package com.luv2code.ecommerce.exceptions;
import org.junit.jupiter.api.Test;

import com.luv2code.ecommerce.exceptions.MissingParameterException;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class MissingParameterExceptionTest {

    @Test
    public void testDefaultConstructor() {
        // Create an instance of MissingParameterException using the default constructor
        MissingParameterException exception = new MissingParameterException();

        // Verify that the exception message is null
        String expectedMessage = null;
        String actualMessage = exception.getMessage();
        assertEquals(expectedMessage, actualMessage);
    }

    @Test
    public void testParameterizedConstructor() {
        // Create an instance of MissingParameterException with a custom message
        String expectedMessage = "Parameter is missing";
        MissingParameterException exception = new MissingParameterException(expectedMessage);

        // Verify that the exception message matches the custom message
        String actualMessage = exception.getMessage();
        assertEquals(expectedMessage, actualMessage);
    }
}