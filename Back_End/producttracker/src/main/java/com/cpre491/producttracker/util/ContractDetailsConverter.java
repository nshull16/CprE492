package com.cpre491.producttracker.util;

import com.cpre491.producttracker.model.ContractDetails;
import com.cpre491.producttracker.viewmodel.ContractDetailsViewModel;

import java.util.ArrayList;
import java.util.List;

public class ContractDetailsConverter {

    public static ContractDetails viewModelToModel(ContractDetailsViewModel contractDetailsViewModel) {
        ContractDetails contractDetails = new ContractDetails();
        contractDetails.setContract(contractDetailsViewModel.getContract());
        contractDetails.setCPN(contractDetailsViewModel.getCpn());
        return contractDetails;
    }

    public static List<ContractDetails> listViewModelsToListModels(List<ContractDetailsViewModel> contractDetailsViewModelList) {
        List<ContractDetails> contractDetailsList = new ArrayList<>();
        for (ContractDetailsViewModel contractDetailsViewModel : contractDetailsViewModelList) {
            contractDetailsList.add(viewModelToModel(contractDetailsViewModel));
        }
        return contractDetailsList;
    }

    public static ContractDetailsViewModel modelToViewModel(ContractDetails contractDetails) {
        ContractDetailsViewModel contractDetailsViewModel = new ContractDetailsViewModel();
        contractDetailsViewModel.setContract(contractDetails.getContract());
        contractDetailsViewModel.setCpn(contractDetails.getCPN());
        return contractDetailsViewModel;
    }

    public static List<ContractDetailsViewModel> listModelsToListViewModels(List<ContractDetails> contractDetailsList) {
        List<ContractDetailsViewModel> contractDetailsViewModelList = new ArrayList<>();
        for (ContractDetails contractDetails : contractDetailsList) {
            contractDetailsViewModelList.add(modelToViewModel(contractDetails));
        }
        return contractDetailsViewModelList;
    }
}
