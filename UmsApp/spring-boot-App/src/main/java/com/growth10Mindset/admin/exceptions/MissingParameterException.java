package com.growth10Mindset.admin.exceptions;

public class MissingParameterException extends Exception {
    public MissingParameterException() {
        super();
    }

    public MissingParameterException(String message) {
        super(message);
    }
}