package com.ecommerce.ecommercewebsite.dto;

import com.ecommerce.ecommercewebsite.entity.Product;
import lombok.Data;

import java.util.List;

@Data
public class FilteredProducts {
    List<Product> products;
    int quantity;
}
