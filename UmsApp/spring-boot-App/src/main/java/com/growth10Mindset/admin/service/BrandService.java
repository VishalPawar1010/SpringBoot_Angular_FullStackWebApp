package com.growth10Mindset.admin.service;

import com.growth10Mindset.admin.entity.Brand;

import java.util.List;

public interface BrandService {

    List<Brand> listBrands();

    Brand createBrand(Brand brand);

    Brand readBrandByName(String brandName);

    Brand readBrandById(Integer brandId);

//    void updateBrand(Integer brandID, Brand newBrand);

    void deleteBrandById(Integer id);
//    Brand updateBrandLogo(MultipartFile file, int id) throws IOException;
//    byte[] viewBrandLogo(int id);
//    void deleteBrandLogoById(int id);

}
