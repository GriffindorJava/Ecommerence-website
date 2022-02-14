package com.ecommerce.ecommercewebsite.dao;

import com.ecommerce.ecommercewebsite.entity.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

public interface OpinionRepository extends JpaRepository<Opinion, Long> {

    @Query(value = "SELECT * FROM opinions LIMIT 10", nativeQuery = true)
    List<Opinion> getAllOpinions();

    @Query(value = "SELECT * FROM opinions WHERE product_id = :product_id ORDER BY date DESC", nativeQuery = true)
    List<Opinion> getOpinionsByProductId(@Param("product_id") Long product_id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO opinions (description, product_id, user_id, rating, date) VALUES (:description, :product_id, :user_id, :rating, :date)", nativeQuery = true)
    void insertOpinion(@Param("description") String description, @Param("product_id") Long product_id, @Param("user_id") Long user_id,
                       @Param("rating") BigDecimal rating, @Param("date") java.sql.Timestamp date);

    @Query(value = "SELECT EXISTS(SELECT * FROM opinions WHERE user_id = :user_id AND product_id = :product_id)", nativeQuery = true)
    int checkIfUserAddedOpinionById(@Param("user_id") Long user_id, @Param("product_id") Long product_id);
}
