package com.cpre491.producttracker.controller;

import com.cpre491.producttracker.service.ContractService;
import com.cpre491.producttracker.viewmodel.ContractViewModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@Controller
@RequestMapping("/contract")
public class ContractController {

    @Autowired
    private ContractService contractService;

    private final Logger logger = LoggerFactory.getLogger(ContractController.class);

    /**
     * Returns all contracts in the contract table
     *
     * @return list of contracts
     */
    @GetMapping("/getAll")
    public ResponseEntity<List<ContractViewModel>> getAll() {
        return ResponseEntity.ok(contractService.getAll());
    }

}
