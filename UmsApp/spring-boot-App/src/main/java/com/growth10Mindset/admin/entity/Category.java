package com.growth10Mindset.admin.entity;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "category_name", length = 45, nullable = false, unique = true)
    @NotEmpty(message = "Name is required")
    @NotNull(message = "Name should not be null")
    private String categoryName;

    @Column(length = 128)
    private String description;

    @Column(length = 512)
    private String imageUrl;

    public Category() {
    }

    public Category(@NotBlank String categoryName, @NotBlank String description) {
        this.categoryName = categoryName;
        this.description = description;
    }

    public Category(@NotBlank String categoryName, @NotBlank String description, @NotBlank String imageUrl) {
        this.categoryName = categoryName;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "Category{" + "id=" + id + ", category name='" + categoryName + '\'' + ", description='" + description + '\'' + '}';
    }
}
