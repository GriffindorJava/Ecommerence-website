package com.ecommerce.ecommercewebsite.dto;

import com.ecommerce.ecommercewebsite.entity.Address;
import lombok.Data;

import java.util.List;

@Data
public class BasicUserInfo {
    private String first_name;
    private String last_name;
    private String email;
    private String phone_number;
    private List<Address> addresses;
}
