package com.growth10Mindset.admin.controller;

import com.growth10Mindset.admin.entity.Category;
import com.growth10Mindset.admin.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/category")
@CrossOrigin("http://localhost:4200")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.listCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("categoryId") Integer id) {
        Category category = categoryService.readCategoryById(id);
        if (category != null) {
            return ResponseEntity.ok(category);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/categoryName/{categoryName}")
    public ResponseEntity<Category> getCategoryByName(@PathVariable("categoryName") String categoryName) {
        Category category = categoryService.readCategoryByName(categoryName);
        if (category != null) {
            return ResponseEntity.ok(category);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/")
    public ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) {
        if (Objects.nonNull(categoryService.readCategoryByName(category.getCategoryName()))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(category);
        }
        Category createdCategory = categoryService.createCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable("categoryId") Integer categoryId, @Valid @RequestBody Category category) {
        if (Objects.nonNull(categoryService.readCategoryByName(category.getCategoryName()))) {
            categoryService.updateCategory(categoryId, category);
            return ResponseEntity.status(HttpStatus.OK).body(category);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(category);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteUserById(@PathVariable("categoryId") Integer categoryId) {
        categoryService.deleteCategoryById(categoryId);
        return ResponseEntity.noContent().build();
    }
    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping("/updateImage/{id}")
    public ResponseEntity<byte[]> updateImage(@RequestParam("profilePic") MultipartFile file,
                                              @PathVariable int id) throws IOException {
        categoryService.updateImage(file, id);
        byte[] image = categoryService.viewImage(id);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }

    @GetMapping("/viewImage/{id}")
    public ResponseEntity<byte[]> viewImage(@PathVariable int id) {
        byte[] image;
        try{
            image = categoryService.viewImage(id);}
        catch (NullPointerException e){
            throw new NullPointerException("Image not found");

        }

        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }
    @DeleteMapping("/deleteImage/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable int id) {
        categoryService.deleteImageById(id);
        return ResponseEntity.noContent().build();
    }


}
