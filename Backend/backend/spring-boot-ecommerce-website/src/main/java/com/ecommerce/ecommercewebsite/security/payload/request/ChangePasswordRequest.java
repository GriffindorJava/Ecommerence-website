package com.ecommerce.ecommercewebsite.security.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class ChangePasswordRequest {
    @NotBlank
    @Size(min = 6, max = 64)
    String newPassword;

    @NotBlank
    @Size(min = 6, max = 64)
    String oldPassword;
}
