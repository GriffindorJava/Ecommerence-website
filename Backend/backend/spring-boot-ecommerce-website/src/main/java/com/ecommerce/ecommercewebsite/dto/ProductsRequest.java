package com.ecommerce.ecommercewebsite.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;

@Data
public class ProductsRequest {

    @NotNull
    @Range(min = 0)
    int page; // offset

    @NotNull
    @Range(min = 0)
    int size; // items per page

    String fieldToSortBy;
    String sortDirection;
}
