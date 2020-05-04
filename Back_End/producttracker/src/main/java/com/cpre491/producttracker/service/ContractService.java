package com.cpre491.producttracker.service;

import com.cpre491.producttracker.repository.ContractRepository;
import com.cpre491.producttracker.util.ContractConverter;
import com.cpre491.producttracker.viewmodel.ContractViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ContractService {

    @Autowired
    ContractRepository contractRepository;
    @Autowired
    ContractDetailsService contractDetailsService;

    /**
     * Method to get all contracts and convert them to view models
     * @return View model of contracts
     */
    public List<ContractViewModel> getAll() {
        return ContractConverter.listModelsToListViewModels(StreamSupport.stream(contractRepository.findAll().spliterator(), false).collect(Collectors.toList()));
    }
}
