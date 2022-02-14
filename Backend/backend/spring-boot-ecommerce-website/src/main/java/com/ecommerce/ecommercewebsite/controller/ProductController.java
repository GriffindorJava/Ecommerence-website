package com.ecommerce.ecommercewebsite.controller;

import com.ecommerce.ecommercewebsite.dto.*;
import com.ecommerce.ecommercewebsite.entity.OrderedProduct;
import com.ecommerce.ecommercewebsite.entity.Product;
import com.ecommerce.ecommercewebsite.security.payload.response.MessageResponse;
import com.ecommerce.ecommercewebsite.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/test")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/products")
    public ResponseEntity<?> getAllProducts(@Valid @RequestBody ProductsRequest productsRequest, Errors errors) {

        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid parameters!"));
        }

        List<Product> response;

        if (productsRequest.getFieldToSortBy() == null) {
            response = productService.getAllProductsWithPagination(productsRequest.getSize(), productsRequest.getPage());
        } else {
            response = productService.getAllProductsWithPaginationAndSorting(productsRequest.getSize(), productsRequest.getPage(),
                    productsRequest.getFieldToSortBy(), productsRequest.getSortDirection());
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/upToDateProductsInfo")
    public ResponseEntity<?> getUpToDateProductsInfo(@Valid @RequestBody UpToDateProductsInfo upToDateProductsInfo, Errors errors) {

        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid parameters!"));
        }

        Set<OrderedProduct> orderedProducts = upToDateProductsInfo.getOrderedProducts();

        Set<Long> products = orderedProducts.stream().map(OrderedProduct::getProduct_id).collect(Collectors.toSet());

        HashMap<Long, Integer> quantity  = new HashMap<>();

        orderedProducts.stream().forEach(orderedProduct -> quantity.put(orderedProduct.getProduct_id(), orderedProduct.getQuantity()));

        UpToDateProductInfoResponse upToDateProductInfoResponse = productService.getUpToDateProductsInfo(products, quantity);

        return ResponseEntity.ok(upToDateProductInfoResponse);
    }

    @GetMapping("/category/{category_name}")
    public List<Product> getProductsByCategory(@PathVariable String category_name) {
        return productService.getProductsByCategory(category_name);
    }

    @GetMapping("/product/{id}")
    public ProductInfo getProductById(@PathVariable Long id) {

        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != "anonymousUser") {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            return productService.getProductById(id, userDetails);
        } else {
            return productService.getProductById(id, null);
        }
    }

    @GetMapping("/productsQuantity")
    public int getProductsQuantity() {
        return productService.getProductQuantity();
    }

    @PostMapping("/filteredProducts")
    public ResponseEntity<?> getFilteredProducts(@Valid @RequestBody FilterRequest filterRequest) {

        FilteredProducts response = productService.getFilteredProducts(filterRequest);

        return ResponseEntity.ok(response);
    }
}
