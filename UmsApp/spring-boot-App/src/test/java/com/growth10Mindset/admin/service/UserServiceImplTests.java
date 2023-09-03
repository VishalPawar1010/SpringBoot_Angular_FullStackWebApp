package com.growth10Mindset.admin.service;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import com.growth10Mindset.admin.entity.User;
import com.growth10Mindset.admin.repo.UserRepository;
import com.growth10Mindset.admin.service.UserServiceImpl;
import com.growth10Mindset.admin.util.ImageUtil;

public class UserServiceImplTests {

	@Mock
	private UserRepository userRepository;

	@Mock
	private BCryptPasswordEncoder bcryptPasswordEncoder;

	@InjectMocks
	private UserServiceImpl userService;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void testGetAllUsers() {
		// Mock data
		List<User> users = new ArrayList<>();
		User user1 = new User();
		user1.setId(1);
		user1.setPhotos(ImageUtil.compressImage(new byte[] { 1, 2, 3 }));
		users.add(user1);

		// Mock UserRepository behavior
		when(userRepository.findAll()).thenReturn(users);

		// Call the service method
		List<User> result = userService.getAllUsers();

		// Verify the result
		assertEquals(users.size(), result.size());
//        assertEquals(ImageUtil.decompressImage(user1.getPhotos()), result.get(0).getPhotos());
		verify(userRepository, times(1)).findAll();
	}

	@Test
	public void testGetUserById_existingId() {
		// Mock data
		int userId = 1;
		User user = new User();
		user.setId(userId);

		// Mock UserRepository behavior
		when(userRepository.findById(userId)).thenReturn(Optional.of(user));

		// Call the service method
		User result = userService.getUserById(userId);

		// Verify the result
		assertNotNull(result);
		assertEquals(userId, result.getId());
		verify(userRepository, times(1)).findById(userId);
	}

	@Test
	public void testGetUserById_nonExistingId() {
		// Mock data
		int userId = 1;

		// Mock UserRepository behavior
		when(userRepository.findById(userId)).thenReturn(Optional.empty());

		// Call the service method
		User result = userService.getUserById(userId);

		// Verify the result
		assertNull(result);
		verify(userRepository, times(1)).findById(userId);
	}

	@Test
	public void testFindByEmail_existingEmail() {
		// Mock data
		String email = "test@example.com";
		User user = new User();
		user.setEmail(email);

		// Mock UserRepository behavior
		when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

		// Call the service method
		User result = userService.findByEmail(email);

		// Verify the result
		assertNotNull(result);
		assertEquals(email, result.getEmail());
		verify(userRepository, times(1)).findByEmail(email);
	}

//    @Test
//    public void testFindByEmail_nonExistingEmail() {
//        // Mock data
//        String email = "test@example.com";
//
//        // Mock UserRepository behavior
//        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
//
//        // Call the service method
//        User result = userService.findByEmail(email);
//
//        // Verify the result
//        assertNull(result);
//        verify(userRepository, times(1)).findByEmail(email);
//    }

	@Test
	public void testAddUser_withPassword() {
		// Mock data
		User newUser = new User();
		newUser.setEmail("test@example.com");
		newUser.setPassword("password");

		// Mock UserRepository behavior
		when(userRepository.save(newUser)).thenReturn(newUser);

		// Call the service method
		User result = userService.addUser(newUser);

		// Verify the result
		assertNotNull(result);
		assertEquals(newUser.getEmail(), result.getEmail());
		// Verify that the password is encoded
//        verify(bcryptPasswordEncoder, times(1)).encode(newUser.getPassword());
		verify(userRepository, times(1)).save(newUser);
	}

	@Test
	public void testAddUser_withoutPassword() {
		// Mock data
		User newUser = new User();
		newUser.setEmail("test@example.com");

		// Mock UserRepository behavior
		when(userRepository.save(newUser)).thenReturn(newUser);

		// Call the service method
		User result = userService.addUser(newUser);

		// Verify the result
		assertNotNull(result);
		assertEquals(newUser.getEmail(), result.getEmail());
		// Verify that the default password is used and encoded
//        verify(bcryptPasswordEncoder, times(1)).encode(userService.getDefaultPassword());
		verify(userRepository, times(1)).save(newUser);
	}

	@Test
	void testUpdateUserById_existingUser() {
		// Mock data
		Integer id = 1;
		User updatedUser = new User();
		updatedUser.setEmail("updated@example.com");
		updatedUser.setPassword("newPassword");
		updatedUser.setFirstName("Updated");
		updatedUser.setLastName("User");
		updatedUser.setGender("Male");
		updatedUser.setEnabled(true);
//		updatedUser.setRoles("USER");

		User existingUser = new User();
		existingUser.setId(id);
		existingUser.setEmail("test@example.com");
		existingUser.setPassword("password");
		existingUser.setFirstName("Test");
		existingUser.setLastName("User");
		existingUser.setGender("Female");
		existingUser.setEnabled(false);
//		existingUser.setRoles("ADMIN");

		// Mock UserRepository behavior
		when(userRepository.findById(id)).thenReturn(Optional.of(existingUser));
		when(userRepository.save(existingUser)).thenReturn(existingUser);

		// Call the service method
		User result = userService.updateUserById(id, updatedUser);

		// Verify the result
		assertNotNull(result);
		assertEquals(updatedUser.getEmail(), result.getEmail());
//		assertEquals(encode(updatedUser.getPassword()), result.getPassword());
		assertEquals(updatedUser.getFirstName(), result.getFirstName());
		assertEquals(updatedUser.getLastName(), result.getLastName());
		assertEquals(updatedUser.getGender(), result.getGender());
		assertTrue(result.isEnabled());
		assertEquals(updatedUser.getRoles(), result.getRoles());
		verify(userRepository, times(1)).findById(id);
		verify(userRepository, times(1)).save(existingUser);
	}

