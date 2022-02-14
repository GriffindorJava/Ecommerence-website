package com.ecommerce.ecommercewebsite.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class MyOrdersCustomProductInfo {
    Long product_id;
    String name;
    int quantity;
    BigDecimal totalPrice;
}
