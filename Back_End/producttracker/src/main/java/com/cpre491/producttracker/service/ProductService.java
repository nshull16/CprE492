package com.cpre491.producttracker.service;

import com.cpre491.producttracker.repository.ProductRepository;
import com.cpre491.producttracker.util.ProductConverter;
import com.cpre491.producttracker.viewmodel.ProductViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;
    @Autowired
    ContractDetailsService contractDetailsService;

    /**
     * Gets all products in a product table
     * @return list of products
     */
    public List<ProductViewModel> getAll() {
        return ProductConverter.listModelsToListViewModels(StreamSupport.stream(productRepository.findAll().spliterator(), false).collect(Collectors.toList()));
    }
}
