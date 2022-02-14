package com.ecommerce.ecommercewebsite.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ChangeOrderStatusRequest {

    @NotBlank
    String status;

    @NotBlank
    String orderTrackingNumber;
}
