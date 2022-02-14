package com.ecommerce.ecommercewebsite.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;

@Entity
@Table(name = "user_address")
@Data
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long user_id;

    @Pattern(regexp = "^[A-Za-z ]{1,32}$")
    @Column(name = "city")
    private String city;

    @Pattern(regexp = "^[0-9]{5}$")
    @Column(name = "postal_code")
    private String postal_code;

    @Pattern(regexp = "^[A-Za-z ]{1,32}$")
    @Column(name = "street")
    private String street;

    @Pattern(regexp = "^[A-Za-z ]{1,32}$")
    @Column(name = "country")
    private String country;

    @Min(1) @Max(9999)
    @Column(name = "street_number")
    private int street_number;
}
