package com.ecommerce.ecommercewebsite.dto;

import com.ecommerce.ecommercewebsite.entity.OrderedProduct;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
public class Purchase {
    private Long payment_method_id;
    private Long shipping_method_id;

    @NotBlank
    private String city;

    @NotBlank
    private String postal_code;

    @NotBlank
    private String street;

    @NotBlank
    private String country;

    @NotNull
    private int street_number;

    @NotEmpty
    Set<OrderedProduct> orderedProducts;
}
