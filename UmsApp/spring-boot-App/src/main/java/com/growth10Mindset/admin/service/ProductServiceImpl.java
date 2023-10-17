package com.growth10Mindset.admin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.growth10Mindset.admin.entity.Brand;
import com.growth10Mindset.admin.entity.Product;
import com.growth10Mindset.admin.repo.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productrepository;
    
    @Autowired
    private BrandService brandService;

    public List<Product> listProducts() {

        List<Product> categories = productrepository.findAll();
        return categories;

    }

    @Override
    public Product createProduct(Product product) {
//    	Brand brand = brandService.readBrandById(1);
//    	product.setBrand(brand);
        return productrepository.save(product);
    }

    public Product readProductByName(String productName) {
        return productrepository.findByProductName(productName);
    }

    public Product readProductById(Integer productId) {
        Optional<Product> productOptional = productrepository.findById(productId);
        return productOptional.orElse(null);
    }

    public void updateProduct(Integer productID, Product newProduct) {
        Product product = productrepository.findById(productID).get();
        product.setProductName(newProduct.getProductName());
        productrepository.save(product);
    }

    @Override
    public void deleteProductById(Integer id) {
        Optional<Product> productOptional = productrepository.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            productrepository.delete(product);
        }
    }


    
    
}
