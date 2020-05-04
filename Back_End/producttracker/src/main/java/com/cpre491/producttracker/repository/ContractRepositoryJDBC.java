package com.cpre491.producttracker.repository;

import com.cpre491.producttracker.model.Contract;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


@Repository
public class ContractRepositoryJDBC {
    private static Logger LOGGER = LoggerFactory.getLogger(ContractRepositoryJDBC.class);

    private static Connection connect = null;

    public List<Contract> searchContracts(String search) {
        try {
            setupConnection();
            Statement stmt = null;
            stmt = connect.createStatement();
            String sql = "SELECT * FROM contracts WHERE (" + search + ")";
            ResultSet resultSet = null;
            resultSet = stmt.executeQuery(sql);
            return convertResultSetToModelList(resultSet);
        } catch (SQLException e) {
            LOGGER.error(e.getMessage());
        }
        return new ArrayList<>();

    }

    public void globalEditContract(String columnToEdit, String oldValue, String newValue) {
        try {
            setupConnection();
            Statement stmt = null;
            stmt = connect.createStatement();
            String sql = "UPDATE contracts SET " + columnToEdit + "= '" + newValue + "' WHERE " + columnToEdit + "= '" + oldValue + "'";
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

    private Contract convertResultSetToModel(ResultSet resultSet) throws SQLException {
        Contract contract = new Contract();
        contract.setCM(resultSet.getString("CM"));
        contract.setContract(resultSet.getString("Contract"));
        contract.setCustomer(resultSet.getString("Customer"));
        return contract;
    }

    private List<Contract> convertResultSetToModelList(ResultSet resultSet) throws SQLException {
        List<Contract> products = new ArrayList<>();
        while (resultSet.next()) {
            products.add(convertResultSetToModel(resultSet));
        }
        return products;
    }
}
