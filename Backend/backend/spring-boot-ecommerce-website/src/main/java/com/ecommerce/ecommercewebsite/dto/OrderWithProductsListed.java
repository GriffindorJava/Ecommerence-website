package com.ecommerce.ecommercewebsite.dto;

import com.ecommerce.ecommercewebsite.entity.Order;
import lombok.Data;

import java.util.List;

@Data
public class OrderWithProductsListed {
    Order order;
    List<MyOrdersCustomProductInfo> myOrdersCustomProductInfos;
}
