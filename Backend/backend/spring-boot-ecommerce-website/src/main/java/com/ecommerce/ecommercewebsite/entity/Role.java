package com.ecommerce.ecommercewebsite.entity;

import com.ecommerce.ecommercewebsite.enums.ERole;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "user_role")
@Data
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private ERole name;
}
