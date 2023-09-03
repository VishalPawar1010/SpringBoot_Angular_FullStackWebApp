package com.growth10Mindset.admin.controller;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.growth10Mindset.admin.controller.UserController;
import com.growth10Mindset.admin.entity.User;
import com.growth10Mindset.admin.service.UserService;

public class UserControllerTests {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllUsers() {
        // Mock data
        List<User> users = new ArrayList<>();
        users.add(new User(1, "user1@example.com", "password1", "John", "Doe", "male", false, null));
        users.add(new User(2, "user2@example.com", "password2", "Jane", "Smith", "male", false, null));

        // Mock UserService behavior
        when(userService.getAllUsers()).thenReturn(users);

        // Call the controller method
        ResponseEntity<List<User>> response = userController.getAllUsers();

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(users, response.getBody());
        verify(userService, times(1)).getAllUsers();
    }

    @Test
    public void testGetUserById_ExistingId() {
        // Mock data
        User user = new User(1, "user1@example.com", "password1", "John", "Doe", "male", false, null);

        // Mock UserService behavior
        when(userService.getUserById(1)).thenReturn(user);

        // Call the controller method
        ResponseEntity<User> response = userController.getUserById(1);

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
        verify(userService, times(1)).getUserById(1);
    }

    @Test
    public void testGetUserById_NonExistingId() {
        // Mock UserService behavior
        when(userService.getUserById(1)).thenReturn(null);

        // Call the controller method
        ResponseEntity<User> response = userController.getUserById(1);

        // Verify the response
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
        verify(userService, times(1)).getUserById(1);
    }

    // Add more tests for the remaining controller methods...

    @Test
    public void testUpdateImage() throws IOException {
        // Mock data
        MultipartFile file = new MockMultipartFile("profilePic", "image.png", "image/png", new byte[0]);

        // Call the controller method
        ResponseEntity<byte[]> response = userController.updateImage(file, "user1@example.com");

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        // Add additional assertions as needed
    }

    @Test
    public void testViewImage() {
        // Mock data
        byte[] imageBytes = new byte[]{1, 2, 3};

        // Mock UserService behavior
        when(userService.viewImage("user1@example.com")).thenReturn(imageBytes);

        // Call the controller method
        ResponseEntity<byte[]> response = userController.viewImage("user1@example.com");

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("image/png", response.getHeaders().getContentType().toString());
        assertArrayEquals(imageBytes, response.getBody());
        verify(userService, times(1)).viewImage("user1@example.com");
    }

    @Test
    public void testAddUser() {
        // Mock data
        User newUser = new User(1, "user1@example.com", "password1", "John", "Doe", null, false, null);
        User createdUser = new User(1, "user1@example.com", "password1", "John", "Doe", null, false, null);

        // Mock UserService behavior
        when(userService.addUser(newUser)).thenReturn(createdUser);

        // Call the controller method
        ResponseEntity<User> response = userController.addUser(newUser);

        // Verify the response
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(createdUser, response.getBody());
        verify(userService, times(1)).addUser(newUser);
    }

    @Test
    public void testUpdateUserById_ExistingId() {
        // Mock data
        User updatedUser = new User(1, "user1@example.com", "password1", "John", "Doe", null, false, null);
        User savedUser = new User(1, "user1@example.com", "password1", "John", "Doe", null, false, null);

        // Mock UserService behavior
        when(userService.updateUserById(1, updatedUser)).thenReturn(savedUser);

        // Call the controller method
        ResponseEntity<User> response = userController.updateUserById(1, updatedUser);

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(savedUser, response.getBody());
        verify(userService, times(1)).updateUserById(1, updatedUser);
    }

    @Test
    public void testUpdateUserById_NonExistingId() {
        // Mock data
        User updatedUser = new User(1, "user1@example.com", "password1", "John", "Doe", null, false, null);

        // Mock UserService behavior
        when(userService.updateUserById(1, updatedUser)).thenReturn(null);

        // Call the controller method
        ResponseEntity<User> response = userController.updateUserById(1, updatedUser);

        // Verify the response
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
        verify(userService, times(1)).updateUserById(1, updatedUser);
    }

    @Test
    public void testDeleteUserById_ExistingId() {
        // Call the controller method
        ResponseEntity<Void> response = userController.deleteUserById(1);

        // Verify the response
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(userService, times(1)).deleteUserById(1);
    }

    @Test
    public void testDeleteUserById_NonExistingId() {
        // Call the controller method
        ResponseEntity<Void> response = userController.deleteUserById(1);

        // Verify the response
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(userService, times(1)).deleteUserById(1);
    }

    @Test
    public void testDeleteImage() {
        // Call the controller method
        ResponseEntity<Void> response = userController.deleteImage("user1@example.com");

        // Verify the response
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(userService, times(1)).deleteImageByEmail("user1@example.com");
    }

    @Test
    public void testCheckEmail_ExistingEmail() {
        // Mock UserService behavior
        when(userService.existsByEmail("user1@example.com")).thenReturn(true);

        // Call the controller method
        boolean exists = userController.checkEmail("user1@example.com");

        // Verify the response
        assertTrue(exists);
        verify(userService, times(1)).existsByEmail("user1@example.com");
    }

    @Test
    public void testCheckEmail_NonExistingEmail() {
        // Mock UserService behavior
        when(userService.existsByEmail("user1@example.com")).thenReturn(false);

        // Call the controller method
        boolean exists = userController.checkEmail("user1@example.com");

        // Verify the response
        assertFalse(exists);
        verify(userService, times(1)).existsByEmail("user1@example.com");
    }
    
    @Test
    public void testGetUserByEmail_ExistingUser() {
        // Mock data
        String email = "user1@example.com";
        User user = new User(1, email, "password1", "John", "Doe", "male", false, null);

        // Mock UserService behavior
        when(userService.findByEmail(email)).thenReturn(user);

        // Call the controller method
        ResponseEntity<User> response = userController.getUserByEmail(email);

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
        verify(userService, times(1)).findByEmail(email);
    }

    @Test
    public void testGetUserByEmail_NonExistingUser() {
        // Mock data
        String email = "user1@example.com";

        // Mock UserService behavior
        when(userService.findByEmail(email)).thenReturn(null);

        // Call the controller method
        ResponseEntity<User> response = userController.getUserByEmail(email);

        // Verify the response
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
        verify(userService, times(1)).findByEmail(email);
    }

    
}

