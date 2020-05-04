package com.cpre491.producttracker.model;

import com.sun.istack.NotNull;
import org.springframework.core.style.ToStringCreator;

import javax.persistence.*;

/**
 * JavaBean model object representing a contract entry.
 *
 */
@Entity
@Table(name = "contracts")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "CM")
    @NotNull
    private String cm;

    @Column(name = "Customer")
    private String customer;

    @Column(name = "Contract")
    @NotNull
    private String contract;

    /**
     * Returns the id value of contract object
     *
     * @return id
     */
    public int getId() {
        return id;
    }

    /**
     * Returns the CM value of contract object
     *
     * @return cm
     */
    public String getCM() {
        return cm;
    }

    /**
     * Sets the CM value of a contract object
     *
     * @param cm
     */
    public void setCM(String cm) {
        this.cm = cm;
    }

    /**
     * Returns the Customer of a contract object
     *
     * @return customer
     */
    public String getCustomer() {
        return customer;
    }

    /**
     * Sets the Customer value of a contract object
     *
     * @param customer
     */
    public void setCustomer(String customer) {
        this.customer = customer;
    }

    /**
     * Returns the Contract of a contract object
     *
     * @return contract
     */
    public String getContract() {
        return contract;
    }

    /**
     * Sets the Plant value of a contract object
     *
     * @param plant
     */
    public void setContract(String contract) {
        this.contract = contract;
    }

    /**
     * Overrides toString
     *
     * @return String of contract object
     */
    @Override
    public String toString() {
        return new ToStringCreator(this)

                .append("CM", this.getCM())
                .append("Customer", this.getCustomer())
                .append("Contract", this.getContract()).toString();

    }
}
