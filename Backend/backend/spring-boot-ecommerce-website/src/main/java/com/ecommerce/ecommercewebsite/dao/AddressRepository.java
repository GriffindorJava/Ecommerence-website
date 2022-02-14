package com.ecommerce.ecommercewebsite.dao;

import com.ecommerce.ecommercewebsite.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    @Query(value = "SELECT * FROM user_address WHERE user_id = :user_id", nativeQuery = true)
    List<Address> getAllAddressesByUserId(@Param("user_id") Long user_id);

    @Query(value = "SELECT ud.id, ud.user_id, ud.street, ud.street_number, ud.postal_code, ud.city, ud.country " +
            "FROM user_address ud JOIN users u ON ud.user_id = u.id " +
            "WHERE u.email = :email", nativeQuery = true)
    List<Address> getAllAddressesByUserEmail(@Param("email") String email);

    @Query(value = "SELECT * FROM user_address WHERE id = :address_id", nativeQuery = true)
    Address getAddressById(@Param("address_id") int address_id);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO user_address (user_id, city, postal_code, street, country, street_number) " +
            "VALUES (:user_id, :city, :postal_code, :street, :country, :street_number)", nativeQuery = true)
    void insertAddress(@Param("user_id") Long user_id, @Param("city") String city, @Param("postal_code") String postal_code,
                       @Param("street") String street, @Param("country") String country, @Param("street_number") int street_number);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM user_address WHERE id = :address_id", nativeQuery = true)
    void deleteAddress(@Param("address_id") int address_id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user_address SET city = :city, postal_code = :postal_code, street = :street, country = :country, " +
            "street_number = :street_number WHERE id = :address_id", nativeQuery = true)
    void updateAddress(@Param("city") String city, @Param("postal_code") String postal_code, @Param("street") String street,
                       @Param("country") String country, @Param("street_number") int street_number, @Param("address_id") int address_id);
}
