package com.cpre491.producttracker.repository;

import com.cpre491.producttracker.model.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductRepositoryJDBC {
    private static Logger LOGGER = LoggerFactory.getLogger(ProductRepositoryJDBC.class);

    private static Connection connect = null;

    public List<Product> searchProducts(String search) {
        try {
            setupConnection();
            Statement stmt = null;
            stmt = connect.createStatement();
            String sql = "SELECT * FROM products WHERE (" + search + ")";
            ResultSet resultSet = null;
            resultSet = stmt.executeQuery(sql);
            return convertResultSetToModelList(resultSet);
        } catch (SQLException e) {
            LOGGER.error(e.getMessage());
        }
        return new ArrayList<>();

    }

    public void globalEditProduct(String columnToEdit, String oldValue, String newValue) {
        try {
            setupConnection();
            Statement stmt = null;
            stmt = connect.createStatement();
            String sql = "UPDATE products SET " + columnToEdit + "= '" + newValue + "' WHERE " + columnToEdit + "= '" + oldValue + "'";
            stmt.executeUpdate(sql);
        } catch (SQLException e) {
            LOGGER.error(e.getMessage());
        }
    }

    private void setupConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            //Set up connection parameters
            String userName = "jkkruk";
            String password = "ProductTr@ck3r";
            String dbServer = "jdbc:mysql://producttracker.ece.iastate.edu:3306/product_tracker?serverTimezone=US/Central";
            //Set up connection
            connect = DriverManager.getConnection(dbServer, userName, password);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
    }

    private Product convertResultSetToModel(ResultSet resultSet) throws SQLException {
        Product product = new Product();
        product.setReplacement(resultSet.getString("Replacement"));
        product.setPortfolio(Product.Portfolio.valueOf(resultSet.getString("Portfolio")));
        product.setCPN(resultSet.getString("CPN"));
        product.setEqptType(resultSet.getString("Eqpt_Type"));
        product.setPlant(resultSet.getInt("Plant"));
        product.setMakeOrBuy(Product.MakeOrBuy.valueOf(resultSet.getString("Make_or_Buy")));
        product.setBU(Product.BU.valueOf(resultSet.getString("BU")));
        product.setPOC(resultSet.getString("POC"));
        product.setNewPrograms(Product.NewProgram.valueOf(resultSet.getString("New_Programs")));
        product.setEOP(resultSet.getDate("EOP"));
        product.setEOS(resultSet.getString("EOS"));
        product.setNotes(resultSet.getString("Notes"));
        return product;
    }

    private List<Product> convertResultSetToModelList(ResultSet resultSet) throws SQLException {
        List<Product> products = new ArrayList<>();
        while (resultSet.next()) {
            products.add(convertResultSetToModel(resultSet));
        }
        return products;
    }
}
