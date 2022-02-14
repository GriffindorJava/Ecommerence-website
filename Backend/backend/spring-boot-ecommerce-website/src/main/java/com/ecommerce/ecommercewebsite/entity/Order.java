package com.ecommerce.ecommercewebsite.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @Column(name = "order_tracking_number")
    private String orderTrackingNumber;

    @Column(name = "user_id")
    private int user_id;

    @Column(name = "status")
    private String status;

    @Column(name = "payment_method_id")
    private int payment_method_id;

    @Column(name = "shipping_method_id")
    private int shipping_method_id;

    @Column(name = "city")
    private String city;

    @Column(name = "postal_code")
    private String postal_code;

    @Column(name = "street")
    private String street;

    @Column(name = "country")
    private String country;

    @Column(name = "street_number")
    private int street_number;

    @Column(name = "date")
    @CreationTimestamp
    private Date date;
}
