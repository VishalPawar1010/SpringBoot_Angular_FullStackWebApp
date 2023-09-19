package com.growth10Mindset.admin.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.growth10Mindset.admin.entity.User;
import com.growth10Mindset.admin.repo.UserRepository;
import com.growth10Mindset.admin.util.ImageUtil;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
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

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).get();
    }

    private String encode(String password) {
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        return bcrypt.encode(password);
    }

    @Override
    public User addUser(User newUser) {
        if (newUser.getPassword() != null) {
            newUser.setPassword(encode(newUser.getPassword()));
        } else {
            String defaultPassword = "Admin@123";
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
        if (user.isPresent()) {
            user.get().setPhotos(ImageUtil.compressImage(file.getBytes()));
            return userRepository.save(user.get());
        }
        return null;
    }

    @Override
    public byte[] viewImage(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(value -> ImageUtil.decompressImage(value.getPhotos())).orElseGet(() -> new byte[0]);
    }

    @Override
    public void deleteImageByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPhotos(null);
            userRepository.save(user);
        }
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
