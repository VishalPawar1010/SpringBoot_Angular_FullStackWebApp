package com.growth10Mindset.admin.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name = "brands")
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "brand_name", length = 45, nullable = false, unique = true)
    @NotEmpty(message = "brandName is required")
    @NotNull(message = "brandName should not be null")
    private String brandName;

    @Lob
    @Column(name = "brandLogo", columnDefinition = "LONGBLOB")
    private byte[] brandLogo;
    
    @ManyToMany
    @JoinTable(name = "brand_categories", joinColumns = @JoinColumn(name = "brand_id"), inverseJoinColumns = @JoinColumn(name = "categories_id"))
    @Fetch(FetchMode.JOIN)
    @NotEmpty(message = "At least one category is required")
    @Size(min = 1, message = "At least one category is required")
    private Set<Category> categories = new HashSet<>();


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public byte[] getBrandLogo() {
		return brandLogo;
	}

	public void setBrandLogo(byte[] brandLogo) {
		this.brandLogo = brandLogo;
	}

	public Set<Category> getCategories() {
		return categories;
	}

	public void setCategories(Set<Category> categories) {
		this.categories = categories;
	}

    public Brand() {
    }



	public Brand(Integer id,
			@NotEmpty(message = "brandName is required") @NotNull(message = "brandName should not be null") String brandName,
			@NotEmpty(message = "At least one category is required") @Size(min = 1, message = "At least one category is required") Set<Category> categories) {
		super();
		this.id = id;
		this.brandName = brandName;
		this.categories = categories;
	}

	@Override
	public String toString() {
		return "Brand [id=" + id + ", brandName=" + brandName + ", categories=" + categories + "]";
	}



	
	
    


}
