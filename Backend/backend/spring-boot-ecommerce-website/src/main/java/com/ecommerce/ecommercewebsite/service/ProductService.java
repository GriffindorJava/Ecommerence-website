package com.ecommerce.ecommercewebsite.service;

import com.ecommerce.ecommercewebsite.dto.FilterRequest;
import com.ecommerce.ecommercewebsite.dto.FilteredProducts;
import com.ecommerce.ecommercewebsite.dto.ProductInfo;
import com.ecommerce.ecommercewebsite.dto.UpToDateProductInfoResponse;
import com.ecommerce.ecommercewebsite.entity.Product;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

public interface ProductService {
    List<Product> getAllProducts();
    List<Product> getAllProductsWithPagination(int size, int offset);
    List<Product> getAllProductsWithPaginationAndSorting(int size, int offset, String fieldToSortBy, String sortDirection);
    List<Product> getProductsByCategory(String category_name);
    UpToDateProductInfoResponse getUpToDateProductsInfo(Set<Long> products, HashMap<Long, Integer> quantity);
    ProductInfo getProductById(Long id, UserDetails userDetails);
    int getProductQuantity();
    FilteredProducts getFilteredProducts(FilterRequest filterRequest);
}
