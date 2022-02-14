package com.ecommerce.ecommercewebsite.service;

import com.ecommerce.ecommercewebsite.dao.OrderRepository;
import com.ecommerce.ecommercewebsite.dao.OrderedProductRepository;
import com.ecommerce.ecommercewebsite.dao.ProductRepository;
import com.ecommerce.ecommercewebsite.dto.MyOrders;
import com.ecommerce.ecommercewebsite.dto.MyOrdersCustomProductInfo;
import com.ecommerce.ecommercewebsite.dto.OrderWithProductsListed;
import com.ecommerce.ecommercewebsite.entity.Order;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderedProductRepository orderedProductRepository;

    public OrderServiceImpl(OrderRepository orderRepository, ProductRepository productRepository, OrderedProductRepository orderedProductRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderedProductRepository = orderedProductRepository;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.getAllOrders();
    }

    @Override
    public MyOrders getAllOrdersWithProductsListedByUserId(Long user_id) {

        MyOrders myOrders = new MyOrders();
        List<Order> orders = orderRepository.getAllOrdersByUserId(user_id);
        List<OrderWithProductsListed> orderWithProductsListedList = new ArrayList<>();

        orders.stream().forEach(order -> {
            OrderWithProductsListed orderWithProductsListed = new OrderWithProductsListed();
            List<MyOrdersCustomProductInfo> myOrdersCustomProductInfoList = new ArrayList<>();

            orderWithProductsListed.setOrder(order);

            List<Long> productsId = orderedProductRepository.getProductIdByOrderTrackingNumber(order.getOrderTrackingNumber());

            productsId.stream().forEach(productId -> {
                MyOrdersCustomProductInfo myOrdersCustomProductInfo = new MyOrdersCustomProductInfo();

                String name = productRepository.getNameByOrderTrackingNumber(order.getOrderTrackingNumber(), productId);
                int quantity = orderedProductRepository.getQuantityByOrderTrackingNumber(order.getOrderTrackingNumber(), productId);
                BigDecimal unitPrice = productRepository.getProductUnitPriceById(productId);
                BigDecimal totalPrice = unitPrice.multiply(BigDecimal.valueOf(quantity));

                myOrdersCustomProductInfo.setProduct_id(productId);
                myOrdersCustomProductInfo.setName(name);
                myOrdersCustomProductInfo.setQuantity(quantity);
                myOrdersCustomProductInfo.setTotalPrice(totalPrice);

                myOrdersCustomProductInfoList.add(myOrdersCustomProductInfo);
            });

            orderWithProductsListed.setMyOrdersCustomProductInfos(myOrdersCustomProductInfoList);

            orderWithProductsListedList.add(orderWithProductsListed);
        });

        myOrders.setOrdersWithProductsListed(orderWithProductsListedList);

        return myOrders;
    }

}
