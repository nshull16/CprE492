package com.cpre491.producttracker.controller;

import com.cpre491.producttracker.service.ManagementService;
import com.cpre491.producttracker.viewmodel.ContractDetailsViewModel;
import com.cpre491.producttracker.viewmodel.ContractViewModel;
import com.cpre491.producttracker.viewmodel.ProductViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/management")
public class ManagementController {

    @Autowired
    ManagementService managementService;

    //Form Add Endpoints

    /**
     * Upload a product through the form "add" button
     * @param productForm
     * @return A completed product upload
     */
    @PostMapping("/form-upload/product")
    public ResponseEntity<String> uploadProductFromForm(@ModelAttribute("productForm") ProductViewModel productForm) {
        return managementService.uploadProductFromForm(productForm);
    }

    /**
     * Upload a contract through the form "add" button
     * @param contractForm
     * @return A completed contract upload
     */
    @PostMapping("/form-upload/contract")
    public ResponseEntity<String> uploadContractFromForm(ContractViewModel contractForm) {
        return managementService.uploadContractFromForm(contractForm);
    }

    /**
     * Upload a contract details section
     * @param contractDetailsForm
     * @return A completed contract details
     */
    @PostMapping("/form-upload/contract-details")
    public ResponseEntity uploadContractDetailsFromForm(ContractDetailsViewModel contractDetailsForm) {
        return managementService.uploadContractDetailsFromForm(contractDetailsForm);
    }

    //Excel Add Endpoints

    /**
     * Uploads a product through the "submit csv doc" button
     * @param productCSV csv file with appropriate product headers
     * @return A completed product upload
     */
    @PostMapping(value = "/excel-upload/product", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadProductFromExcel(@RequestParam("file") MultipartFile productCSV) {
        return managementService.uploadProductFromExcel(productCSV);
    }

    /**
     * Uploads a contract through the "submit csv doc" button
     * @param contractCSV csv file with appropriate contract headers
     * @return A completed product upload
     */
    @PostMapping(value = "/excel-upload/contract", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadContractFromExcel(@RequestParam("file") MultipartFile contractCSV) {
        return managementService.uploadContractFromExcel(contractCSV);
    }

    //Edit Endpoints

    /**
     * Edits a single selected product
     * @param productForm
     * @return A modified version of edited product
     */
    @PostMapping("/edit/product")
    public ResponseEntity<String> editProduct(@ModelAttribute("productForm") ProductViewModel productForm) {
        return managementService.editProduct(productForm);
    }

    /**
     * Edits a single selected contract
     * @param contractForm
     * @return A modified version of the edited contract
     */
    @PostMapping("/edit/contract")
    public ResponseEntity<String> editContract(@ModelAttribute("contractForm") ContractViewModel contractForm) {
        return managementService.editContract(contractForm);
    }

    //Global Edit Endpoint

    /**
     * Edits all products with the same value in a specified column
     * @param columnToEdit
     * @param oldValue
     * @param newValue
     * @return Modified version of products with the new value
     */
    @PostMapping("/globalEdit/product")
    public ResponseEntity<String> globalEditProduct(@RequestParam("columnToEdit") String columnToEdit, @RequestParam("oldValue") String oldValue, @RequestParam("newValue") String newValue) {
        return managementService.globalEditProduct(columnToEdit, oldValue, newValue);
    }

    /**
     * Edits all contracts with the same value in a specified column
     * @param columnToEdit
     * @param oldValue
     * @param newValue
     * @return Modified version of contracts with the new value
     */
    @PostMapping("/globalEdit/contract")
    public ResponseEntity<String> globalEditContract(@RequestParam("columnToEdit") String columnToEdit, @RequestParam("oldValue") String oldValue, @RequestParam("newValue") String newValue) {
        return managementService.globalEditContract(columnToEdit, oldValue, newValue);
    }

    /**
     * Deletes a product with the given cpn
     * @param cpn
     * @return
     */
    @PostMapping("/delete/product")
    public ResponseEntity<String> deleteProduct(@RequestParam("cpn") String cpn) {
        return managementService.deleteProduct(cpn);
    }

    /**
     * Deletes a contract with the given cpn
     * @param contract
     * @return
     */
    @PostMapping("/delete/contract")
    public ResponseEntity<String> deleteContract(@RequestParam("contract") String contract) {
        return managementService.deleteContract(contract);
    }
    
}
