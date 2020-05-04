package com.cpre491.producttracker.viewmodel;

import java.util.List;

public class ProductInformationViewModel {

    private ProductViewModel productViewModel;
    private List<String> associatedContracts;

    public ProductViewModel getProductViewModel() {
        return productViewModel;
    }

    public void setProductViewModel(ProductViewModel productViewModel) {
        this.productViewModel = productViewModel;
    }

    public List<String> getAssociatedContracts() {
        return associatedContracts;
    }

    public void setAssociatedContracts(List<String> associatedContracts) {
        this.associatedContracts = associatedContracts;
    }
}
