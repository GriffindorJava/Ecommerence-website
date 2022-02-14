package com.ecommerce.ecommercewebsite.dao;

import com.ecommerce.ecommercewebsite.dto.MyOrdersCustomProductInfo;
import com.ecommerce.ecommercewebsite.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    @Query(value = "SELECT * FROM orders LIMIT 10", nativeQuery = true)
    List<Order> getAllOrders();

    @Query(value = "SELECT * FROM orders WHERE user_id = :user_id ORDER BY date DESC", nativeQuery = true)
    List<Order> getAllOrdersByUserId(@Param("user_id") Long user_id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO orders (order_tracking_number, user_id, status, payment_method_id, shipping_method_id, city, postal_code, " +
            "street, country, street_number, date) VALUES (:order_tracking_number, :user_id, :status, :payment_method_id, :shipping_method_id, " +
            ":city, :postal_code, :street, :country, :street_number, :date)", nativeQuery = true)
    void insertOrder(@Param("order_tracking_number") String order_tracking_number, @Param("user_id") Long user_id, @Param("status") String status,
                     @Param("payment_method_id") Long payment_method_id, @Param("shipping_method_id") Long shipping_method_id, @Param("city") String city,
                     @Param("postal_code") String postal_code, @Param("street") String street, @Param("country") String country,
                     @Param("street_number") int street_number, @Param("date") java.sql.Timestamp date);

    @Transactional
    @Modifying
    @Query(value = "UPDATE orders SET status = :status WHERE order_tracking_number = :orderTrackingNumber", nativeQuery = true)
    void changeOrderStatus(@Param("status") String status, @Param("orderTrackingNumber") String orderTrackingNumber);

    @Query(value = "SELECT * FROM orders WHERE order_tracking_number = :orderTrackingNumber", nativeQuery = true)
    Order getOrderByOrderTrackingNumber(@Param("orderTrackingNumber") String orderTrackingNumber);

    @Query(value = "SELECT SUM(op.quantity * p.unit_price) FROM orders o JOIN ordered_products op ON o.order_tracking_number = op.order_tracking_number " +
            "JOIN product p ON p.id = op.product_id WHERE Date(date) = Curdate();", nativeQuery = true)
    BigDecimal getTotalRevenueDay();

    @Query(value = "SELECT SUM(op.quantity * p.unit_price) FROM orders o JOIN ordered_products op ON o.order_tracking_number = op.order_tracking_number " +
            "JOIN product p ON p.id = op.product_id WHERE Month(date) = Month(Curdate());", nativeQuery = true)
    BigDecimal getTotalRevenueMonth();

    @Query(value = "SELECT SUM(op.quantity * p.unit_price) FROM orders o JOIN ordered_products op ON o.order_tracking_number = op.order_tracking_number " +
            "JOIN product p ON p.id = op.product_id WHERE YEAR(date) = YEAR(curdate());", nativeQuery = true)
    BigDecimal getTotalRevenueYear();

    @Query(value = "SELECT AVG(op.quantity * p.unit_price) FROM orders o JOIN ordered_products op ON o.order_tracking_number = op.order_tracking_number JOIN " +
            "product p ON p.id = op.product_id;", nativeQuery = true)
    BigDecimal getAverageOrderValue();

    @Query(value = "SELECT COUNT(DISTINCT order_tracking_number) FROM orders WHERE Month(date) = Month(Curdate());", nativeQuery = true)
    int getOrderCountMonth();

    @Query(value = "SELECT op.product_id FROM orders o JOIN ordered_products op ON o.order_tracking_number = op.order_tracking_number GROUP BY op.product_id " +
            "ORDER BY SUM(op.quantity) DESC LIMIT 1;", nativeQuery = true)
    Long getMostFrequentlyBoughtProductId();

    @Query(value = "SELECT op.product_id FROM orders o JOIN ordered_products op ON o.order_tracking_number = op.order_tracking_number GROUP BY op.product_id " +
            "ORDER BY SUM(op.quantity) LIMIT 1;", nativeQuery = true)
    Long getLeastFrequentlyBoughtProductId();

    //@Query(value = "SELECT op.product_id, p.name, op.quantity, (p.unit_price * op.quantity) AS totalPrice FROM ordered_products op JOIN product p ON op.product_id = p.id " +
    //        "WHERE op.order_tracking_number = :order_tracking_number", nativeQuery = true)
    //List<MyOrdersCustomProductInfo> getMyOrdersCustomProductInfo(@Param("order_tracking_number") String order_tracking_number);
}
