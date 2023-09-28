package com.growth10Mindset.admin.service;


import com.growth10Mindset.admin.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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

    void updateResetPassword(String token, String email);
     User get(String resetPasswordToken);
    void updatePassword(User user , String newPassword);

    void sendEmail(String to, String subject, String text) ;



}
