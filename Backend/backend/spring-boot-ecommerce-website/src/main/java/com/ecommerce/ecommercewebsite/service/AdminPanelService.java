package com.ecommerce.ecommercewebsite.service;

import com.ecommerce.ecommercewebsite.dto.Statistics;
import com.ecommerce.ecommercewebsite.entity.Product;

public interface AdminPanelService {
    void changeOrderStatus(String status, String orderTrackingNumber);
    void deleteProduct(Long productId);
    void addProduct(Product product);
    Statistics getStatistics();
}
