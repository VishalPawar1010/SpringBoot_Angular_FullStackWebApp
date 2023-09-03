package com.luv2code.ecommerce.entity;
import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;

public class UserTests {

    private User user;

    @BeforeEach
    public void setUp() {
        user = new User();
    }

    @Test
    public void testGettersAndSetters() {
        user.setId(1);
        assertEquals(1, user.getId());
    }

    @Test
    public void testGetAndSetEmail() {
        user.setEmail("test@example.com");
        assertEquals("test@example.com", user.getEmail());
    }

    @Test
    public void testGetAndSetPassword() {
        user.setPassword("password");
        assertEquals("password", user.getPassword());
    }

    @Test
    public void testGetAndSetFirstName() {
        user.setFirstName("John");
        assertEquals("John", user.getFirstName());
    }

    @Test
    public void testGetAndSetLastName() {
        user.setLastName("Doe");
        assertEquals("Doe", user.getLastName());
    }

    @Test
    public void testGetAndSetGender() {
        user.setGender("Male");
        assertEquals("Male", user.getGender());
    }

    @Test
    public void testGetAndSetPhotos() {
        byte[] photos = {0x01, 0x02, 0x03};
        user.setPhotos(photos);
        assertArrayEquals(photos, user.getPhotos());
    }

//    @Test
//    public void testGetAndSetPhotoFile() {
//        MultipartFile photoFile = new MultipartFile();
//        user.setPhotoFile(photoFile);
//        assertEquals(photoFile, user.getPhotoFile());
//    }

    @Test
    public void testIsEnabled() {
        user.setEnabled(true);
        assertTrue(user.isEnabled());
    }

    @Test
    public void testGetAndSetRoles() {
        Role role = new Role();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);
        assertEquals(roles, user.getRoles());
    }

    @Test
    public void testAddRole() {
        Role role = new Role();
        user.addRole(role);
        assertTrue(user.getRoles().contains(role));
    }

    @Test
    public void testConstructor() {
        User user = new User(1, "test@example.com", "password", "John", "Doe", "Male", true, new HashSet<>());
        assertEquals(1, user.getId());
        assertEquals("test@example.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals("John", user.getFirstName());
        assertEquals("Doe", user.getLastName());
        assertEquals("Male", user.getGender());
        assertTrue(user.isEnabled());
        assertNotNull(user.getRoles());
        assertTrue(user.getRoles().isEmpty());
    }

    @Test
    public void testToString() {
        user.setId(1);
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setGender("Male");
        user.setEnabled(true);

        String expectedString = "User [id=1, email=test@example.com, password=password, firstName=John, lastName=Doe, gender=Male, enabled=true, roles=[]]";
        assertEquals(expectedString, user.toString());
    }
}
