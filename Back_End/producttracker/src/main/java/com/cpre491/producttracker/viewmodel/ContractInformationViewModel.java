package com.cpre491.producttracker.viewmodel;


import java.util.List;

public class ContractInformationViewModel {
    private ContractViewModel contractViewModel;
    private List<String> associatedCPNs;

    public ContractViewModel getContractViewModel() {
        return contractViewModel;
    }

    public void setContractViewModel(ContractViewModel contractViewModel) {
        this.contractViewModel = contractViewModel;
    }

    public List<String> getAssociatedCPNs() {
        return associatedCPNs;
    }

    public void setAssociatedCPNs(List<String> associatedCPNs) {
        this.associatedCPNs = associatedCPNs;
    }
}
