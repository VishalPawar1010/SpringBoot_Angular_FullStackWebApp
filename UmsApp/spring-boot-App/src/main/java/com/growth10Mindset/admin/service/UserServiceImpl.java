package com.growth10Mindset.admin.service;

import com.growth10Mindset.admin.entity.User;
import com.growth10Mindset.admin.repo.UserRepository;
import com.growth10Mindset.admin.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final JavaMailSender javaMailSender;

    private final UserRepository userRepository;
    private final String defaultPassword = "Admin@123";

    @Autowired
    public UserServiceImpl(JavaMailSender javaMailSender, UserRepository userRepository) {
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            byte[] photos = user.getPhotos();
            if (photos != null) {
                byte[] decompressedData = ImageUtil.decompressImage(photos);
                user.setPhotos(decompressedData);
            }
        }
        return users;
    }

    @Override
    public User getUserById(Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).get();
    }


    private String encode(String password) {
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        String encodedPassword = bcrypt.encode(password);
        return encodedPassword;
    }


    @Override
    public User addUser(User newUser) {


        if (newUser.getPassword() != null) {
            newUser.setPassword(encode(newUser.getPassword()));
        } else {
            newUser.setPassword(encode(defaultPassword));
        }

        return userRepository.save(newUser);
    }


    @Override
    public User updateUserById(Integer id, User updatedUser) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setEmail(updatedUser.getEmail());
            updatedUser.setPassword(encode(updatedUser.getPassword()));
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setGender(updatedUser.getGender());
//	        user.setPhotos(updatedUser.getPhotos());
            user.setEnabled(updatedUser.isEnabled());
            user.setRoles(updatedUser.getRoles());
            user.setEnabled(updatedUser.isEnabled());
            user.setRoles(updatedUser.getRoles());

            return userRepository.save(user);
        } else {
            return null;
        }
    }



    @Override
    public void deleteUserById(Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userRepository.delete(user);
        }
    }

    @Override
    public User updateImage(MultipartFile file, String email) throws IOException {
        Optional<User> user = userRepository.findByEmail(email);
        user.get().setPhotos(ImageUtil.compressImage(file.getBytes()));
        return userRepository.save(user.get());
    }

    @Override
    public byte[] viewImage(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        return ImageUtil.decompressImage(user.get().getPhotos());
    }

    @Override
    public void deleteImageByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            if (userOptional != null) {
                User user = userOptional.get();
                user.setPhotos(null);
                userRepository.save(user);
            }
        }
    }

    @Override
    public boolean existsByEmail(String email) {

        return userRepository.existsByEmail(email);
    }

    @Override
    public void updateResetPassword(String token, String email) {
        User user = userRepository.findByEmail(email).get();
        if (user != null) {
            user.setResetPasswordToken(token);
            userRepository.save(user);
        } else {
            throw new UsernameNotFoundException("customer not found with email" + email);
        }
    }

    @Override
    public User get(String resetPasswordToken) {
        return userRepository.findByResetPasswordToken(resetPasswordToken).get();
    }

    @Override
    public void updatePassword(User user, String newPassword) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodePassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodePassword);
        user.setResetPasswordToken(null);
        userRepository.save(user);

    }

    @Override
    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setFrom("shinchi312@gmail.com");
        try {
            javaMailSender.send(message);
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
        }
    }
}
