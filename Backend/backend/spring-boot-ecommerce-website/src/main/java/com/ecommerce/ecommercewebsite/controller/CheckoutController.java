package com.ecommerce.ecommercewebsite.controller;

import com.ecommerce.ecommercewebsite.dto.Purchase;
import com.ecommerce.ecommercewebsite.dto.PurchaseResponse;
import com.ecommerce.ecommercewebsite.exception.NotEnoughUnitsInStockException;
import com.ecommerce.ecommercewebsite.exception.ResourceNotFoundException;
import com.ecommerce.ecommercewebsite.security.payload.response.MessageResponse;
import com.ecommerce.ecommercewebsite.service.CheckoutService;
import com.ecommerce.ecommercewebsite.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/test")
public class CheckoutController {

    private final CheckoutService checkoutService;
    private final OrderService orderService;

    public CheckoutController(CheckoutService checkoutService, OrderService orderService) {
        this.checkoutService = checkoutService;
        this.orderService = orderService;
    }

    @PostMapping("/purchase")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> placeOrder(@Valid @RequestBody Purchase purchase, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Something is wrong!"));
        }

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try {
            PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase, userDetails);
            return ResponseEntity.ok(purchaseResponse);
        } catch (NotEnoughUnitsInStockException notEnoughUnitsInStockException) {
            return ResponseEntity.badRequest().body(new MessageResponse(notEnoughUnitsInStockException.getMessage()));
        } catch (ResourceNotFoundException resourceNotFoundException) {
            return ResponseEntity.badRequest().body(resourceNotFoundException.getMessage());
        }
    }
}
