package com.growth10Mindset.admin.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.growth10Mindset.admin.entity.Brand;
import com.growth10Mindset.admin.entity.Product;

@Repository
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Integer> {

    Product findByProductName(String productName);

}
