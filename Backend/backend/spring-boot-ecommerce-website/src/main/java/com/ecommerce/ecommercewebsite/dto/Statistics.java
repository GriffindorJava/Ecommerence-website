package com.ecommerce.ecommercewebsite.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Statistics {
    BigDecimal totalRevenueDay;
    BigDecimal totalRevenueMonth;
    BigDecimal totalRevenueYear;
    BigDecimal averageOrderValue;
    int orderCountMonth;
    Long mostFrequentlyBoughtProductId;
    Long leastFrequentlyBoughtProductId;
}
