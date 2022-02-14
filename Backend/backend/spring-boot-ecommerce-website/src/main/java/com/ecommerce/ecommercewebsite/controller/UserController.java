package com.ecommerce.ecommercewebsite.controller;

import com.ecommerce.ecommercewebsite.dto.BasicUserInfo;
import com.ecommerce.ecommercewebsite.security.payload.request.ChangePasswordRequest;
import com.ecommerce.ecommercewebsite.security.payload.response.MessageResponse;
import com.ecommerce.ecommercewebsite.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/test")
public class UserController {

    private final UserService userService;

    @Autowired
    PasswordEncoder encoder;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/myaccount")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<BasicUserInfo> getBasicUserInfo() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return new ResponseEntity<>(userService.getBasicUserInfo(userDetails.getUsername()), HttpStatus.OK);
    }

    @PostMapping("/changePassword")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> changeUserPassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Something is wrong!"));
        }

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String newPassword = changePasswordRequest.getNewPassword().trim();

        if (newPassword.length() < 6) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: New password is too short!"));
        }

        if (!encoder.matches(changePasswordRequest.getOldPassword(), userDetails.getPassword())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Bad credentials!"));
        } else {
            userService.changeUserPassword(encoder.encode(newPassword), userDetails.getUsername());
        }

        return ResponseEntity.ok(new MessageResponse("Password changed successfully!"));
    }
}
