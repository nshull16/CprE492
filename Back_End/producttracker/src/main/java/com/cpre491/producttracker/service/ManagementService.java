package com.cpre491.producttracker.service;

import com.cpre491.producttracker.model.Contract;
import com.cpre491.producttracker.model.ContractDetails;
import com.cpre491.producttracker.model.Product;
import com.cpre491.producttracker.repository.*;
import com.cpre491.producttracker.util.ContractConverter;
import com.cpre491.producttracker.util.ContractDetailsConverter;
import com.cpre491.producttracker.util.CsvUtils;
import com.cpre491.producttracker.util.ProductConverter;
import com.cpre491.producttracker.viewmodel.ContractDetailsViewModel;
import com.cpre491.producttracker.viewmodel.ContractExcelViewModel;
import com.cpre491.producttracker.viewmodel.ContractViewModel;
import com.cpre491.producttracker.viewmodel.ProductViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

@Service
public class ManagementService {

    @Autowired
    ProductRepository productRepository;
    @Autowired
    ContractDetailsRepository contractDetailsRepository;
    @Autowired
    ContractRepository contractRepository;
    @Autowired
    ProductRepositoryJDBC productRepositoryJDBC;
    @Autowired
    ContractRepositoryJDBC contractRepositoryJDBC;

    /**
     * Upload a product through the "add" button
     * @param productViewModelForm
     * @return A completed product upload
     */
    public ResponseEntity<String> uploadProductFromForm(ProductViewModel productViewModelForm) {
        ResponseEntity<String> status = ResponseEntity.ok().build();
        String error = "Error: Failed to add the following contracts,";
        productRepository.save(ProductConverter.viewModelToModel(productViewModelForm));
        if (productViewModelForm.getAssociatedContracts() != null) {
            for (String contract : productViewModelForm.getAssociatedContracts()) {
                ContractDetails contractDetails = new ContractDetails();
                contractDetails.setCPN(productViewModelForm.getCpn());
                contractDetails.setContract(contract);
                try {
                    contractDetailsRepository.save(contractDetails);
                } catch (Exception e) {
                    error += " " + contract;
                }
            }
        }
        if (error.equals("Error: Failed to add the following contracts,"))
            return status;
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
        
    }

    /**
     * Upload a contract through the "add" button
     * @param contractViewModelForm
     * @return A completed contract upload
     */
    public ResponseEntity<String> uploadContractFromForm(ContractViewModel contractViewModelForm)
    {
        ResponseEntity<String> status = ResponseEntity.ok().build();
        String error = "Error: Failed to add the following products,";
        contractRepository.save(ContractConverter.viewModelToModel(contractViewModelForm));
        if (contractViewModelForm.getAssociatedProducts() != null) {
            for (String product : contractViewModelForm.getAssociatedProducts()) {
                ContractDetails contractDetails = new ContractDetails();
                contractDetails.setContract(contractViewModelForm.getContract());
                contractDetails.setCPN(product);
                try {
                    contractDetailsRepository.save(contractDetails);
                } catch (Exception e) {
                    error += " " + product;
                }
            }
        }
        if (error.equals("Error: Failed to add the following products,"))
            return status;
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Upload a contract details section
     * @param contractDetailsForm
     * @return A completed contract details
     */
    public ResponseEntity<String> uploadContractDetailsFromForm(ContractDetailsViewModel contractDetailsForm) {
        List<String> contractsForCpn = contractDetailsRepository.findContractByCpnIgnoreCase(contractDetailsForm.getCpn());
        if (contractsForCpn.contains(contractDetailsForm.getContract())) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: This contract and product has already been linked");
        } else {
            contractDetailsRepository.save(ContractDetailsConverter.viewModelToModel(contractDetailsForm));
        }
        return ResponseEntity.ok().build();
    }

