package com.cpre491.producttracker.util;

import com.cpre491.producttracker.model.Contract;
import com.cpre491.producttracker.viewmodel.ContractViewModel;

import java.util.ArrayList;
import java.util.List;

public class ContractConverter {

    /**
     * Converts contract view models to contracts
     * @param contractViewModel
     * @return Contract
     */
    public static Contract viewModelToModel(ContractViewModel contractViewModel) {
        Contract contract = new Contract();
        contract.setCM(contractViewModel.getCm());
        contract.setCustomer(contractViewModel.getCustomer());
        contract.setContract(contractViewModel.getContract());
        return contract;
    }

    /**
     * Converts contract view model lists to contract lists
     * @param contractViewModelList
     * @return Contract list
     */
    public static List<Contract> listViewModelsToListModels(List<ContractViewModel> contractViewModelList) {
        List<Contract> contractList = new ArrayList<>();
        for (ContractViewModel contractViewModel : contractViewModelList) {
            contractList.add(viewModelToModel(contractViewModel));
        }
        return contractList;
    }

    /**
     * Converts contracts to contract view models
     * @param contract
     * @return Contract view model
     */
    public static ContractViewModel modelToViewModel(Contract contract) {
        ContractViewModel contractViewModel = new ContractViewModel();
        contractViewModel.setCm(contract.getCM());
        contractViewModel.setCustomer(contract.getCustomer());
        contractViewModel.setContract(contract.getContract());
        return contractViewModel;
    }

    /**
     * Converts contract lists to contract view model lists
     * @param contractList
     * @return Contract view model list
     */
    public static List<ContractViewModel> listModelsToListViewModels(List<Contract> contractList) {
        List<ContractViewModel> contractViewModelList = new ArrayList<>();
        for (Contract contract : contractList) {
            contractViewModelList.add(modelToViewModel(contract));
        }
        return contractViewModelList;
    }
}
