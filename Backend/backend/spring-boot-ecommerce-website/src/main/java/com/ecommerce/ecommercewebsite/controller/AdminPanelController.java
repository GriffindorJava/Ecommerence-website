package com.ecommerce.ecommercewebsite.controller;

import com.ecommerce.ecommercewebsite.dto.ChangeOrderStatusRequest;
import com.ecommerce.ecommercewebsite.dto.Statistics;
import com.ecommerce.ecommercewebsite.entity.Product;
import com.ecommerce.ecommercewebsite.exception.ResourceNotFoundException;
import com.ecommerce.ecommercewebsite.service.AdminPanelService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin")
public class AdminPanelController {

    private final AdminPanelService adminPanelService;

    public AdminPanelController(AdminPanelService adminPanelService) {
        this.adminPanelService = adminPanelService;
    }

    @PutMapping("/changeOrderStatus")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> changeOrderStatus(@Valid @RequestBody ChangeOrderStatusRequest changeOrderStatusRequest) {

        try {
            adminPanelService.changeOrderStatus(changeOrderStatusRequest.getStatus(), changeOrderStatusRequest.getOrderTrackingNumber());
        } catch (ResourceNotFoundException resourceNotFoundException) {
            return ResponseEntity.badRequest().body(resourceNotFoundException.getMessage());
        }

        return ResponseEntity.ok("Status has been changed successfully");
    }

    @DeleteMapping("/deleteProduct/{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable @Size(min = 1) @NotNull @NotEmpty Long productId) {

        try {
            adminPanelService.deleteProduct(productId);
        } catch (ResourceNotFoundException resourceNotFoundException) {
            return ResponseEntity.badRequest().body(resourceNotFoundException.getMessage());
        }

        return ResponseEntity.ok("Product has been removed successfully");
    }

    @PostMapping("/addProduct")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addProduct(@Valid @RequestBody Product product) {

        try {
            adminPanelService.addProduct(product);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }

        return ResponseEntity.ok("Product has been added successfully");
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Statistics> getStatistics() {
        Statistics statistics = adminPanelService.getStatistics();

        return ResponseEntity.ok(statistics);
    }
}
