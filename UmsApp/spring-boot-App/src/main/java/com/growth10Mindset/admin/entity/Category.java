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
    @Pattern(regexp = "^[A-Z][a-zA-Z]*$", message = "Category Name should start with a capital letter and contain only alphabets.")

    private String categoryName;

    @Column(name = "description",length = 128)
    @NotBlank(message = "Description should not be not blank")
    @Size(min = 5, max = 128)
    private String description;

    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;

    public Category() {
    }

    
    public Category(Integer id) {
		this.id = id;
	}


	public Category(@NotBlank String categoryName, @NotBlank String description) {
        this.categoryName = categoryName;
        this.description = description;
    }

    public Category(@NotBlank String categoryName, @NotBlank String description, @NotBlank byte[] image) {
        this.categoryName = categoryName;
        this.description = description;
        this.image = image;
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

    @Override
    public String toString() {
        return "Category{" + "id=" + id + ", category name='" + categoryName + '\'' + ", description='" + description + '\'' + '}';
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
