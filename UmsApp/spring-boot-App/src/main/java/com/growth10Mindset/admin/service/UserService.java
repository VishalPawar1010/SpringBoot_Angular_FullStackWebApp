package com.luv2code.ecommerce.service;


import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.luv2code.ecommerce.entity.User;

public interface UserService {
	
    List<User> getAllUsers();
    
    User getUserById(Integer id);
    
    User findByEmail(String email);
    
    User addUser(User newUser);

    User updateUserById(Integer id, User updatedUser);
    
    void deleteUserById(Integer id);
    
    User updateImage(MultipartFile file, String email) throws IOException;

    byte[] viewImage(String email);
    
    void deleteImageByEmail(String email);
    
    boolean existsByEmail(String email);

}
