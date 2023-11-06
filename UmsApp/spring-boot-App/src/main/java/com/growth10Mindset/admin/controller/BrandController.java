package com.growth10Mindset.admin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.growth10Mindset.admin.entity.Brand;
import com.growth10Mindset.admin.entity.Category;
import com.growth10Mindset.admin.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.*;

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
    public ResponseEntity<Brand> createBrand(@Valid @RequestBody Map<String, Object> brandDto) throws IOException {

      Brand brand  = new Brand();
      if(brandDto.get("id")!= null)
      brand.setId((int) brandDto.get("id"));

      brand.setBrandName((String) brandDto.get("brandName"));

      Set<Category> tempSet = new HashSet<>();
      for(Object cat : (ArrayList<?>)brandDto.get("categories")){
          tempSet.add(new ObjectMapper().convertValue( cat,Category.class) );
      }
        brand.setCategories(tempSet);
      if(brandDto.get("brandLogo") != null)
       brand.setBrandLogo(Base64.getDecoder().decode(((String)brandDto.get("brandLogo")).split(",")[1]));
//        if (Objects.nonNull(brandService.readBrandByName(brand.getBrandName()))) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).body(brand);
//        }
        Brand createdBrand = brandService.createBrand(brand);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBrand);
    }

//    @PutMapping("/{brandId}")
//    public ResponseEntity<Brand> updateBrand(@PathVariable("brandId") Integer brandId, @Valid @RequestBody Brand brand) {
//        if (Objects.nonNull(brandService.readBrandByName(brand.getBrandName()))) {
//            brandService.updateBrand(brandId, brand);
//            return ResponseEntity.status(HttpStatus.OK).body(brand);
//        }
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(brand);
//    }

    @DeleteMapping("/{brandId}")
    public ResponseEntity<Void> deleteUserById(@PathVariable("brandId") Integer brandId) {
        brandService.deleteBrandById(brandId);
        return ResponseEntity.noContent().build();
    }
//    @ResponseStatus(value = HttpStatus.OK)
//    @PostMapping("/updateBrandLogo/{id}")
//    public ResponseEntity<byte[]> updateBrandLogo(@RequestParam("profilePic") MultipartFile file,
//                                              @PathVariable int id) throws IOException {
//        brandService.updateBrandLogo(file, id);
//        byte[] image = brandService.viewBrandLogo(id);
//        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
//    }

//    @GetMapping("/viewBrandLogo/{id}")
//    public ResponseEntity<byte[]> viewBrandLogo(@PathVariable int id) {
//        byte[] image;
//        try{
//            image = brandService.viewBrandLogo(id);}
//        catch (NullPointerException e){
//            throw new NullPointerException("BrandLogo not found");
//
//        }
//
//        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
//    }
//    @DeleteMapping("/deleteBrandLogo/{id}")
//    public ResponseEntity<Void> deleteBrandLogo(@PathVariable int id) {
//        brandService.deleteBrandLogoById(id);
//        return ResponseEntity.noContent().build();
//    }


}
