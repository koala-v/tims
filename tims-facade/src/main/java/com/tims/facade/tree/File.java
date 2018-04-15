package com.tims.facade.tree;

import java.io.Serializable;
import java.util.List;


public class File implements TreeEntity<File>,Serializable {
    public String id;
    public String name;
    private String url;
    public String parentId;
    public List<File> children;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getParentId() {
        return parentId;
    }

    @Override
    public void setChildList(List<File> childList) {
        this.children = childList;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public List<File> getChildren() {
        return children;
    }

    public void setChildren(List<File> children) {
        this.children = children;
    }
}
