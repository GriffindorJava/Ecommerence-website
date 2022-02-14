package com.ecommerce.ecommercewebsite.controller;

import com.ecommerce.ecommercewebsite.dao.UserRepository;
import com.ecommerce.ecommercewebsite.entity.Address;
import com.ecommerce.ecommercewebsite.exception.BadRequestException;
import com.ecommerce.ecommercewebsite.exception.ResourceNotFoundException;
import com.ecommerce.ecommercewebsite.service.AddressService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/test")
public class AddressController {

    private final AddressService addressService;
    private final UserRepository userRepository;

    public AddressController(AddressService addressService, UserRepository userRepository) {
        this.addressService = addressService;
        this.userRepository = userRepository;
    }

    @GetMapping("addresses")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Address> getAllAddressesByUserEmail() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long id = userRepository.getUserIdByEmail(userDetails.getUsername());

        return addressService.getAllAddressesByUserId(id);
    }

    @PostMapping("add-address")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> insertAddress(@Valid @RequestBody Address address) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try {
            addressService.insertAddress(address.getCity(), address.getPostal_code(), address.getStreet(),
                    address.getCountry(), address.getStreet_number(), userDetails);
        } catch (BadRequestException badRequestException) {
            return ResponseEntity.badRequest().body(badRequestException.getMessage());
        }
        return ResponseEntity.ok("Address added successfully");
    }

    @DeleteMapping("delete-address/{addressId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteAddress(@PathVariable int addressId) {
        try {
            addressService.deleteAddress(addressId);
        } catch (ResourceNotFoundException resourceNotFoundException) {
            return ResponseEntity.badRequest().body(resourceNotFoundException.getMessage());
        }
        return ResponseEntity.ok("Address deleted successfully");
    }

    @PutMapping("update-address")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> updateAddress(@Valid @RequestBody Address address) {
        try {
            addressService.updateAddress(address);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
        return ResponseEntity.ok("Address updated successfully");
    }
}
