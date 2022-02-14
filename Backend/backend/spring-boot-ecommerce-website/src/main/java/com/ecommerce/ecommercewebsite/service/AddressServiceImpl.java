package com.ecommerce.ecommercewebsite.service;

import com.ecommerce.ecommercewebsite.dao.AddressRepository;
import com.ecommerce.ecommercewebsite.dao.UserRepository;
import com.ecommerce.ecommercewebsite.entity.Address;
import com.ecommerce.ecommercewebsite.exception.BadRequestException;
import com.ecommerce.ecommercewebsite.exception.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService{

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressServiceImpl(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Address> getAllAddressesByUserId(Long user_id) {
        return addressRepository.getAllAddressesByUserId(user_id);
    }

    @Override
    public void insertAddress(String city, String postal_code, String street, String country,
                              int street_number, UserDetails userDetails) {
        Long user_id = userRepository.getUserIdByEmail(userDetails.getUsername());

        if (addressRepository.getAllAddressesByUserId(user_id).size() >= 5) {
            throw new BadRequestException("You already have more than 5 addresses specified!");
        }

        addressRepository.insertAddress(user_id, city, postal_code, street, country, street_number);
    }

    @Override
    public void deleteAddress(int addressId) {
        if (addressRepository.getAddressById(addressId) == null) {
            throw new ResourceNotFoundException("Address with an id: " + addressId + " not found");
        }
        addressRepository.deleteAddress(addressId);
    }

    @Override
    public void updateAddress(Address address) {
        if (addressRepository.getAddressById(Math.toIntExact(address.getId())) == null) {
            throw new ResourceNotFoundException("Address with an id: " + address.getId() + " not found");
        }
        addressRepository.updateAddress(address.getCity(), address.getPostal_code(), address.getStreet(),
                address.getCountry(), address.getStreet_number(), Math.toIntExact(address.getId()));
    }
}
