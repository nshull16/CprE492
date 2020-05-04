package com.cpre491.producttracker.model;

import com.sun.istack.NotNull;
import org.springframework.core.style.ToStringCreator;

import javax.persistence.*;

/**
 * JavaBean model object representing a contract details entry.
 *
 */
@Entity
@Table(name = "contract_details")
public class ContractDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "Contract")
    @NotNull
    private String contract;

    @Column(name = "CPN")
    private String cpn;

    /**
     * Returns the id value of contract details object
     *
     * @return id
     */
    public int getId() {
        return id;
    }

    /**
     * Returns the CPN value of contract details object
     *
     * @return cpn
     */
    public String getCPN() {
        return cpn;
    }

    /**
     * Sets the CPN value of a contract details object
     *
     * @param logId
     */
    public void setCPN(String cpn) {
        this.cpn = cpn;
    }

    /**
     * Returns the Contract of a contract details object
     *
     * @return contract
     */
    public String getContract() {
        return contract;
    }

    /**
     * Sets the Eqpt_Type value of a contract details object
     *
     * @param id
     */
    public void setContract(String contract) {
        this.contract = contract;
    }


    /**
     * Overrides toString
     *
     * @return String of contract details object
     */
    @Override
    public String toString() {
        return new ToStringCreator(this)

                .append("CPN", this.getCPN())
                .append("Contract", this.getContract()).toString();

    }
}
