package com.cpre491.producttracker;

import com.cpre491.producttracker.controller.ManagementController;
import com.cpre491.producttracker.model.Contract;
import com.cpre491.producttracker.model.ContractDetails;
import com.cpre491.producttracker.model.Product;
import com.cpre491.producttracker.repository.*;
import com.cpre491.producttracker.service.ManagementService;
import com.cpre491.producttracker.util.ContractConverter;
import com.cpre491.producttracker.util.ContractDetailsConverter;
import com.cpre491.producttracker.util.ProductConverter;
import com.cpre491.producttracker.viewmodel.ContractViewModel;
import com.cpre491.producttracker.viewmodel.ProductViewModel;
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
@WebMvcTest(ManagementController.class)
@ContextConfiguration(classes = {ManagementController.class, ManagementService.class})
public class ManagementTests {

    @MockBean
    private ProductRepository productRepository;

    @MockBean
    private ContractDetailsRepository contractDetailsRepository;

    @MockBean
    private ContractRepository contractRepository;

    @MockBean
    private ContractRepositoryJDBC contractRepositoryJDBC;

    @MockBean
    private ProductRepositoryJDBC productRepositoryJDBC;

    @Autowired
    private ManagementController managementController;

    @Test
    public void testUploadProductFromFormHappy() {
        List<String> associatedContracts = new ArrayList<>();
        associatedContracts.add("test");
        ProductViewModel productViewModel = new ProductViewModel();
        productViewModel.setAssociatedContracts(associatedContracts);
        productViewModel.setBu("Avionics");
        productViewModel.setCpn("junitTestCPN");
        productViewModel.setEop("2019-10-27");
        productViewModel.setEos("today");
        productViewModel.setReplacement("demoReplacement");
        productViewModel.setEqpttype("display");
        productViewModel.setId(-1);
        productViewModel.setMakeorbuy("Buy");
        productViewModel.setNewprograms("Ask");
        productViewModel.setNotes("testing junit");
        productViewModel.setPlant(1213);
        productViewModel.setPoc("Me");
        productViewModel.setPortfolio("ComAv");
        ContractDetails contractDetails = new ContractDetails();
        contractDetails.setContract("test");
        contractDetails.setCPN("junitTestCPN");
        when(productRepository.save(ProductConverter.viewModelToModel(productViewModel)))
                .thenReturn(new Product());
        when(contractDetailsRepository.save(contractDetails)).thenReturn(new ContractDetails());
        assertEquals(managementController.uploadProductFromForm(productViewModel), ResponseEntity.ok().build());
    }

    @Test
    public void testUploadProductFromFormBad() {
        boolean threwException = false;
        try {
            managementController.uploadProductFromForm(new ProductViewModel());
        } catch (Exception e) {
            threwException = true;
        }
        assertTrue(threwException);
    }

    @Test
    public void testUploadContractFromFormHappy() {
        List<String> associatedProducts = new ArrayList<>();
        associatedProducts.add("test");
        ContractViewModel contractViewModel = new ContractViewModel();
        contractViewModel.setAssociatedProducts(associatedProducts);
        contractViewModel.setCm("testing");
        contractViewModel.setContract("testContract");
        contractViewModel.setCustomer("customer");
        ContractDetails contractDetails = new ContractDetails();
        contractDetails.setContract("test");
        contractDetails.setCPN("junitTestCPN");
        when(contractRepository.save(ContractConverter.viewModelToModel(contractViewModel)))
                .thenReturn(new Contract());
        when(contractDetailsRepository.save(contractDetails)).thenReturn(new ContractDetails());
        assertEquals(managementController.uploadContractFromForm(contractViewModel), ResponseEntity.ok().build());
    }

    @Test
    public void testUploadContractFromFormBad() {
        boolean threwException = false;
        try {
            managementController.uploadContractFromForm(null);
        } catch (Exception e) {
            threwException = true;
        }
        assertTrue(threwException);
    }

    @Test
    public void testUploadContractDetailsFromFormHappy() {
        ContractDetails contractDetails = new ContractDetails();
        contractDetails.setContract("test");
        contractDetails.setCPN("junitTestCPN");
        when(contractDetailsRepository.save(contractDetails)).thenReturn(new ContractDetails());
        assertEquals(managementController.uploadContractDetailsFromForm(ContractDetailsConverter.modelToViewModel(contractDetails)), ResponseEntity.ok().build());
    }

    @Test
    public void testUploadContractDetailsFromFormBad() {
        boolean threwException = false;
        try {
            managementController.uploadContractDetailsFromForm(null);
        } catch (Exception e) {
            threwException = true;
        }
        assertTrue(threwException);
    }

    @Test
    public void testUploadProductFromExcelBad() {
        boolean threwException = false;
        try {
            managementController.uploadProductFromExcel(null);
        } catch (Exception e) {
            threwException = true;
        }
        assertTrue(threwException);
    }

    @Test
    public void testUploadContractFromExcelBad() {
        boolean threwException = false;
        try {
            managementController.uploadContractFromExcel(null);
        } catch (Exception e) {
            threwException = true;
        }
        assertTrue(threwException);
    }
}
