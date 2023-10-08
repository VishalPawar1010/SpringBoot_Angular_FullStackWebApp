package com.growth10Mindset.admin.service;

import com.growth10Mindset.admin.entity.Category;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CategoryService {

    List<Category> listCategories();

    Category createCategory(Category category);

    Category readCategoryByName(String categoryName);

    Category readCategoryById(Integer categoryId);

    void updateCategory(Integer categoryID, Category newCategory);

    void deleteCategoryById(Integer id);
    Category updateImage(MultipartFile file, int id) throws IOException;
    byte[] viewImage(int id);
    void deleteImageById(int id);

}
