package com.cpre491.producttracker;

import com.cpre491.producttracker.controller.SearchController;
import com.cpre491.producttracker.model.Contract;
import com.cpre491.producttracker.model.Product;
import com.cpre491.producttracker.repository.*;
import com.cpre491.producttracker.service.SearchService;
import com.cpre491.producttracker.util.ContractConverter;
import com.cpre491.producttracker.util.ProductConverter;
import com.cpre491.producttracker.viewmodel.ContractSearchViewModel;
import com.cpre491.producttracker.viewmodel.ContractViewModel;
import com.cpre491.producttracker.viewmodel.ProductSearchViewModel;
import com.cpre491.producttracker.viewmodel.ProductViewModel;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebMvcTest(SearchController.class)
@ContextConfiguration(classes = {SearchController.class, SearchService.class, ProductRepositoryJDBC.class, ContractRepositoryJDBC.class})
public class SearchTests {
    @Autowired
    SearchController searchController;
    @MockBean
    ProductRepository productRepository;
    @MockBean
    ContractRepository contractRepository;
    @MockBean
    ContractDetailsRepository contractDetailsRepository;

    @Test
    public void searchProductHappy() {
        ProductSearchViewModel productSearchViewModel = new ProductSearchViewModel();
        productSearchViewModel.setCpn("013-1925-030");
        ProductViewModel productViewModel = new ProductViewModel();
        productViewModel.setPortfolio("Subc");
        productViewModel.setPoc("Megan Dutton");
        productViewModel.setPlant(1002);
        productViewModel.setNotes("");
        productViewModel.setNewprograms("Ask");
        productViewModel.setMakeorbuy("Buy");
        productViewModel.setId(1);
        productViewModel.setEqpttype("");
        productViewModel.setReplacement("");
        productViewModel.setEos("");
        productViewModel.setEop("2021-12-30");
        productViewModel.setCpn("013-1925-030");
        productViewModel.setBu("Avionics");
        assertEquals(searchController.searchForProduct(productSearchViewModel).getBody().get(0).getPoc(), productViewModel.getPoc());
    }

    @Test
    public void searchProductHappy2() {
        ProductSearchViewModel productSearchViewModel = new ProductSearchViewModel();
        ProductViewModel productViewModel = new ProductViewModel();
        productViewModel.setPortfolio("Subc");
        productViewModel.setPoc("Megan Dutton");
        productViewModel.setPlant(1002);
        productViewModel.setNotes("");
        productViewModel.setNewprograms("Ask");
        productViewModel.setMakeorbuy("Buy");
        productViewModel.setId(1);
        productViewModel.setEqpttype("");
        productViewModel.setReplacement("");
        productViewModel.setEos("");
        productViewModel.setEop("2021-12-30");
        productViewModel.setCpn("013-1925-030");
        productViewModel.setBu("Avionics");
        List<Product> products = new ArrayList<>();
        products.add(ProductConverter.viewModelToModel(productViewModel));
        when(productRepository.findAll()).thenReturn(products);
        assertEquals(searchController.searchForProduct(productSearchViewModel).getBody().get(0).getPoc(), productViewModel.getPoc());
    }

    @Test
    public void searchProductBad() {
        boolean exceptionThrown = false;
        try {
            searchController.searchForProduct(null);
        } catch (Exception e) {
            exceptionThrown = true;
        }
        assertTrue(exceptionThrown);
    }

    @Test
    public void searchContractHappy() {
        ContractSearchViewModel contractSearchViewModel = new ContractSearchViewModel();
        contractSearchViewModel.setCm("test_cm1");
        ContractViewModel contractViewModel = new ContractViewModel();
        contractViewModel.setCm("test_cm1");
        contractViewModel.setContract("test_contract");
        contractViewModel.setCustomer("test_customer");
        assertEquals(searchController.searchForContract(contractSearchViewModel).getBody().get(0).getCustomer(), contractViewModel.getCustomer());
    }

    @Test
    public void searchContractHappy2() {
        ContractSearchViewModel contractSearchViewModel = new ContractSearchViewModel();
        ContractViewModel contractViewModel = new ContractViewModel();
        contractViewModel.setCm("test_cm1");
        contractViewModel.setContract("test_contract");
        contractViewModel.setCustomer("test_customer");
        List<Contract> contracts = new ArrayList<>();
        contracts.add(ContractConverter.viewModelToModel(contractViewModel));
        when(contractRepository.findAll()).thenReturn(contracts);
        assertEquals(searchController.searchForContract(contractSearchViewModel).getBody().get(0).getCustomer(), contractViewModel.getCustomer());
    }

    @Test
    public void searchContractBad() {
        boolean exceptionThrown = false;
        try {
            searchController.searchForContract(null);
        } catch (Exception e) {
            exceptionThrown = true;
        }
        assertTrue(exceptionThrown);
    }

}