    /**
     * Uploads a product from the "submit csv doc" button
     * @param productCSV
     * @return A completed product upload
     */
    public ResponseEntity<String> uploadProductFromExcel(MultipartFile productCSV) {
        try {
            productRepository.saveAll(CsvUtils.read(Product.class, productCSV.getInputStream()));
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    /**
     * Uploads a contract from the "submit csv doc" button
     * @param contractCSV
     * @return A completed contract upload
     */
    public ResponseEntity<String> uploadContractFromExcel(MultipartFile contractCSV) {
        try{
            List<ContractExcelViewModel> contractExcelViewModels = CsvUtils.read(ContractExcelViewModel.class, contractCSV.getInputStream());
            for(ContractExcelViewModel contractExcelViewModel : contractExcelViewModels){
                if (contractRepository.findByContractIgnoreCase(contractExcelViewModel.getContract()) == null) {
                    Contract contract = new Contract();
                    contract.setCM(contractExcelViewModel.getCm());
                    contract.setContract(contractExcelViewModel.getContract());
                    contract.setCustomer(contractExcelViewModel.getCustomer());
                    contractRepository.save(contract);
                }
                ContractDetails contractDetails = new ContractDetails();
                contractDetails.setCPN(contractExcelViewModel.getCpn());
                contractDetails.setContract(contractExcelViewModel.getContract());
                contractDetailsRepository.save(contractDetails);
            }
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    /**
     * Edits a single selected product
     * @param productForm
     * @return A modified version of edited product
     */
    public ResponseEntity<String> editProduct(ProductViewModel productForm) {
        ResponseEntity<String> status = ResponseEntity.ok().build();
        String error = "Error: Failed to add the following contracts,";
        Product productToEdit = productRepository.findByCpnIgnoreCase(productForm.getCpn());
        productToEdit.setBU(Product.BU.valueOf(productForm.getBu()));
        productToEdit.setEOP(Date.valueOf(productForm.getEop()));
        productToEdit.setEOS(productForm.getEos());
        productToEdit.setEqptType(productForm.getEqpttype());
        productToEdit.setMakeOrBuy(Product.MakeOrBuy.valueOf(productForm.getMakeorbuy()));
        productToEdit.setNewPrograms(Product.NewProgram.valueOf(productForm.getNewprograms()));
        productToEdit.setNotes(productForm.getNotes());
        productToEdit.setPlant(productForm.getPlant());
        productToEdit.setPOC(productForm.getPoc());
        productToEdit.setPortfolio(Product.Portfolio.valueOf(productForm.getPortfolio()));
        productToEdit.setReplacement(productForm.getReplacement());
        productRepository.save(productToEdit);
        contractDetailsRepository.deleteByCpnIgnoreCase(productForm.getCpn());
        if(productForm.getAssociatedContracts() != null) {
            for (String contract : productForm.getAssociatedContracts()) {
                ContractDetails contractDetails = new ContractDetails();
                contractDetails.setCPN(productForm.getCpn());
                contractDetails.setContract(contract);
                try {
                    contractDetailsRepository.save(contractDetails);
                } catch (Exception e) {
                    error += " " + contract;
                }
            }
        }
        if (error.equals("Error: Failed to add the following contracts,"))
            return status;
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Edits a single selected contract
     * @param contractForm
     * @return A modified version of edited contract
     */
    public ResponseEntity<String> editContract(ContractViewModel contractForm) {
        ResponseEntity<String> status = ResponseEntity.ok().build();
        String error = "Error: Failed to add the following products,";
        Contract contractToEdit = contractRepository.findByContractIgnoreCase(contractForm.getContract());
        contractToEdit.setCM(contractForm.getCm());
        contractToEdit.setCustomer(contractForm.getCustomer());
        contractRepository.save(contractToEdit);
        contractDetailsRepository.deleteByContractIgnoreCase(contractForm.getContract());
        if(contractForm.getAssociatedProducts() != null) {
            for (String product : contractForm.getAssociatedProducts()) {
                ContractDetails contractDetails = new ContractDetails();
                contractDetails.setContract(contractForm.getContract());
                contractDetails.setCPN(product);
                try {
                    contractDetailsRepository.save(contractDetails);
                } catch (Exception e) {
                    error += " " + product;
                }
            }
        }
        if (error.equals("Error: Failed to add the following products,"))
            return status;
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Edits all products with the same value in a specified column
     * @param columnToEdit
     * @param oldValue
     * @param newValue
     * @return Modified version of products with the new value
     */
    public ResponseEntity<String> globalEditProduct(String columnToEdit, String oldValue, String newValue) {
        if (!columnToEdit.equals("CPN")) {
            productRepositoryJDBC.globalEditProduct(columnToEdit, oldValue, newValue);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("Can not edit the CPN column");
        }
    }

    /**
     * Edits all contracts with the same value in a specified column
     * @param columnToEdit
     * @param oldValue
     * @param newValue
     * @return Modified version of contracts with the new value
     */
    public ResponseEntity<String> globalEditContract(String columnToEdit, String oldValue, String newValue) {
        if (!columnToEdit.equals("Contract")) {
            contractRepositoryJDBC.globalEditContract(columnToEdit, oldValue, newValue);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("Can not edit the Contract column");
        }
    }

    /**
     * Deletes a product with a given cpn
     * @param cpn
     * @return
     */
    public ResponseEntity<String> deleteProduct(String cpn) {
        Assert.notNull(cpn, "The cpn you want to delete can not be null");
        contractDetailsRepository.deleteByCpnIgnoreCase(cpn);
        productRepository.deleteByCpnIgnoreCase(cpn);
        return ResponseEntity.ok().build();
    }

    /**
     * Deletes a contract with a given cpn
     * @param contract
     * @return
     */
    public ResponseEntity<String> deleteContract(String contract) {
        Assert.notNull(contract, "The contract you want to delete can not be null");
        contractDetailsRepository.deleteByContractIgnoreCase(contract);
        contractRepository.deleteByContractIgnoreCase(contract);
        return ResponseEntity.ok().build();
    }
}
