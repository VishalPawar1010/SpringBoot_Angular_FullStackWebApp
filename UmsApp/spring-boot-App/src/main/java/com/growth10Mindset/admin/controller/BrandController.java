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

import com.growth10Mindset.admin.entity.Brand;
import com.growth10Mindset.admin.service.BrandService;

@RestController
@RequestMapping("/api/brands")
@CrossOrigin("http://localhost:4200")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping("/")
    public ResponseEntity<List<Brand>> getAllCategories() {
        List<Brand> categories = brandService.listBrands();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{brandId}")
    public ResponseEntity<Brand> getBrandById(@PathVariable("brandId") Integer id) {
        Brand brand = brandService.readBrandById(id);
        if (brand != null) {
            return ResponseEntity.ok(brand);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/brandName/{brandName}")
    public ResponseEntity<Brand> getBrandByName(@PathVariable("brandName") String brandName) {
        Brand brand = brandService.readBrandByName(brandName);
        if (brand != null) {
            return ResponseEntity.ok(brand);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/")
    public ResponseEntity<Brand> createBrand(@Valid @RequestBody Brand brand) {
        if (Objects.nonNull(brandService.readBrandByName(brand.getBrandName()))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(brand);
        }
        Brand createdBrand = brandService.createBrand(brand);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBrand);
    }

    @PutMapping("/{brandId}")
    public ResponseEntity<Brand> updateBrand(@PathVariable("brandId") Integer brandId, @Valid @RequestBody Brand brand) {
        if (Objects.nonNull(brandService.readBrandByName(brand.getBrandName()))) {
            brandService.updateBrand(brandId, brand);
            return ResponseEntity.status(HttpStatus.OK).body(brand);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(brand);
    }

    @DeleteMapping("/{brandId}")
    public ResponseEntity<Void> deleteUserById(@PathVariable("brandId") Integer brandId) {
        brandService.deleteBrandById(brandId);
        return ResponseEntity.noContent().build();
    }
    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping("/updateBrandLogo/{id}")
    public ResponseEntity<byte[]> updateBrandLogo(@RequestParam("profilePic") MultipartFile file,
                                              @PathVariable int id) throws IOException {
        brandService.updateBrandLogo(file, id);
        byte[] image = brandService.viewBrandLogo(id);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }

    @GetMapping("/viewBrandLogo/{id}")
    public ResponseEntity<byte[]> viewBrandLogo(@PathVariable int id) {
        byte[] image;
        try{
            image = brandService.viewBrandLogo(id);}
        catch (NullPointerException e){
            throw new NullPointerException("BrandLogo not found");

        }

        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }
    @DeleteMapping("/deleteBrandLogo/{id}")
    public ResponseEntity<Void> deleteBrandLogo(@PathVariable int id) {
        brandService.deleteBrandLogoById(id);
        return ResponseEntity.noContent().build();
    }


}
