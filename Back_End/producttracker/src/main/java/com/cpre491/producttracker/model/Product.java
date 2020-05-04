package com.cpre491.producttracker.model;

import com.sun.istack.NotNull;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.core.style.ToStringCreator;

import javax.persistence.*;
import java.sql.Date;

/**
 * JavaBean model object representing a product entry.
 *
 */
@Entity
@Table(name = "products")
public class Product {
    public enum BU {Avionics, MsnSys}

    public enum Portfolio {ComAv, B_RA, MA_H, CNG, Subc}

    public enum MakeOrBuy {Make, Buy}

    public enum NewProgram {Yes, No, Ask}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "CPN")
    @NotNull
    private String cpn;

    @Column(name = "Eqpt_Type")
    @NotFound(action = NotFoundAction.IGNORE)
    private String eqpttype;

    @Column(name = "Plant")
    @NotNull
    private int plant;

    @Column(name = "Make_or_Buy")
    @NotNull
    @Enumerated(EnumType.STRING)
    private MakeOrBuy makeorbuy;

    @Column(name = "BU")
    @NotNull
    @Enumerated(EnumType.STRING)
    private BU bu;

    @Column(name = "Portfolio")
    @NotNull
    @Enumerated(EnumType.STRING)
    private Portfolio portfolio;

    @Column(name = "POC")
    @NotNull
    private String poc;

    @Column(name = "New_Programs")
    @NotNull
    @Enumerated(EnumType.STRING)
    private NewProgram newprograms;

    @Column(name = "EOP")
    @NotNull
    private Date eop;

    @Column(name = "EOS")
    private String eos;

    @Column(name = "Replacement")
    private String replacement;

    @Column(name = "Notes")
    private String notes;


    /**
     * Returns the id value of product object
     *
     * @return id
     */
    public int getId() {
        return id;
    }

    /**
     * Returns the CPN value of product object
     *
     * @return cpn
     */
    public String getCPN() {
        return cpn;
    }

    /**
     * Sets the CPN value of a product object
     *
     * @param logId
     */
    public void setCPN(String cpn) {
        this.cpn = cpn;
    }

    /**
     * Returns the Eqpt_Type of a product object
     *
     * @return eqpt_type
     */
    public String getEqptType() {
        return eqpttype;
    }

    /**
     * Sets the Eqpt_Type value of a product object
     *
     * @param id
     */
    public void setEqptType(String eqpttype) {
        this.eqpttype = eqpttype;
    }

    /**
     * Returns the Plant of a product object
     *
     * @return plant
     */
    public Integer getPlant() {
        return plant;
    }

    /**
     * Sets the Plant value of a product object
     *
     * @param plant
     */
    public void setPlant(int plant) {
        this.plant = plant;
    }

    /**
     * Returns the MakeOrBuy of a product object
     *
     * @return make_or_buy
     */
    public MakeOrBuy getMakeOrBuy() {
        return makeorbuy;
    }

    /**
     * Sets the MakeOrBuy value of a product object
     *
     * @param make_or_buy
     */
    public void setMakeOrBuy(MakeOrBuy makeorbuy) {
        this.makeorbuy = makeorbuy;
    }

    /**
     * Returns the BU of a product object
     *
     * @return bu
     */
    public BU getBU() {
        return bu;
    }

    /**
     * Sets the BU value of a product object
     *
     * @param bu
     */
    public void setBU(BU bu) {
        this.bu = bu;
    }

    /**
     * Returns the Portfolio of a product object
     *
     * @return portfolio
     */
    public Portfolio getPortfolio() {
        return portfolio;
    }

    /**
     * Sets the Portfolio value of a product object
     *
     * @param portfolio
     */
    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    /**
     * Returns the POC of a product object
     *
     * @return poc
     */
    public String getPOC() {
        return poc;
    }

    /**
     * Sets the POC value of a product object
     *
     * @param poc
     */
    public void setPOC(String poc) {
        this.poc = poc;
    }

    /**
     * Returns the New_Programs of a product object
     *
     * @return newprograms
     */
    public NewProgram getNewPrograms() {
        return newprograms;
    }

    /**
     * Sets the New_Programs value of a product object
     *
     * @param newprograms
     */
    public void setNewPrograms(NewProgram newprograms) {
        this.newprograms = newprograms;
    }

    /**
     * Returns the EOP of a product object
     *
     * @return eop
     */
    public Date getEOP() {
        return eop;
    }

    /**
     * Sets the EOP value of a product object
     *
     * @param eop
     */
    public void setEOP(Date eop) {
        this.eop = eop;
    }

    /**
     * Returns the EOS of a product object
     *
     * @return eos
     */
    public String getEOS() {
        return eos;
    }

    /**
     * Sets the EOS value of a product object
     *
     * @param eos
     */
    public void setEOS(String eos) {
        this.eos = eos;
    }

    /**
     * Returns the Replacement of a product object
     *
     * @return replacement
     */
    public String getReplacement() {
        return replacement;
    }

    /**
     * Sets the Replacement value of a product object
     *
     * @param replacement
     */
    public void setReplacement(String replacement) {
        this.replacement = replacement;
    }

    /**
     * Returns the Notes of a product object
     *
     * @return notes
     */
    public String getNotes() {
        return notes;
    }

    /**
     * Sets the Notes value of a product object
     *
     * @param notes
     */
    public void setNotes(String notes) {
        this.notes = notes;
    }

    /**
     * Overrides toString
     *
     * @return String of product object
     */
    @Override
    public String toString() {
        return new ToStringCreator(this)

                .append("CPN", this.getCPN())
                .append("Eqpt_Type", this.getEqptType())
                .append("Plant", this.getPlant())
                .append("Make_or_Buy", this.getMakeOrBuy())
                .append("BU", this.getBU())
                .append("Portfolio", this.getPortfolio())
                .append("POC", this.getPOC())
                .append("New_Programs", this.getNewPrograms())
                .append("EOP", this.getEOP())
                .append("EOS", this.getEOS())
                .append("Replacement", this.getReplacement())
                .append("Notes", this.getNotes()).toString();

    }
}
