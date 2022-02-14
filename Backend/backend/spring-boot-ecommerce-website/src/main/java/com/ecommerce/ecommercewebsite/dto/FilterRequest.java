package com.ecommerce.ecommercewebsite.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
public class FilterRequest {
    Set<Integer> categories;
    int minPrice;
    int maxPrice;
    @NotNull
    @Range(min = 0)
    int page;

    @NotNull
    @Range(min = 1)
    int size;

    String fieldToSortBy;
    String sortDirection;
    String searchValue;
}
