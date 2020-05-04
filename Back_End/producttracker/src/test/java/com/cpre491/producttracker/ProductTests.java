package com.cpre491.producttracker;

import com.cpre491.producttracker.controller.ProductController;
import com.cpre491.producttracker.model.ContractDetails;
import com.cpre491.producttracker.model.Product;
import com.cpre491.producttracker.repository.ProductRepository;
import com.cpre491.producttracker.service.ContractDetailsService;
import com.cpre491.producttracker.service.ProductService;
import com.cpre491.producttracker.util.ProductConverter;
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
@WebMvcTest(ProductController.class)
@ContextConfiguration(classes = {ProductController.class, ProductService.class})
public class ProductTests {

    @MockBean
    private ProductRepository productRepository;
    @Autowired
    private ProductController productController;
    @MockBean
    private ContractDetailsService contractDetailsService;

    @Test
    public void productGetAllHappy() {
        List<String> testContracts = new ArrayList<>();
        testContracts.add("contract");
        ContractDetails contractDetails = new ContractDetails();
        contractDetails.setCPN("CPN");
        contractDetails.setContract("contract");
        ProductViewModel productViewModel = new ProductViewModel();
        productViewModel.setAssociatedContracts(testContracts);
        productViewModel.setBu("Avionics");
        productViewModel.setCpn("CPN");
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
        List<Product> products = new ArrayList<>();
        products.add(ProductConverter.viewModelToModel(productViewModel));
        when(productRepository.findAll()).thenReturn(products);
        assertEquals(productController.getAll().getBody().get(0).getCpn(), productViewModel.getCpn());
    }

    @Test
    public void productGetAllBad() {
        when(productRepository.findAll()).thenReturn(null);
        boolean threwException = false;
        try {
            productController.getAll();
        } catch (Exception e) {
            threwException = true;
        }
        assertTrue(threwException);
    }
}
