package com.ecommerce.ecommercewebsite.service;

import com.ecommerce.ecommercewebsite.dao.OrderRepository;
import com.ecommerce.ecommercewebsite.dao.OrderedProductRepository;
import com.ecommerce.ecommercewebsite.dao.ProductRepository;
import com.ecommerce.ecommercewebsite.dao.UserRepository;
import com.ecommerce.ecommercewebsite.dto.Purchase;
import com.ecommerce.ecommercewebsite.dto.PurchaseResponse;
import com.ecommerce.ecommercewebsite.entity.OrderedProduct;
import com.ecommerce.ecommercewebsite.entity.User;
import com.ecommerce.ecommercewebsite.exception.NotEnoughUnitsInStockException;
import com.ecommerce.ecommercewebsite.exception.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Set;

@Service
@Transactional
public class CheckoutServiceImpl implements CheckoutService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderedProductRepository orderedProductRepository;
    private final ProductRepository productRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public CheckoutServiceImpl(UserRepository userRepository, OrderRepository orderRepository,
                               OrderedProductRepository orderedProductRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.orderedProductRepository = orderedProductRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional(rollbackOn = NotEnoughUnitsInStockException.class)
    public PurchaseResponse placeOrder(Purchase purchase, UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername());
        Set<OrderedProduct> orderedProducts = purchase.getOrderedProducts();

        Query query = entityManager.createNativeQuery("SELECT UUID()");
        String UUID = query.getSingleResult().toString();

        java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());
        String status = "ordered";

        orderRepository.insertOrder(UUID, user.getId(), status, purchase.getPayment_method_id(),
                purchase.getShipping_method_id(), purchase.getCity(), purchase.getPostal_code(),
                purchase.getStreet(), purchase.getCountry(), purchase.getStreet_number(), date);

        orderedProducts.forEach(orderedProduct -> {
            if (productRepository.getProductById(orderedProduct.getProduct_id()) == null) {
                throw new ResourceNotFoundException("Product with an id: " + orderedProduct.getProduct_id() + " not found");
            }

            int unitsInStock = productRepository.getProductUnitsInStock(orderedProduct.getProduct_id());
            int updatedUnitsInStock = unitsInStock - (int) orderedProduct.getQuantity();
            boolean checkIfThereIsEnoughUnitsInStock = (updatedUnitsInStock >= 0) ? true : false;

            if (!checkIfThereIsEnoughUnitsInStock) {
                throw new NotEnoughUnitsInStockException("There is not enough units in stock for an item with an id: " + orderedProduct.getProduct_id());
            }

            productRepository.decreaseUnitsInStock(updatedUnitsInStock, orderedProduct.getProduct_id());
            orderedProductRepository.insertOrderedProduct(UUID, orderedProduct.getProduct_id(), orderedProduct.getQuantity());
        });

        return new PurchaseResponse(UUID);
    }
}
