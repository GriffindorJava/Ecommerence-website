package com.ecommerce.ecommercewebsite.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "ordered_products")
@Data
public class OrderedProduct {

    @Id
    @Column(name = "order_tracking_number")
    private String order_tracking_number;

    @Column(name = "product_id")
    private Long product_id;

    @Column(name = "quantity")
    private int quantity;
}
