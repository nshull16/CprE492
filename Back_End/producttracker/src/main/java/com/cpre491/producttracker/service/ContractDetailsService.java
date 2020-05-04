package com.cpre491.producttracker.service;

import com.cpre491.producttracker.repository.ContractDetailsRepository;
import com.cpre491.producttracker.util.ContractDetailsConverter;
import com.cpre491.producttracker.viewmodel.ContractDetailsViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ContractDetailsService {

    @Autowired
    ContractDetailsRepository contractDetailsRepository;

    public List<ContractDetailsViewModel> getAll() {
        return ContractDetailsConverter.listModelsToListViewModels(StreamSupport.stream(contractDetailsRepository.findAll().spliterator(), false).collect(Collectors.toList()));
    }

    public List<String> getAssociatedContracts(String cpn) {
        return contractDetailsRepository.findContractByCpnIgnoreCase(cpn);
    }

    public List<String> getAssociatedCPNs(String contract) {
        return contractDetailsRepository.findCpnByContractIgnoreCase(contract);
    }
}
