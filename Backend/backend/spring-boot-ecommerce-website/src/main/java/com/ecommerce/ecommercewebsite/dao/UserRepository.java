package com.ecommerce.ecommercewebsite.dao;

import com.ecommerce.ecommercewebsite.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM users WHERE email = :email", nativeQuery = true)
    User findByEmail(@Param("email") String email);

    @Query(value = "SELECT id FROM users WHERE email = :email", nativeQuery = true)
    Long getUserIdByEmail(@Param("email") String email);

    //@Query(value = "SELECT CASE WHEN EXISTS (SELECT u.email FROM users u WHERE u.email = :email) THEN true ELSE false END", nativeQuery = true)
    //Boolean existsByEmail(@Param("email") String email);

    Boolean existsByEmail(String email);

    @Query(value = "SELECT name FROM user_role WHERE id = :user_role_id", nativeQuery = true)
    String findUserRole(@Param("user_role_id") int user_role_id);

    @Query(value = "SELECT first_name, last_name, email, phone_number FROM users WHERE email = :email", nativeQuery = true)
    User getBasicUserInfoByEmail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query(value = "UPDATE users SET password = :newPassword WHERE email = :email", nativeQuery = true)
    void changeUserPassword(@Param("newPassword") String newPassword, @Param("email") String email);
}
