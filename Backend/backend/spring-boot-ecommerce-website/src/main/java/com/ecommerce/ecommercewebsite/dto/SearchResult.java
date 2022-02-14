package com.ecommerce.ecommercewebsite.dto;

import com.ecommerce.ecommercewebsite.entity.Category;
import com.ecommerce.ecommercewebsite.entity.Product;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class SearchResult {
    private BigDecimal relevance;
    private List<Product> searchResult;
    private List<Category> categories;
}
