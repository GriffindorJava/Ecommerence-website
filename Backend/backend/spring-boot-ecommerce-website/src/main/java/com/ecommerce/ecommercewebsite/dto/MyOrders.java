package com.ecommerce.ecommercewebsite.dto;

import lombok.Data;

import java.util.List;

@Data
public class MyOrders {
    List<OrderWithProductsListed> ordersWithProductsListed;
}
