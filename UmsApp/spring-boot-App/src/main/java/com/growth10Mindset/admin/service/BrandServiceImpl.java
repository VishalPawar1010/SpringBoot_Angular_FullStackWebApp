package com.growth10Mindset.admin.service;

import com.growth10Mindset.admin.entity.Brand;
import com.growth10Mindset.admin.repo.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandrepository;

    public List<Brand> listBrands() {

        List<Brand> categories = brandrepository.findAll();
//        for (Brand brand : categories) {
//
//            byte[] image = brand.getBrandLogo();
//            if (image != null) {
//                byte[] decompressedData = ImageUtil.decompressImage(image);
//                brand.setBrandLogo(decompressedData);
//            }
//        }
        return categories;

    }

    @Override
    public Brand createBrand(Brand brand) {
        return brandrepository.save(brand);
    }

    public Brand readBrandByName(String brandName) {
        return brandrepository.findByBrandName(brandName);
    }

    public Brand readBrandById(Integer brandId) {
        Optional<Brand> brandOptional = brandrepository.findById(brandId);
        return brandOptional.orElse(null);
    }

//    public void updateBrand(Integer brandID, Brand newBrand) {
//        Brand brand = brandrepository.findById(brandID).get();
//        brand.setBrandName(newBrand.getBrandName());
//        brandrepository.save(brand);
//    }

    @Override
    public void deleteBrandById(Integer id) {
        Optional<Brand> brandOptional = brandrepository.findById(id);
        if (brandOptional.isPresent()) {
            Brand brand = brandOptional.get();
            brandrepository.delete(brand);
        }
    }

//    @Override
//    public Brand updateBrandLogo(MultipartFile file, int id) throws IOException {
//        Optional<Brand> brand = brandrepository.findById(id);
//        brand.get().setBrandLogo(ImageUtil.compressImage(file.getBytes()));
//         return brandrepository.save(brand.get());
//    }
//    @Override
//    public byte[] viewBrandLogo(int id) {
//        Optional<Brand> brand = brandrepository.findById(id);
//
//        return ImageUtil.decompressImage(brand.get().getBrandLogo());
//    }
//
//    @Override
//    public void deleteBrandLogoById(int id) {
//        Optional<Brand> brand = brandrepository.findById(id);
//        if (brand.isPresent()) {
//            if (brand != null) {
//                Brand cat = brand.get();
//                cat.setBrandLogo(null);
//                brandrepository.save(cat);
//            }
//        }
//    }
}
