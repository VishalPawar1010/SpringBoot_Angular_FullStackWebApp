package com.luv2code.ecommerce.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.luv2code.ecommerce.entity.User;
import com.luv2code.ecommerce.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class UserController {

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {

		List<User> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Integer id) {
		User user = userService.getUserById(id);
		if (user != null) {
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
	@GetMapping("/users/email/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
		User user = userService.findByEmail(email);
		if (user != null) {
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
    @ResponseStatus(value= HttpStatus.OK)
    @PostMapping("/users/updateImage/{email}")
    public ResponseEntity<byte[]> updateImage(@RequestParam("profilePic") MultipartFile file, @PathVariable String email) throws IOException{
    	userService.updateImage(file, email);
        byte[] image = userService.viewImage(email);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }

    @GetMapping("/users/viewImage/{email}")
    public ResponseEntity<byte[]> viewImage(@PathVariable String email) {
        byte[] image = userService.viewImage(email);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }

    @PostMapping("/users")
    public ResponseEntity<User> addUser(@Valid @RequestBody User newUser) {
        User createdUser = userService.addUser(newUser);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }


	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUserById(@PathVariable Integer id, @RequestBody User updatedUser) {
		User savedUser = userService.updateUserById(id, updatedUser);
		if (savedUser != null) {
			return ResponseEntity.ok(savedUser);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<Void> deleteUserById(@PathVariable Integer id) {
		userService.deleteUserById(id);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/users/deleteImage/{email}")
	public ResponseEntity<Void> deleteImage(@PathVariable String email) {
	    userService.deleteImageByEmail(email);
	    return ResponseEntity.noContent().build();
	}


    @GetMapping("/users/check-email")
    public boolean checkEmail(@RequestParam("email") String email) {
    	System.out.println("email = " + email );
        return userService.existsByEmail(email);
    }
}
