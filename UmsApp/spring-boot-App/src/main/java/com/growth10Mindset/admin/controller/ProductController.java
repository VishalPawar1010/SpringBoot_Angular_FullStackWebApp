package com.growth10Mindset.admin.controller;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.growth10Mindset.admin.entity.Product;
import com.growth10Mindset.admin.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public ResponseEntity<List<Product>> getAllCategories() {
        List<Product> categories = productService.listProducts();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") Integer id) {
        Product product = productService.readProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/productName/{productName}")
    public ResponseEntity<Product> getProductByName(@PathVariable("productName") String productName) {
        Product product = productService.readProductByName(productName);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
//        if (Objects.nonNull(productService.readProductByName(product.getProductName()))) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).body(product);
//        }
    	System.out.println("NEW PRODUCT details ===" + product.getBrand().getId());
    	System.out.println("NEW PRODUCT details ===" + product.getBrand().toString());

//    	System.out.println("NEW PRODUCT details ===" + product.getCategory().getId().toString());

    	Product createdProduct = productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable("productId") Integer productId, @Valid @RequestBody Product product) {
        if (Objects.nonNull(productService.readProductByName(product.getProductName()))) {
            productService.updateProduct(productId, product);
            return ResponseEntity.status(HttpStatus.OK).body(product);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(product);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteUserById(@PathVariable("productId") Integer productId) {
        productService.deleteProductById(productId);
        return ResponseEntity.noContent().build();
    }



}
