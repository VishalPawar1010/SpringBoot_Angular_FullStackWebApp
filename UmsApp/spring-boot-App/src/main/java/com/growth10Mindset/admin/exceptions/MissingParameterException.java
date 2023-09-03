package com.luv2code.ecommerce.exceptions;

public class MissingParameterException extends Exception{
    public MissingParameterException() {
        super();
    }

    public MissingParameterException(String message) {
        super(message);
    }
}