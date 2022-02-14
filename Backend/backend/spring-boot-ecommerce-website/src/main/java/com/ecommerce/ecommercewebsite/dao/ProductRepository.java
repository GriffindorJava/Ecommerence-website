package com.ecommerce.ecommercewebsite.dao;

import com.ecommerce.ecommercewebsite.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM product LIMIT 10", nativeQuery = true)
    List<Product> findAllProducts();

    @Query(value = "SELECT * FROM product LIMIT :size OFFSET :offset", nativeQuery = true)
    List<Product> getAllProductsWithPagination(@Param("size") int size, @Param("offset") int offset);

    @Query(value = "SELECT * FROM product ORDER BY :fieldToSortBy :sortDirection LIMIT :size OFFSET :offset", nativeQuery = true)
    List<Product> getAllProductsWithPaginationAndSorting(@Param("size") int size, @Param("offset") int offset,
                                                         @Param("fieldToSortBy") String fieldToSortBy, @Param("sortDirection") String sortDirection);

    @Query(value = "SELECT * FROM product WHERE id = :id", nativeQuery = true)
    Product getProductById(@Param("id") Long id); // optional

    @Query(value = "SELECT * FROM product p JOIN categories c ON p.category_id = c.id WHERE c.name = :category_name", nativeQuery = true)
    List<Product> getProductsByCategory(@Param("category_name") String category_name);

    @Query(value = "SELECT * FROM product WHERE id IN (:products)", nativeQuery = true)
    Set<Product> getUpToDateProductsInfo(@Param("products") Set<Long> products);

    @Query(value = "SELECT count(DISTINCT id) FROM product", nativeQuery = true)
    int getAllProductQuantity();

    @Query(value = "SELECT units_in_stock FROM product WHERE id = :id", nativeQuery = true)
    int getProductUnitsInStock(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE product SET units_in_stock = :updatedUnitsInStock WHERE id = :productId", nativeQuery = true)
    void decreaseUnitsInStock(@Param("updatedUnitsInStock") int updatedUnitsInStock, @Param("productId") Long productId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM product WHERE id = :productId", nativeQuery = true)
    void deleteProduct(@Param("productId") Long productId);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO product (name, description, unit_price, units_in_stock, category_id, active, date_created, last_updated) VALUES " +
            "(:name, :description, :unitPrice, :unitsInStock, :categoryId, :active, :currentDate, :currentDate)", nativeQuery = true)
    void addProduct(@Param("name") String name, @Param("description") String description, @Param("unitPrice") BigDecimal unitPrice,
                    @Param("unitsInStock") int unitsInStock, @Param("categoryId") int categoryId, @Param("active") Boolean active,
                    @Param("currentDate") java.sql.Timestamp currentDate);

    @Query(value = "SELECT * FROM product WHERE name = :name", nativeQuery = true)
    Product getProductByName(@Param("name") String name);

    @Query(value = "SELECT p.name FROM product p JOIN ordered_products op ON p.id = op.product_id " +
            "WHERE op.order_tracking_number = :order_tracking_number AND product_id = :product_id", nativeQuery = true)
    String getNameByOrderTrackingNumber(@Param("order_tracking_number") String order_tracking_number, @Param("product_id") Long product_id);

    @Query(value = "SELECT unit_price FROM product WHERE id = :product_id", nativeQuery = true)
    BigDecimal getProductUnitPriceById(@Param("product_id") Long product_id);
}
