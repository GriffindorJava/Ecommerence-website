package com.ecommerce.ecommercewebsite.dto;

import com.ecommerce.ecommercewebsite.entity.Product;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Set;

@Data
public class UpToDateProductInfoResponse {
    Set<Product> products;
    BigDecimal totalPrice;
}
