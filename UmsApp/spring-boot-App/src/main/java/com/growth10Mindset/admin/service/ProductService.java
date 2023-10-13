package com.growth10Mindset.admin.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.growth10Mindset.admin.entity.Product;
import com.growth10Mindset.admin.entity.Product;

public interface ProductService {

    List<Product> listProducts();

    Product createProduct(Product brand);

    Product readProductByName(String brandName);

    Product readProductById(Integer brandId);

    void updateProduct(Integer brandID, Product newProduct);

    void deleteProductById(Integer id);

}
