package com.cpre491.producttracker.util;

import com.cpre491.producttracker.model.Product;
import com.cpre491.producttracker.viewmodel.ProductViewModel;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class ProductConverter {

    /**
     * Converts product view model to product
     * @param productViewModel
     * @return Product
     */
    public static Product viewModelToModel(ProductViewModel productViewModel) {
        Product product = new Product();
        product.setBU(Product.BU.valueOf(productViewModel.getBu()));
        product.setCPN(productViewModel.getCpn());
        product.setEOP(Date.valueOf(productViewModel.getEop()));
        product.setEOS(productViewModel.getEos());
        product.setEqptType(productViewModel.getEqpttype());
        product.setMakeOrBuy(Product.MakeOrBuy.valueOf(productViewModel.getMakeorbuy()));
        product.setNewPrograms(Product.NewProgram.valueOf(productViewModel.getNewprograms()));
        product.setNotes(productViewModel.getNotes());
        product.setPlant(productViewModel.getPlant());
        product.setPOC(productViewModel.getPoc());
        product.setPortfolio(Product.Portfolio.valueOf(productViewModel.getPortfolio()));
        product.setReplacement(productViewModel.getReplacement());
        return product;
    }

    /**
     * Converts product view model list to product list
     * @param productViewModelList
     * @return Product list
     */
    public static List<Product> listViewModelsToListModels(List<ProductViewModel> productViewModelList) {
        List<Product> productList = new ArrayList<>();
        for (ProductViewModel productViewModel : productViewModelList) {
            productList.add(viewModelToModel(productViewModel));
        }
        return productList;
    }

    /**
     * Converts product to product view model
     * @param product
     * @return Product view model
     */
    public static ProductViewModel modelToViewModel(Product product) {
        ProductViewModel productViewModel = new ProductViewModel();
        productViewModel.setBu(product.getBU().name());
        productViewModel.setCpn(product.getCPN());
        productViewModel.setEop(product.getEOP().toString());
        productViewModel.setEos(product.getEOS());
        productViewModel.setEqpttype(product.getEqptType());
        productViewModel.setMakeorbuy(product.getMakeOrBuy().name());
        productViewModel.setNewprograms(product.getNewPrograms().name());
        productViewModel.setNotes(product.getNotes());
        productViewModel.setPlant(product.getPlant());
        productViewModel.setPoc(product.getPOC());
        productViewModel.setPortfolio(product.getPortfolio().name());
        productViewModel.setReplacement(product.getReplacement());
        return productViewModel;
    }

    /**
     * Converts product list to product view model list
     * @param productList
     * @return Product view model list
     */
    public static List<ProductViewModel> listModelsToListViewModels(List<Product> productList) {
        List<ProductViewModel> productViewModelList = new ArrayList<>();
        for (Product product : productList) {
            productViewModelList.add(modelToViewModel(product));
        }
        return productViewModelList;
    }
}
