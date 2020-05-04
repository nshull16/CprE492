package com.cpre491.producttracker.controller;

import com.cpre491.producttracker.service.ProductService;
import com.cpre491.producttracker.viewmodel.ProductViewModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@Controller
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    private final Logger logger = LoggerFactory.getLogger(ProductController.class);

    /**
     * Returns all products in the product table
     *
     * @return list of products
     */
    @CrossOrigin
    @GetMapping("/getAll")
    public ResponseEntity<List<ProductViewModel>> getAll() {
        return ResponseEntity.ok(productService.getAll());
    }


}
