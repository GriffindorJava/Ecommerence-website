package com.ecommerce.ecommercewebsite.dao;

import com.ecommerce.ecommercewebsite.entity.OrderedProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface OrderedProductRepository extends JpaRepository<OrderedProduct, String> {

    @Query(value = "SELECT product_id FROM ordered_products WHERE order_tracking_number = :order_tracking_number", nativeQuery = true)
    List<Long> getProductIdByOrderTrackingNumber(@Param("order_tracking_number") String order_tracking_number);

    @Query(value = "SELECT quantity FROM ordered_products WHERE order_tracking_number = :order_tracking_number AND product_id = :product_id", nativeQuery = true)
    int getQuantityByOrderTrackingNumber(@Param("order_tracking_number") String order_tracking_number, @Param("product_id") Long product_id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO ordered_products (order_tracking_number, product_id, quantity) VALUES (:order_tracking_number, :product_id, :quantity)",
            nativeQuery = true)
    void insertOrderedProduct(@Param("order_tracking_number") String order_tracking_number, @Param("product_id") Long product_id, @Param("quantity") int quantity);

    @Query(value = "SELECT EXISTS(SELECT * FROM ordered_products op JOIN orders o USING(order_tracking_number) " +
            "WHERE user_id = :user_id AND product_id = :product_id)", nativeQuery = true)
    int checkIfUserBoughtProductByIds(@Param("user_id") Long user_id, @Param("product_id") Long product_id);
}
