package com.growth10Mindset.admin.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "products")
public class Product {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "product_name", length = 45, nullable = false, unique = true)
    @NotEmpty(message = "productName is required")
    @NotNull(message = "productName should not be null")
    private String productName;
    
    @Column(name = "short_desc", length = 512, nullable = false)
    private String shortDescription;
    
    @Column(name = "full_desc", length = 4096, nullable = false)
    private String fullDescription;
    
    @Column(name = "created_time")
    private Date createdTime;
    
    @Column(name = "updated_time")
    private Date updatedTime;

    private boolean enabled;
    
    @Column(name = "in_stock")
    private boolean inStock;
    
    private float cost;
    private float price;
    
    @Column(name = "discount_percent")
    private float discountPercent;
    
    private float length;
    private float width;
    private float height;
    private float weight;
   
    
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getShortDescription() {
		return shortDescription;
	}

	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}

	public String getFullDescription() {
		return fullDescription;
	}

	public void setFullDescription(String fullDescription) {
		this.fullDescription = fullDescription;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public Date getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(Date updatedTime) {
		this.updatedTime = updatedTime;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public boolean isInStock() {
		return inStock;
	}

	public void setInStock(boolean inStock) {
		this.inStock = inStock;
	}

	public float getCost() {
		return cost;
	}

	public void setCost(float cost) {
		this.cost = cost;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public float getDiscountPercent() {
		return discountPercent;
	}

	public void setDiscountPercent(float discountPercent) {
		this.discountPercent = discountPercent;
	}

	public float getLength() {
		return length;
	}

	public void setLength(float length) {
		this.length = length;
	}

	public float getWidth() {
		return width;
	}

	public void setWidth(float width) {
		this.width = width;
	}

	public float getHeight() {
		return height;
	}

	public void setHeight(float height) {
		this.height = height;
	}

	public float getWeight() {
		return weight;
	}

	public void setWeight(float weight) {
		this.weight = weight;
	}


	public Brand getBrand() {
		return brand;
	}

	public void setBrand(Brand brand) {
		this.brand = brand;
	}
	
	public Product() {

	}
	

	public Product(Integer id,
			String productName,
			String shortDescription, String fullDescription, Brand brand) {
		this.id = id;
		this.productName = productName;
		this.shortDescription = shortDescription;
		this.fullDescription = fullDescription;
		this.brand = brand;
	}

	public Product(Integer id,
			String productName, Brand brand) {
		this.id = id;
		this.productName = productName;
		this.brand = brand;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", productName=" + productName + ", brand=" + brand
				+ "]";
	}



    



	
	

}
