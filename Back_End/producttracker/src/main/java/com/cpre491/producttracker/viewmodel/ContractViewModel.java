package com.cpre491.producttracker.viewmodel;

import java.util.List;

public class ContractViewModel {
    private Integer id;
    private String cm;
    private String customer;
    private String contract;
    private List<String> associatedProducts;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCm() {
        return cm;
    }

    public void setCm(String cm) {
        this.cm = cm;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getContract() {
        return contract;
    }

    public void setContract(String contract) {
        this.contract = contract;
    }

    public List<String> getAssociatedProducts() {
        return associatedProducts;
    }

    public void setAssociatedProducts(List<String> associatedProducts) {
        this.associatedProducts = associatedProducts;
    }
}
