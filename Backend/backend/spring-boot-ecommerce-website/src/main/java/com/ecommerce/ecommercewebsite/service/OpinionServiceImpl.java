package com.ecommerce.ecommercewebsite.service;

import com.ecommerce.ecommercewebsite.dao.OpinionRepository;
import com.ecommerce.ecommercewebsite.dao.OrderedProductRepository;
import com.ecommerce.ecommercewebsite.dao.UserRepository;
import com.ecommerce.ecommercewebsite.entity.Opinion;
import com.ecommerce.ecommercewebsite.exception.BadRequestException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Service
public class OpinionServiceImpl implements OpinionService {

    private final OpinionRepository opinionRepository;
    private final UserRepository userRepository;
    private final OrderedProductRepository orderedProductRepository;

    public OpinionServiceImpl(OpinionRepository opinionRepository, UserRepository userRepository, OrderedProductRepository orderedProductRepository) {
        this.opinionRepository = opinionRepository;
        this.userRepository = userRepository;
        this.orderedProductRepository = orderedProductRepository;
    }

    @Override
    public List<Opinion> getAllOpinions() {
        return opinionRepository.getAllOpinions();
    }

    @Override
    public void insertOpinion(String description, Long product_id, BigDecimal rating, Timestamp date, UserDetails userDetails) {
        if (rating.compareTo(BigDecimal.valueOf(5)) > 0 || rating.compareTo(BigDecimal.ZERO) < 0) {
            throw new BadRequestException("Rating must be between 0 and 5!");
        }

        Long user_id = userRepository.getUserIdByEmail(userDetails.getUsername());

        if (opinionRepository.checkIfUserAddedOpinionById(user_id, product_id) == 1) {
            throw new BadRequestException("User with an id: " + user_id + " has already added an opinion to product with an id: " + product_id);
        }

        if (orderedProductRepository.checkIfUserBoughtProductByIds(user_id, product_id) == 0) {
            throw new BadRequestException("User with an id: " + user_id + " hasn't bought a product with an id: " + product_id);
        }

        opinionRepository.insertOpinion(description, product_id, user_id, rating, date);
    }
}
