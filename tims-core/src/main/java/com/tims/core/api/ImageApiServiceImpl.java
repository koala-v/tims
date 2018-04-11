package com.tims.core.api;

import com.tims.core.image.service.ImageInfoService;
import com.tims.facade.api.ImageApiService;
import com.tims.facade.dfs.vo.BillImageVo;
import com.tims.facade.domain.ImageClassify;
import com.tims.facade.domain.ImageClassifyRel;
import com.tims.facade.domain.ImageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ImageApiServiceImpl implements ImageApiService{
    @Autowired
    private ImageInfoService imageInfoService;
    @Override
    public boolean saveImageInfo(ImageInfo imageInfo) {
        return false;
    }

    @Override
    public boolean updateImageInfo(ImageInfo imageInfo) {
        return false;
    }

    @Override
    public boolean deleteImageInfo(String id) {
        return false;
    }

    @Override
    public boolean saveImageClassify(ImageClassify imageClassify) {
        return false;
    }

    @Override
    public boolean updateImageClassify(ImageClassify imageClassify) {
        return false;
    }

    @Override
    public boolean deleteImageClassify(String id) {
        return false;
    }

    @Override
    public boolean saveImageClassifyRel(ImageClassifyRel imageClassifyRel) {
        return false;
    }

    @Override
    public boolean updatImageClassifyRel(ImageClassifyRel imageClassifyRel) {
        return false;
    }

    @Override
    public boolean deleteImageClassifyRel(String id) {
        return false;
    }

    @Override
    public BillImageVo queryImagesByBillId(String billId) {
        return null;
    }

    @Override
    public BillImageVo queryImagesByBillNo(String billNo) {
        return imageInfoService.queryImagesByBillNo(billNo);
    }
}