package com.ecommerce.ecommercewebsite.service;

import com.ecommerce.ecommercewebsite.dto.MyOrders;
import com.ecommerce.ecommercewebsite.entity.Order;

import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();
    MyOrders getAllOrdersWithProductsListedByUserId(Long user_id);
}
