package com.ecommerce.ecommercewebsite.service;

import com.ecommerce.ecommercewebsite.dao.OrderRepository;
import com.ecommerce.ecommercewebsite.dao.ProductRepository;
import com.ecommerce.ecommercewebsite.dto.Statistics;
import com.ecommerce.ecommercewebsite.entity.Product;
import com.ecommerce.ecommercewebsite.exception.BadRequestException;
import com.ecommerce.ecommercewebsite.exception.ProductAlreadyExistsException;
import com.ecommerce.ecommercewebsite.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class AdminPanelServiceImpl implements AdminPanelService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public AdminPanelServiceImpl(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void changeOrderStatus(String status, String orderTrackingNumber) {
        if (orderRepository.getOrderByOrderTrackingNumber(orderTrackingNumber) == null) {
            throw new ResourceNotFoundException("Order with an orderTrackingNumber: " + orderTrackingNumber + " was not found");
        }
        orderRepository.changeOrderStatus(status, orderTrackingNumber);
    }

    @Override
    public void deleteProduct(Long productId) {
        if (productRepository.getProductById(productId) == null) {
            throw new ResourceNotFoundException("Product with an id: " + productId + " was not found");
        }
        productRepository.deleteProduct(productId);
    }

    @Override
    public void addProduct(Product product) {
        if (productRepository.getProductByName(product.getName()) != null) {
            throw new ProductAlreadyExistsException("Product with such name already exists!");
        }

        if (product.getName() == null || product.getName().trim().length() == 0) {
            throw new BadRequestException("Name can't be null or the length must be greater than 0");
        }
        String name = product.getName();
        String description = (product.getDescription() == null) ? "" : product.getDescription();

        if (product.getUnitPrice() == null || product.getUnitPrice().compareTo(BigDecimal.ZERO) < 0) {
            throw new BadRequestException("Unit price can't be less than 0");
        }
        BigDecimal unitPrice = product.getUnitPrice();

        if (product.getUnitsInStock() < 0) {
            throw new BadRequestException("Units in stock can't be less than 0");
        }
        int unitsInStock = product.getUnitsInStock();

        if (product.getCategory() < 1 || product.getCategory() > 8) {
            throw new BadRequestException("Category id can't be less than 0");
        }
        int categoryId = product.getCategory();

        Boolean active = product.isActive();
        java.sql.Timestamp currentDate = new java.sql.Timestamp(new java.util.Date().getTime());

        productRepository.addProduct(name, description, unitPrice, unitsInStock, categoryId, active, currentDate);
    }

    @Override
    public Statistics getStatistics() {
        Statistics statistics = new Statistics();

        statistics.setTotalRevenueDay(getTotalRevenueDay());
        statistics.setTotalRevenueMonth(getTotalRevenueMonth());
        statistics.setTotalRevenueYear(getTotalRevenueYear());
        statistics.setAverageOrderValue(getAverageOrderValue());
        statistics.setOrderCountMonth(getOrderCountMonth());
        statistics.setMostFrequentlyBoughtProductId(getMostFrequentlyBoughtProductId());
        statistics.setLeastFrequentlyBoughtProductId(getLeastFrequentlyBoughtProductId());

        return statistics;
    }

    private BigDecimal getTotalRevenueDay() {
        BigDecimal totalRevenueDay = orderRepository.getTotalRevenueDay();

        return totalRevenueDay;
    }

    private BigDecimal getTotalRevenueMonth() {
        BigDecimal totalRevenueMonth = orderRepository.getTotalRevenueMonth();

        return totalRevenueMonth;
    }

    private BigDecimal getTotalRevenueYear() {
        BigDecimal totalRevenueYear = orderRepository.getTotalRevenueYear();

        return totalRevenueYear;
    }

    private BigDecimal getAverageOrderValue() {
        BigDecimal averageOrderValue = orderRepository.getAverageOrderValue();

        return averageOrderValue;
    }

    private int getOrderCountMonth() {
        int orderCountMonth = orderRepository.getOrderCountMonth();

        return orderCountMonth;
    }

    private Long getMostFrequentlyBoughtProductId() {
        Long mostFrequentlyBoughtProductId = orderRepository.getMostFrequentlyBoughtProductId();

        return mostFrequentlyBoughtProductId;
    }

    private Long getLeastFrequentlyBoughtProductId() {
        Long leastFrequentlyBoughtProductId = orderRepository.getLeastFrequentlyBoughtProductId();

        return leastFrequentlyBoughtProductId;
    }
}