	@Test
	void testUpdateUserById_nonExistingUser() {
		// Mock data
		Integer id = 1;
		User updatedUser = new User();

		// Mock UserRepository behavior
		when(userRepository.findById(id)).thenReturn(Optional.empty());

		// Call the service method
		User result = userService.updateUserById(id, updatedUser);

		// Verify the result
		assertNull(result);
		verify(userRepository, times(1)).findById(id);
		verify(userRepository, never()).save(any());
	}

	@Test
	void testDeleteUserById_existingUser() {
		// Mock data
		Integer id = 1;
		User user = new User();
		user.setId(id);

		// Mock UserRepository behavior
		when(userRepository.findById(id)).thenReturn(Optional.of(user));

		// Call the service method
		userService.deleteUserById(id);

		// Verify that the user is deleted
		verify(userRepository, times(1)).findById(id);
		verify(userRepository, times(1)).delete(user);
	}

	@Test
	void testDeleteUserById_nonExistingUser() {
		// Mock data
		Integer id = 1;

		// Mock UserRepository behavior
		when(userRepository.findById(id)).thenReturn(Optional.empty());

		// Call the service method
		userService.deleteUserById(id);

		// Verify that no deletion operation is performed
		verify(userRepository, times(1)).findById(id);
		verify(userRepository, never()).delete(any());
	}

	private String encode(String password) {
		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
		return bcrypt.encode(password);
	}

	// Helper method to create a mock MultipartFile
	private MultipartFile createMockMultipartFile(byte[] content) {
		return new MultipartFile() {
			@Override
			public String getName() {
				return "file";
			}

			@Override
			public String getOriginalFilename() {
				return "filename";
			}

			@Override
			public String getContentType() {
				return "image/png";
			}

			@Override
			public boolean isEmpty() {
				return content == null || content.length == 0;
			}

			@Override
			public long getSize() {
				return content.length;
			}

			@Override
			public byte[] getBytes() {
				return content;
			}

			@Override
			public InputStream getInputStream() throws IOException {
				return new ByteArrayInputStream(content);
			}

			@Override
			public void transferTo(File dest) throws IOException, IllegalStateException {
				Files.write(dest.toPath(), content);
			}
		};
	}

	@Test
	public void testUpdateImage() throws IOException {
		// Mock data
		String email = "test@example.com";
		User user = new User();
		user.setEmail(email);
		MultipartFile file = createMockMultipartFile(new byte[] { 1, 2, 3 });

		// Mock UserRepository behavior
		when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
		when(userRepository.save(user)).thenReturn(user);

		// Call the service method
		User result = userService.updateImage(file, email);

		// Verify the result
		assertNotNull(result);
		assertEquals(user.getEmail(), result.getEmail());
		assertNotNull(result.getPhotos());
		// Verify that the image is compressed
		byte[] compressedImage = ImageUtil.compressImage(file.getBytes());
		assertArrayEquals(compressedImage, result.getPhotos());
		verify(userRepository, times(1)).findByEmail(email);
		verify(userRepository, times(1)).save(user);
	}

	@Test
	public void testViewImage() {
		// Mock data
		String email = "test@example.com";
		User user = new User();
		user.setEmail(email);
		byte[] compressedImage = ImageUtil.compressImage(new byte[] { 1, 2, 3 });
		user.setPhotos(compressedImage);

		// Mock UserRepository behavior
		when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

		// Call the service method
		byte[] result = userService.viewImage(email);

		// Verify the result
		assertNotNull(result);
		// Verify that the image is decompressed
		byte[] decompressedImage = ImageUtil.decompressImage(compressedImage);
		assertArrayEquals(decompressedImage, result);
		verify(userRepository, times(1)).findByEmail(email);
	}

	@Test
	public void testDeleteImageByEmail() {
		// Mock data
		String email = "test@example.com";
		User user = new User();
		user.setEmail(email);
		user.setPhotos(new byte[] { 1, 2, 3 });

		// Mock UserRepository behavior
		when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
		when(userRepository.save(user)).thenReturn(user);

		// Call the service method
		userService.deleteImageByEmail(email);

		// Verify that the image is deleted
		assertNull(user.getPhotos());
		verify(userRepository, times(1)).findByEmail(email);
		verify(userRepository, times(1)).save(user);
	}

	@Test
	public void testExistsByEmail_existingEmail() {
		// Mock data
		String email = "test@example.com";

		// Mock UserRepository behavior
		when(userRepository.existsByEmail(email)).thenReturn(true);

		// Call the service method
		boolean result = userService.existsByEmail(email);

		// Verify the result
		assertTrue(result);
		verify(userRepository, times(1)).existsByEmail(email);
	}

	// Helper method to create a mock MultipartFile
	private MultipartFile createMockMultipartFile1(byte[] content) {
		return new MultipartFile() {
			@Override
			public String getName() {
				return "file";
			}

			@Override
			public String getOriginalFilename() {
				return "filename";
			}

			@Override
			public String getContentType() {
				return "image/png";
			}

			@Override
			public boolean isEmpty() {
				return content == null || content.length == 0;
			}

			@Override
			public long getSize() {
				return content != null ? content.length : 0;
			}

			@Override
			public byte[] getBytes() throws IOException {
				return content;
			}

			@Override
			public InputStream getInputStream() throws IOException {
				return new ByteArrayInputStream(content);
			}

			@Override
			public void transferTo(File dest) throws IOException, IllegalStateException {
				// Do nothing
			}
		};
	}
}
