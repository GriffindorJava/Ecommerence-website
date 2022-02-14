package com.ecommerce.ecommercewebsite.service;

import com.ecommerce.ecommercewebsite.dao.CategoryRepository;
import com.ecommerce.ecommercewebsite.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getCategories() {
        return categoryRepository.getCategories();
    }
}
