package com.cpre491.producttracker.repository;


import com.cpre491.producttracker.model.Contract;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ContractRepository extends CrudRepository<Contract, Integer> {

    @Query(value = "SELECT * FROM contracts WHERE :search LIMIT :start, :limit", nativeQuery = true)
    Iterable<Contract> searchContracts(@Param("search") String search, @Param("start") Integer start, @Param("limit") Integer limit);

    @Query(value = "SELECT * FROM contracts", nativeQuery = true)
    Iterable<Contract> findAll();

    Contract findByContractIgnoreCase(String contract);

    @Transactional
    Long deleteByContractIgnoreCase(String Contract);

}