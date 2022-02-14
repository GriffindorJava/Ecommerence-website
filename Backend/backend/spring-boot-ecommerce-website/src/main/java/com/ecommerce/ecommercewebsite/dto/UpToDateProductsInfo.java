package com.ecommerce.ecommercewebsite.dto;

import com.ecommerce.ecommercewebsite.entity.OrderedProduct;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.util.Set;

@Data
public class UpToDateProductsInfo {

    @NotEmpty(message = "Cannot be empty!")
    Set<OrderedProduct> orderedProducts;
}
