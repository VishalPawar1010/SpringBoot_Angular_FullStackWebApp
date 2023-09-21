package com.growth10Mindset.admin.service;

import com.growth10Mindset.admin.entity.Category;
import com.growth10Mindset.admin.repo.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryrepository;

    public List<Category> listCategories() {
        return categoryrepository.findAll();
    }

    @Override
    public Category createCategory(Category category) {
        return categoryrepository.save(category);
    }

    public Category readCategoryByName(String categoryName) {
        return categoryrepository.findByCategoryName(categoryName);
    }

    public Category readCategoryById(Integer categoryId) {
        Optional<Category> categoryOptional = categoryrepository.findById(categoryId);
        return categoryOptional.orElse(null);
    }

    public void updateCategory(Integer categoryID, Category newCategory) {
        Category category = categoryrepository.findById(categoryID).get();
        category.setCategoryName(newCategory.getCategoryName());
        category.setDescription(newCategory.getDescription());
        category.setImageUrl(newCategory.getImageUrl());
        categoryrepository.save(category);
    }

    @Override
    public void deleteCategoryById(Integer id) {
        Optional<Category> categoryOptional = categoryrepository.findById(id);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            categoryrepository.delete(category);
        }
    }
}
