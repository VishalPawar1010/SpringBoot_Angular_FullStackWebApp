package com.growth10Mindset.admin.controller;

import com.growth10Mindset.admin.entity.User;
import com.growth10Mindset.admin.security.dao.AuthenticationResponse;
import com.growth10Mindset.admin.security.dao.LoginDetail;
import com.growth10Mindset.admin.service.UserService;
import com.growth10Mindset.admin.util.UserCsvExporter;
import com.growth10Mindset.admin.util.UserExcelExporter;
import com.growth10Mindset.admin.util.UserPdfExporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:4200")
public class UserController {

    private final UserService userService;
    
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers() {

        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        User user = userService.findByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping("/updateImage/{email}")
    public ResponseEntity<byte[]> updateImage(@RequestParam("profilePic") MultipartFile file,
                                              @PathVariable String email) throws IOException {
        userService.updateImage(file, email);
        byte[] image = userService.viewImage(email);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }

    @GetMapping("/viewImage/{email}")
    public ResponseEntity<byte[]> viewImage(@PathVariable String email) {
        byte[] image = userService.viewImage(email);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }

    @PostMapping("")
    public ResponseEntity<User> addUser(@Valid @RequestBody User newUser) {
        User createdUser = userService.addUser(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Integer id, @RequestBody User updatedUser) {
        User savedUser = userService.updateUserById(id, updatedUser);
        if (savedUser != null) {
            return ResponseEntity.ok(savedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Integer id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deleteImage/{email}")
    public ResponseEntity<Void> deleteImage(@PathVariable String email) {
        userService.deleteImageByEmail(email);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check-email")
    public boolean checkEmail(@RequestParam("email") String email) {
        System.out.println("email = " + email);
        return userService.existsByEmail(email);
    }

    @GetMapping("/csv")
    public void exportUsersToCSV(HttpServletResponse response) throws IOException {
        List<User> listUsers = userService.getAllUsers();
        UserCsvExporter exporter = new UserCsvExporter();
        exporter.export(listUsers, response);

    }

    @GetMapping("/excel")
    public void exportUsersToExcel(HttpServletResponse response) throws IOException {
        List<User> listUsers = userService.getAllUsers();
        UserExcelExporter exporter = new UserExcelExporter();
        exporter.export(listUsers, response);
    }

    @GetMapping("/pdf")
    public void exportUsersToPdf(HttpServletResponse response) throws IOException {
        List<User> listUsers = userService.getAllUsers();
        UserPdfExporter exporter = new UserPdfExporter();
        exporter.export(listUsers, response);
    }

    @PostMapping("/forgotpassword")
    public ResponseEntity<AuthenticationResponse> forgotPassword(HttpServletRequest request, @RequestBody LoginDetail loginDetail) {
        String email = loginDetail.getEmail();
        int randomPin = (int) (Math.random() * 900000) + 100000;
        String token = String.valueOf(randomPin);
        try {
            userService.updateResetPassword(token, email);

            String resetPasswordLink = "Your OTP for reset password is " + token;
            userService.sendEmail(email, "Forgot password Redirect Link", resetPasswordLink);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/updatepassword/{id}")
    public ResponseEntity<AuthenticationResponse> updatePassword(@PathVariable String id, @RequestBody LoginDetail loginDetail) {
        String email = loginDetail.getEmail();
        String newPassword = loginDetail.getPassword();
        String token = id;
        try {
            User user = userService.get(token);
            if (user == null) {
                throw new UsernameNotFoundException("404 not found");
            }
            if (!user.getEmail().equals(email)) {
                throw new UsernameNotFoundException("Invalid token for given email");
            }
            userService.updatePassword(user, newPassword);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify_otp/{id}")
    public ResponseEntity<AuthenticationResponse> verifyOTP(@PathVariable String id, @RequestBody LoginDetail loginDetail) {
        String email = loginDetail.getEmail();
        String token = id;
        User user = userService.findByEmail(email);
        if (user == null || !user.getResetPasswordToken().equals(token)) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

}
