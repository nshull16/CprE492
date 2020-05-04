package com.cpre491.producttracker.controller;

import com.cpre491.producttracker.service.SearchService;
import com.cpre491.producttracker.viewmodel.ContractSearchViewModel;
import com.cpre491.producttracker.viewmodel.ContractViewModel;
import com.cpre491.producttracker.viewmodel.ProductSearchViewModel;
import com.cpre491.producttracker.viewmodel.ProductViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequestMapping("/search")
public class SearchController {

    @Autowired
    SearchService searchService;

    /**
     * Searches for all products that exist in the product table
     * @param productSearchViewModel
     * @return all products
     */
    @PostMapping(value = "/product", consumes = "application/json")
    public ResponseEntity<List<ProductViewModel>> searchForProduct(@RequestBody ProductSearchViewModel productSearchViewModel) {
        return searchService.searchForProduct(productSearchViewModel);
    }

    /**
     * Searches for all contracts that exist in the contract table
     * @param contractSearchViewModel
     * @return all contracts
     */
    @PostMapping(value = "/contract")
    public ResponseEntity<List<ContractViewModel>> searchForContract(@RequestBody ContractSearchViewModel contractSearchViewModel) {
        return searchService.searchForContract(contractSearchViewModel);
    }

    @GetMapping(value = "/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Connection successful!");
    }

    /**
     * Converts all existing products into a csv file
     * @param productSearchViewModel
     * @return csv file
     */
    @PostMapping(value = "/product/getCSV")
    public ResponseEntity<String> downloadProductSearchCSV(@RequestBody ProductSearchViewModel productSearchViewModel) {
        return searchService.downloadProductSearchCSV(productSearchViewModel);
    }

    /**
     * Converts all existing contracts into a csv file
     * @param contractSearchViewModel
     * @return csv file
     */
    @PostMapping(value = "/contract/getCSV")
    public ResponseEntity<String> downloadContractSearchCSV(@RequestBody ContractSearchViewModel contractSearchViewModel) {
        return searchService.downloadContractSearchCSV(contractSearchViewModel);
    }
}
