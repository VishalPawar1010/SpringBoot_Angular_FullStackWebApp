package com.growth10Mindset.admin.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.jsonwebtoken.ExpiredJwtException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleMethodArgsNotValidateException(
            MethodArgumentNotValidException ex) {
        Map<String, String> resp = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            resp.put(fieldName, message);
        });
        return new ResponseEntity<Map<String, String>>(resp, HttpStatus.BAD_REQUEST);
    }

    
//    TODO : Add here to handle exception for expired token : 500 - Internal Server error
//    @ExceptionHandler(ExpiredJwtException.class)
//    public ResponseEntity<Map<String, String>> handleExpiredJwtException(ExpiredJwtException ex) {
//        Map<String, String> errorResponse = new HashMap<>();
//        errorResponse.put("error", "JWT token has expired");
//        errorResponse.put("message", ex.getMessage()); // Include the original exception message if needed
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
//    }
    
}
