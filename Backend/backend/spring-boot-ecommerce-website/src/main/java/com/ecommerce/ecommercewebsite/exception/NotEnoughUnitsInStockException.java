package com.ecommerce.ecommercewebsite.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class NotEnoughUnitsInStockException extends RuntimeException {

    public NotEnoughUnitsInStockException(String message) {
        super(message);
    }
}