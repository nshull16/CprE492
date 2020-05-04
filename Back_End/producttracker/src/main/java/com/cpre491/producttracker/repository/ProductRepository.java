package com.cpre491.producttracker.repository;


import com.cpre491.producttracker.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * Spring framework repository interface for Logs Controller.
 *
 * @author jkkruk
 */
@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {

    @Query(value = "SELECT * FROM products WHERE :search", nativeQuery = true)
    Iterable<Product> findBySearchInput(@Param("search") String search);

    @Query(value = "SELECT * FROM products", nativeQuery = true)
    Iterable<Product> findAll();

    Product findByCpnIgnoreCase(String CPN);

    @Transactional
    Long deleteByCpnIgnoreCase(String CPN);

}