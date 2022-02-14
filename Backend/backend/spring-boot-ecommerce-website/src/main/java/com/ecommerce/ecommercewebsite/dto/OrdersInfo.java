package com.ecommerce.ecommercewebsite.dto;

import com.ecommerce.ecommercewebsite.entity.Address;
import com.ecommerce.ecommercewebsite.entity.OrderedProduct;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class OrdersInfo {
    private Long id;
    private String status;
    private Address user_address;
    private int payment_method_id;
    private Date date;
    Set<OrderedProduct> orderedProducts;
}
