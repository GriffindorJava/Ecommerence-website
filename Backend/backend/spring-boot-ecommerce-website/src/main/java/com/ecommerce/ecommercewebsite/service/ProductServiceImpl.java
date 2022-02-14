package com.ecommerce.ecommercewebsite.service;

import com.ecommerce.ecommercewebsite.dao.OpinionRepository;
import com.ecommerce.ecommercewebsite.dao.OrderedProductRepository;
import com.ecommerce.ecommercewebsite.dao.ProductRepository;
import com.ecommerce.ecommercewebsite.dao.UserRepository;
import com.ecommerce.ecommercewebsite.dto.FilterRequest;
import com.ecommerce.ecommercewebsite.dto.FilteredProducts;
import com.ecommerce.ecommercewebsite.dto.ProductInfo;
import com.ecommerce.ecommercewebsite.dto.UpToDateProductInfoResponse;
import com.ecommerce.ecommercewebsite.entity.Opinion;
import com.ecommerce.ecommercewebsite.entity.Product;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import com.ecommerce.ecommercewebsite.exception.ResourceNotFoundException;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final OpinionRepository opinionRepository;
    private final OrderedProductRepository orderedProductRepository;
    private final UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public ProductServiceImpl(ProductRepository productRepository, OpinionRepository opinionRepository, OrderedProductRepository orderedProductRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.opinionRepository = opinionRepository;
        this.orderedProductRepository = orderedProductRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAllProducts();
    }

    @Override
    public List<Product> getAllProductsWithPagination(int size, int offset) {
        return productRepository.getAllProductsWithPagination(size, offset);
    }

    @Override
    public List<Product> getAllProductsWithPaginationAndSorting(int size, int offset, String fieldToSortBy, String sortDirection) {
        return productRepository.getAllProductsWithPaginationAndSorting(size, offset, fieldToSortBy, sortDirection);
    }

    @Override
    public List<Product> getProductsByCategory(String category_name) {
        Optional<List<Product>> productsByCategory = Optional.ofNullable(productRepository.getProductsByCategory(category_name));
        if(productsByCategory.isPresent()) {
            return productRepository.getProductsByCategory(category_name);
        } else {
            throw new ResourceNotFoundException("Category with name: " + category_name + " does not exist");
        }
    }

    @Override
    public UpToDateProductInfoResponse getUpToDateProductsInfo(Set<Long> products, HashMap<Long, Integer> quantity) {
        UpToDateProductInfoResponse upToDateProductInfoResponse = new UpToDateProductInfoResponse();

        Set<Product> productSet = productRepository.getUpToDateProductsInfo(products);

        upToDateProductInfoResponse.setProducts(productSet);

        BigDecimal totalPrice = productSet.stream()
                .map(product -> product.getUnitPrice().multiply(BigDecimal.valueOf(quantity.get(product.getId()))))
                .reduce((a, b) -> a.add(b)).get();

        upToDateProductInfoResponse.setTotalPrice(totalPrice);

        return upToDateProductInfoResponse;
    }

    @Override
    public ProductInfo getProductById(Long id, UserDetails userDetails) {
        ProductInfo productInfo = new ProductInfo();

        Optional<Product> product = Optional.ofNullable(productRepository.getProductById(id));
		if(product.isPresent()) {

            Product productById = productRepository.getProductById(id);
            List<Opinion> opinions = opinionRepository.getOpinionsByProductId(id);

            Boolean isAddingOpinionPossible = false;

            if (userDetails != null) {
                Long user_id = userRepository.getUserIdByEmail(userDetails.getUsername());
                int checkIfUserBoughtProductByIds = orderedProductRepository.checkIfUserBoughtProductByIds(user_id, id);
                int checkIfUserAddedOpinionById = opinionRepository.checkIfUserAddedOpinionById(user_id, id);

                if (checkIfUserBoughtProductByIds == 1 && checkIfUserAddedOpinionById == 0) {
                    isAddingOpinionPossible = true;
                }
            }

            productInfo.setName(productById.getName());
            productInfo.setDescription(productById.getDescription());
            productInfo.setUnitPrice(productById.getUnitPrice());
            productInfo.setImagePath(productById.getImagePath());
            productInfo.setUnitsInStock(productById.getUnitsInStock());
            productInfo.setOpinionCount(opinions.size());
            productInfo.setAverage_rating(product.get().getAverage_rating());
            productInfo.setIsAddingOpinionPossible(isAddingOpinionPossible);
            productInfo.setOpinions(opinions);

			return productInfo;
		} else {
			throw new ResourceNotFoundException("Product with id: " + id + " does not exist");
		}
    }

    @Override
    public int getProductQuantity() {
        return productRepository.getAllProductQuantity();
    }

    @Override
    public FilteredProducts getFilteredProducts(FilterRequest filterRequest) {
        Set<Integer> categories = (filterRequest.getCategories() == null || filterRequest.getCategories().isEmpty())
                ? Stream.of(1, 2, 3, 4, 5, 6, 7, 8).collect(Collectors.toSet()) : filterRequest.getCategories();
        int minPrice = ((Integer) filterRequest.getMinPrice() != null || String.valueOf(filterRequest.getMinPrice()).trim() != "")
                ? filterRequest.getMinPrice() : 0;
        int maxPrice = ((Integer) filterRequest.getMaxPrice() != null || String.valueOf(filterRequest.getMaxPrice()).trim() != "")
                ? filterRequest.getMaxPrice() : Integer.MAX_VALUE;
        int page = filterRequest.getPage();
        int size = filterRequest.getSize();
        String fieldToSortBy = ((filterRequest.getFieldToSortBy()).isEmpty()) ? null : filterRequest.getFieldToSortBy();
        String sortDirection = (filterRequest.getSortDirection().isEmpty()) ? "" : filterRequest.getSortDirection();
        String searchValue = (filterRequest.getSearchValue() == null) ? "" : filterRequest.getSearchValue();

        String searchQuery = "";
        FilteredProducts filteredProducts = new FilteredProducts();

        if (maxPrice == 0) maxPrice = Integer.MAX_VALUE;

        if (!searchValue.isEmpty()) {
            searchQuery = "AND MATCH(name, description) AGAINST(:keyword IN BOOLEAN MODE) ";
        }

        String nativeQuery = "SELECT * FROM product WHERE unit_price >= " + minPrice + " AND unit_price <= " + maxPrice + " AND category_id IN :categories "
                + searchQuery + "ORDER BY " + fieldToSortBy + " " + sortDirection + " LIMIT " + size + " OFFSET " + page;

        String queryToGetProductsQuantityString = "SELECT COUNT(*) FROM product WHERE unit_price >= " + minPrice + " AND unit_price <= " + maxPrice +
                " AND category_id IN :categories " + searchQuery + "ORDER BY " + fieldToSortBy + " " + sortDirection;

        try {
            Query query = entityManager.createNativeQuery(nativeQuery, Product.class);
            query.setParameter("categories", categories);

            Query queryToGetProductsQuantity = entityManager.createNativeQuery(queryToGetProductsQuantityString);
            queryToGetProductsQuantity.setParameter("categories", categories);

            if (!searchValue.isEmpty()) {
                query.setParameter("keyword", searchValue + "*");
                queryToGetProductsQuantity.setParameter("keyword", searchValue + "*");
            }

            filteredProducts.setProducts(query.getResultList());
            filteredProducts.setQuantity(((BigInteger) queryToGetProductsQuantity.getSingleResult()).intValue());
        } catch (Exception exception) {
            exception.printStackTrace();
            throw exception;
        }

        return filteredProducts;
    }
}
