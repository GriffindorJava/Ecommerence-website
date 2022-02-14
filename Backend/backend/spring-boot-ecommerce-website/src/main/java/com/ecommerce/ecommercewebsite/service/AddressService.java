package com.ecommerce.ecommercewebsite.service;

import com.ecommerce.ecommercewebsite.entity.Address;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface AddressService {
    List<Address> getAllAddressesByUserId(Long user_id);
    void insertAddress(String city, String postal_code, String street, String country,
                       int street_number, UserDetails userDetails);
    void deleteAddress(int addressId);
    void updateAddress(Address address);
}
