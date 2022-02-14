package com.ecommerce.ecommercewebsite.controller;

import com.ecommerce.ecommercewebsite.entity.Product;
import com.ecommerce.ecommercewebsite.security.payload.response.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/test")
public class SearchController {

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/search/{keyword}")
    public ResponseEntity<?> getSearchResult(@Valid @PathVariable String keyword, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Something is wrong!"));
        }

        List<Product> searchResult;

        try {
            Query query = entityManager.createNativeQuery
                    ("SELECT * FROM product WHERE MATCH(name, description) AGAINST(:keyword IN NATURAL LANGUAGE MODE) LIMIT 10");
            query.setParameter("keyword", keyword);

            searchResult = query.getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }

        return ResponseEntity.ok(searchResult);
    }
}
