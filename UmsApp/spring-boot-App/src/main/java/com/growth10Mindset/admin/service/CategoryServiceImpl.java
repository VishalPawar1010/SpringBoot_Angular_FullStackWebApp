package com.growth10Mindset.admin.service;

import com.growth10Mindset.admin.entity.Category;
import com.growth10Mindset.admin.repo.CategoryRepository;
import com.growth10Mindset.admin.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryrepository;

    public List<Category> listCategories() {

        return categoryrepository.findAll().stream().map( category ->{
            byte[] image = category.getImage();
            if (image != null) {
                byte[] decompressedData = ImageUtil.decompressImage(image);
                category.setImage(decompressedData);
            }
            return category;
        }).collect(Collectors.toList());
        //return list.stream().map(n -> solve(n, x)).collect(Collectors.toList());
//        for (User user : users) {
//            byte[] photos = user.getPhotos();
//            if (photos != null) {
//                byte[] decompressedData = ImageUtil.decompressImage(photos);
//                user.setPhotos(decompressedData);
//            }
//        }
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
        category.setImage(newCategory.getImage());
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

    @Override
    public Category updateImage(MultipartFile file, int id) throws IOException {
        Optional<Category> category = categoryrepository.findById(id);
        category.get().setImage(ImageUtil.compressImage(file.getBytes()));
         return categoryrepository.save(category.get());
    }
    @Override
    public byte[] viewImage(int id) {
        Optional<Category> category = categoryrepository.findById(id);

        return ImageUtil.decompressImage(category.get().getImage());
    }

    @Override
    public void deleteImageById(int id) {
        Optional<Category> category = categoryrepository.findById(id);
        if (category.isPresent()) {
            if (category != null) {
                Category cat = category.get();
                cat.setImage(null);
                categoryrepository.save(cat);
            }
        }
    }
}
