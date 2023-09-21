package com.growth10Mindset.admin.service;

import com.growth10Mindset.admin.entity.Category;

import java.util.List;

public interface CategoryService {

    List<Category> listCategories();

    Category createCategory(Category category);

    Category readCategoryByName(String categoryName);

    Category readCategoryById(Integer categoryId);

    void updateCategory(Integer categoryID, Category newCategory);

    void deleteCategoryById(Integer id);
}
