package com.cpre491.producttracker.service;

import com.cpre491.producttracker.repository.*;
import com.cpre491.producttracker.util.ContractConverter;
import com.cpre491.producttracker.util.ProductConverter;
import com.cpre491.producttracker.viewmodel.ContractSearchViewModel;
import com.cpre491.producttracker.viewmodel.ContractViewModel;
import com.cpre491.producttracker.viewmodel.ProductSearchViewModel;
import com.cpre491.producttracker.viewmodel.ProductViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class SearchService {

    @Autowired
    ProductRepositoryJDBC productRepositoryJDBC;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ContractRepository contractRepository;
    @Autowired
    ContractRepositoryJDBC contractRepositoryJDBC;
    @Autowired
    ContractDetailsRepository contractDetailsRepository;

    /**
     * Searches for all products within the product table
     * @param product
     * @return all products
     */
    public ResponseEntity<List<ProductViewModel>> searchForProduct(ProductSearchViewModel product) {
        return ResponseEntity.ok(searchProduct(product));
    }

    /**
     * Searches for all products within the contract table
     * @param contract
     * @return all contracts
     */
    public ResponseEntity<List<ContractViewModel>> searchForContract(ContractSearchViewModel contract) {
        return ResponseEntity.ok(searchContract(contract));
    }

    /**
     * Converts all existing products into a csv file
     * @param product
     * @return csv file
     */
    public ResponseEntity<String> downloadProductSearchCSV(ProductSearchViewModel product) {
        List<ProductViewModel> productViewModels = searchProduct(product);
        String productCSV = "CPN,Eqpt_Type,Plant,Make_or_Buy,BU,Portfolio,POC,New_Programs,In_Production,EOP,EOS,Replacement,Notes,Associated_Contracts\r\n";
        for(ProductViewModel productViewModel : productViewModels){
            productCSV += productViewModel.getCpn();
            productCSV += ",";
            productCSV += productViewModel.getEqpttype();
            productCSV += ",";
            productCSV += productViewModel.getPlant();
            productCSV += ",";
            productCSV += productViewModel.getMakeorbuy();
            productCSV += ",";
            productCSV += productViewModel.getBu();
            productCSV += ",";
            productCSV += productViewModel.getPortfolio();
            productCSV += ",";
            productCSV += productViewModel.getPoc();
            productCSV += ",";
            productCSV += productViewModel.getNewprograms();
            productCSV += ",";
            productCSV += productViewModel.getEop();
            productCSV += ",";
            productCSV += productViewModel.getEos();
            productCSV += ",";
            productCSV += productViewModel.getReplacement();
            productCSV += ",";
            productCSV += productViewModel.getNotes();
            productCSV += ",";
            int i = 0;
            if(productViewModel.getAssociatedContracts() != null) {
                for (String contract : productViewModel.getAssociatedContracts()) {
                    productCSV += contract;
                    if (i != productViewModel.getAssociatedContracts().size() - 2) {
                        productCSV += "|";
                    }
                    i++;
                }
            }
            productCSV += "\r\n";
        }
        return ResponseEntity.ok(productCSV);
    }

    /**
     * Converts all existing contracts into a csv file
     * @param contract
     * @return csv file
     */
    public ResponseEntity<String> downloadContractSearchCSV(ContractSearchViewModel contract) {
        List<ContractViewModel> contractViewModels = searchContract(contract);
        String contractCSV = "Contract Manager,Customer,Contract\r\n";
        for(ContractViewModel contractViewModel : contractViewModels){
            contractCSV += contractViewModel.getCm();
            contractCSV += ",";
            contractCSV += contractViewModel.getCustomer();
            contractCSV += ",";
            contractCSV += contractViewModel.getContract();
            contractCSV += ",";
            int i = 0;
            if(contractViewModel.getAssociatedProducts() != null) {
                for (String product : contractViewModel.getAssociatedProducts()) {
                    contractCSV += product;
                    if (i != contractViewModel.getAssociatedProducts().size() - 2) {
                        contractCSV += "|";
                    }
                    i++;
                }
            }
            contractCSV += "\r\n";
        }
        return ResponseEntity.ok(contractCSV);
    }

    /**
     * Searches for all products that match the search parameter
     * @param product
     * @return List of products
     */
    private List<ProductViewModel> searchProduct(ProductSearchViewModel product){

        String query = "";

        if (product.getCpn() != null) {
            if (product.getCpn().equals("")) {
                query += "CPN = ''";
            } else {
                query += "CPN LIKE '%" + product.getCpn() + "%' ";
            }
        }
        if (product.getEqpttype() != null) {
            if (!query.isEmpty()) {
                query += "AND ";
            }
            if (product.getEqpttype().equals("")) {
                query += "Eqpt_Type = ''";
            } else {
                query += "Eqpt_Type='" + product.getEqpttype() + "' ";
            }
        }
        if (product.getPlant() != null) {
            if (!query.isEmpty()) {
                query += "AND ";
            }
            if (product.getPlant().equals("")) {
                query += "Plant = ''";
            } else {
                query += "Plant=" + product.getPlant() + " ";
            }
        }
        if (product.getMakeorbuy() != null) {
            if (!query.isEmpty()) {
                query += "AND ";
            }
            if (product.getMakeorbuy().equals("")) {
                query += "Make_or_Buy = ''";
            } else {
                query += "Make_or_Buy='" + product.getMakeorbuy() + "' ";
            }
        }
        if (product.getBu() != null) {
            if (!query.isEmpty()) {
                query += "AND ";
            }
            if (product.getBu().equals("")) {
                query += "BU = ''";
            } else {
                query += "BU='" + product.getBu() + "' ";
            }
        }
        if (product.getPortfolio() != null) {
            if (!query.isEmpty()) {
                query += "AND ";
            }
            if (product.getPortfolio().equals("")) {
                query += "Portfolio = ''";
            } else {
                query += "Portfolio='" + product.getPortfolio() + "' ";
            }
        }
        if (product.getPoc() != null) {
            if (!query.isEmpty()) {
                query += "AND ";
            }
            if (product.getPoc().equals("")) {
                query += "POC = ''";
            }
            query += "POC LIKE '%" + product.getPoc() + "%' ";
        }
        if (product.getNewprograms() != null) {
            if (!query.isEmpty()) {
                query += "AND ";
            }
            if (product.getNewprograms().equals("")) {
                query += "New_Programs = ''";
            } else {
                query += "New_Programs='" + product.getNewprograms() + "' ";
            }
        }
        if (product.getEop() != null) {
            if (!query.isEmpty()) {
                query += "AND ";
            }
            if (product.getEop().equals("")) {
                query += "EOP = ''";
            } else {
                query += "EOP=" + product.getEop() + " ";
            }
        }
        if (product.getEos() != null) {
            if (!query.isEmpty()) {
                query += "AND ";
            }
            if (product.getEos().equals("")) {
                query += "EOS = ''";
            } else {
                query += "EOS LIKE '%" + product.getEos() + "%' ";
            }
        }
        if (product.getReplacement() != null) {
            if (!query.isEmpty()) {
                query += "AND ";
            }
            if (product.getReplacement().equals("")) {
                query += "Replacement = ''";
            } else {
                query += "Replacement LIKE '%" + product.getReplacement() + "%' ";
            }
        }
        if (product.getNotes() != null) {
            if (!query.isEmpty()) {
                query += "AND ";
            }
            if (product.getNotes().equals("")) {
                query += "Notes = ''";
            } else {
                query += "Notes LIKE '%" + product.getNotes() + "%' ";
            }
        }
        List<ProductViewModel> productViewModels = new ArrayList<>();
        if (query != "") {
            productViewModels = ProductConverter.listModelsToListViewModels(productRepositoryJDBC.searchProducts(query));
            if (!productViewModels.isEmpty()) {
                for (ProductViewModel productViewModel : productViewModels) {
                    productViewModel.setAssociatedContracts(contractDetailsRepository.findContractByCpnIgnoreCase(productViewModel.getCpn()));
                }
            }
        } else {
            productViewModels = ProductConverter.listModelsToListViewModels(StreamSupport.stream(productRepository.findAll().spliterator(), false).collect(Collectors.toList()));
            if (!productViewModels.isEmpty()) {
                for (ProductViewModel productViewModel : productViewModels) {
                    productViewModel.setAssociatedContracts(contractDetailsRepository.findContractByCpnIgnoreCase(productViewModel.getCpn()));
                }
            }
        }
        return productViewModels;
    }

    /**
     * Searches for all contracts that match the search parameter
     * @param contract
     * @return List of contracts
     */
    private List<ContractViewModel> searchContract(ContractSearchViewModel contract){

        String query = "";

        if (contract.getCm() != null)
        {
            if (contract.getCm().equals("")) {
                query += "CM = ''";
            } else {
                query += "CM LIKE '%" + contract.getCm() + "%' ";
            }
        }
        if(contract.getCustomer() != null)
        {
            if (!query.isEmpty()) {
                query += "AND ";
            }
            if (contract.getCustomer().equals("")) {
                query += "Customer = ''";
            } else {
                query += "Customer LIKE '%" + contract.getCustomer() + "%' ";
            }
        }
        if(contract.getContract() != null)
        {
            if (!query.isEmpty()) {
                query += "AND ";
            }
            if (contract.getContract().equals("")) {
                query += "Contract = ''";
            } else {
                query += "Contract LIKE '%" + contract.getContract() + "%' ";
            }
        }

        List<ContractViewModel> contractViewModels = new ArrayList<>();
        if(query != "")
        {
            contractViewModels = ContractConverter.listModelsToListViewModels(contractRepositoryJDBC.searchContracts(query));
            if (!contractViewModels.isEmpty()) {
                for (ContractViewModel contractViewModel : contractViewModels) {
                    contractViewModel.setAssociatedProducts(contractDetailsRepository.findCpnByContractIgnoreCase(contractViewModel.getContract()));
                }
            }
        }
        else
        {
            contractViewModels = ContractConverter.listModelsToListViewModels(StreamSupport.stream(contractRepository.findAll().spliterator(), false).collect(Collectors.toList()));
            if (!contractViewModels.isEmpty()) {
                for (ContractViewModel contractViewModel : contractViewModels) {
                    contractViewModel.setAssociatedProducts(contractDetailsRepository.findCpnByContractIgnoreCase(contractViewModel.getContract()));
                }
            }
        }
        return contractViewModels;

    }
}
