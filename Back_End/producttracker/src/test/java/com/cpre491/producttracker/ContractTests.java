package com.cpre491.producttracker;

import com.cpre491.producttracker.controller.ContractController;
import com.cpre491.producttracker.model.Contract;
import com.cpre491.producttracker.model.ContractDetails;
import com.cpre491.producttracker.repository.ContractRepository;
import com.cpre491.producttracker.service.ContractDetailsService;
import com.cpre491.producttracker.service.ContractService;
import com.cpre491.producttracker.viewmodel.ContractViewModel;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebMvcTest(ContractController.class)
@ContextConfiguration(classes = {ContractController.class, ContractService.class})

public class ContractTests {

    @MockBean
    private ContractRepository contractRepository;
    @Autowired
    private ContractController contractController;
    @MockBean
    private ContractDetailsService contractDetailsService;

    @Test
    public void contractGetAllHappy() {
        Contract test = new Contract();
        test.setCustomer("customer");
        test.setContract("contract");
        test.setCM("cm");
        List<String> testProducts = new ArrayList<>();
        testProducts.add("products");
        ContractDetails contractDetails = new ContractDetails();
        contractDetails.setCPN("products");
        contractDetails.setContract("contract");
        ContractViewModel contractViewModel = new ContractViewModel();
        contractViewModel.setCustomer(test.getCustomer());
        contractViewModel.setContract(test.getContract());
        contractViewModel.setCm(test.getCM());
        contractViewModel.setAssociatedProducts(testProducts);
        List<Contract> contracts = new ArrayList<>();
        contracts.add(test);
        when(contractRepository.findAll()).thenReturn(contracts);
        assertEquals(contractController.getAll().getBody().get(0).getContract(), test.getContract());
    }

    @Test
    public void contractGetAllBad() {
        when(contractRepository.findAll()).thenReturn(null);
        boolean threwException = false;
        try {
            contractController.getAll();
        } catch (Exception e) {
            threwException = true;
        }
        assertTrue(threwException);
    }
}
