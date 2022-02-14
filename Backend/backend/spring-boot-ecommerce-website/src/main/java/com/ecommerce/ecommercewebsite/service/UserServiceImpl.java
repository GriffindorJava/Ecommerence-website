package com.ecommerce.ecommercewebsite.service;

import com.ecommerce.ecommercewebsite.dao.AddressRepository;
import com.ecommerce.ecommercewebsite.dao.UserRepository;
import com.ecommerce.ecommercewebsite.dto.BasicUserInfo;
import com.ecommerce.ecommercewebsite.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    public UserServiceImpl(UserRepository userRepository, AddressRepository addressRepository) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
    }

    @Override
    public BasicUserInfo getBasicUserInfo(String email) {
        BasicUserInfo basicUserInfo = new BasicUserInfo();

        User user = userRepository.findByEmail(email);

        basicUserInfo.setFirst_name(user.getFirst_name());
        basicUserInfo.setLast_name(user.getLast_name());
        basicUserInfo.setEmail(email);
        basicUserInfo.setPhone_number(user.getPhone_number());
        basicUserInfo.setAddresses(addressRepository.getAllAddressesByUserEmail(email));

        return basicUserInfo;
    }

    @Override
    public void changeUserPassword(String newPassword, String email) {
        userRepository.changeUserPassword(newPassword, email);
    }
}
