package com.tims.core.image.repository;

import com.tims.core.image.mapper.ImageInfoMapper;
import com.tims.facade.dfs.vo.BillImageVo;
import com.tims.facade.domain.ImageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ImageInfoRepository {
    @Autowired
    private ImageInfoMapper imageInfoMapper;

    /**
     * 新增图片
     * @param imageInfo
     * @return
     */
    public void saveImageInfo(ImageInfo imageInfo){
        imageInfoMapper.saveImageInfo(imageInfo);
    }

    /**
     * 更新图片
     * @param imageInfo
     * @return
     */
    public int updateImageInfo(ImageInfo imageInfo){
        return  imageInfoMapper.updateImageInfo(imageInfo);
    }

    /**
     * 删除
     * @param id
     * @return
     */
    public int  deleteImageInfo(String id){
        return  imageInfoMapper.deleteImageInfo(id);
    }

    /**
     * 根据单据编码查询图片列表
     * @param billNo
     * @return
     */
    public BillImageVo queryImagesByBillNo(String billNo){
        return imageInfoMapper.queryImagesByBillNo(billNo);
    }


    /**
     * 根据id获取图片列表
     * @param imageClassifyId
     * @return
     */
    public List<ImageInfo> queryImageInfoByImageClassifyId(String imageClassifyId){
        return  imageInfoMapper.queryImageInfoByImageClassifyId(imageClassifyId);
    }
}
