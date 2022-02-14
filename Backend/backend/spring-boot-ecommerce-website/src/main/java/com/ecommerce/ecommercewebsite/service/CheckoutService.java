package com.ecommerce.ecommercewebsite.service;

import com.ecommerce.ecommercewebsite.dto.Purchase;
import com.ecommerce.ecommercewebsite.dto.PurchaseResponse;
import org.springframework.security.core.userdetails.UserDetails;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase, UserDetails userDetails);
}
