package com.ecommerce.ecommercewebsite.controller;

import com.ecommerce.ecommercewebsite.entity.Opinion;
import com.ecommerce.ecommercewebsite.exception.BadRequestException;
import com.ecommerce.ecommercewebsite.security.payload.response.MessageResponse;
import com.ecommerce.ecommercewebsite.service.OpinionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/test")
public class OpinionController {

    private final OpinionService opinionService;

    public OpinionController(OpinionService opinionService) {
        this.opinionService = opinionService;
    }

    @GetMapping("/opinions")
    public List<Opinion> getAllOpinions() {
        return opinionService.getAllOpinions();
    }

    @PostMapping("/add-opinion")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> insertOpinion(@Valid @RequestBody Opinion opinion, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getFieldError().getDefaultMessage());
        }

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());

        try {
            opinionService.insertOpinion(opinion.getDescription(), opinion.getProduct_id(), opinion.getRating(), date, userDetails);
        } catch (BadRequestException badRequestException) {
            return ResponseEntity.badRequest().body(badRequestException.getMessage());
        }

        return ResponseEntity.ok("Opinion added successfully");
    }
}
