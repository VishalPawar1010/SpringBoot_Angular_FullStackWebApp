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
    @JoinColumn(name = "category_id")
    private Category category;
    
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;



    



	
	

}
