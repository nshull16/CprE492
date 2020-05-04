package com.cpre491.producttracker.repository;


import com.cpre491.producttracker.model.ContractDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Spring framework repository interface for Logs Controller.
 *
 */
@Repository
public interface ContractDetailsRepository extends CrudRepository<ContractDetails, Integer> {

    List<ContractDetails> findAll();

    @Query("SELECT contract FROM ContractDetails where lower(cpn) = lower(:cpnToCheck)")
    List<String> findContractByCpnIgnoreCase(@Param("cpnToCheck") String CPN);

    @Query("SELECT cpn FROM ContractDetails where lower(contract) = lower(:contractToCheck)")
    List<String> findCpnByContractIgnoreCase(@Param("contractToCheck") String contract);

    @Transactional
    Long deleteByCpnIgnoreCase(String CPN);

    @Transactional
    Long deleteByContractIgnoreCase(String Contract);
}