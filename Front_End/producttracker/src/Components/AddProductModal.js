import React from 'react';
import "../CSS/AddProductModal.css"
import $ from 'jquery';

/**
 * A modal window that creates a form with all applicable input fields to add a Product. Contains form submission
 * and adding via CSV document upload. Also contains a template download link that is to be used when using the upload via CSV.
 */
export default class AddProductModal extends React.Component 
{
    /** 
     * Hides the modal window and refreshes page on close. 
     */
    closeAddProductModal = () => 
    {
        $('#addProductModal').css("display", "none");
        window.location.reload();
    }

    /** 
     * Adds an associated contract to the list of associated contracts.
     */
    addAssociatedContract = () => 
    {
        /** Use length for indexing and unique ids. */
        let length = $('#associatedContractsList option').length;
        let value = $('#associatedContractsAdder').val();
        $('#associatedContractsList').append("<option id='associatedContractOption"+ length +"' >"+value+"</option>");
        /** Clear the input and add a hidden input field used for form submission. */
        $('#associatedContractsAdder').val('');
        $('#associatedContractsPlaceHolder').append("<input style='display: none;' id='associatedContract' name='associatedContracts["+length+"]' value='"+ value +"'/>");
    }

    /** 
     * Removes an associated contract from the list of associated contracts.
     */
    removeAssociatedContract = () => 
    {
        /** Remove from list and remove the hidden input. */
        let num = $('#associatedContractsList option:selected').index();
        $('#associatedContractsList option:selected').remove();
        $('#associatedContractsPlaceHolder input').get(num).remove();
        /** Re-index our inputs after removal. */
        $('#associatedContractsPlaceHolder input').each(function(index,ele){
            $(ele).attr('name', "associatedContracts["+index+"]");
         });
    }

    render() 
    {
      return (
        <div id="addProductModal" className="addProductModal">
            <iframe title="hiddenFrame" name="hiddenFrame" className="hide"/>
            <div className="addProductModal-content">
                <div className="addProductModal-header">
                    <span className="close" onClick={this.closeAddProductModal}>&times;</span>
                    <h2>Add Product</h2>
                </div>
                <div className="addProductModal-body">
                    <form action="http://producttracker.ece.iastate.edu:8080/management/form-upload/product" method="post" target="hiddenFrame">

                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="cpn">CPN</label><br/>
                            <input id="cpn" name="cpn" size="30" type="text" />
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="plant">Plant</label><br/>
                            <input id="plant" name="plant" size="30" type="text" />
                        </div>

                        <br/><br/>

                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="eqpttype">Eqpt Type</label><br/>
                            <input id="eqpttype" name="eqpttype" size="30" type="text" />
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="makeorbuy">Make/Buy</label><br/>
                            <select id="makeorbuy" name="makeorbuy" style={{width: 243}} className="makeorbuy" type="text">
                                <option value = "Make">Make</option>
                                <option value = "Buy">Buy</option>
                            </select>
                        </div>

                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="poc">POC</label><br/>
                            <input id="poc" name="poc" size="30" type="text" />
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="bu">BU</label><br/>
                            <input id="bu" name="bu" size="30" type="text" />
                        </div>

                        <br/><br/>

                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="newprograms">New Programs</label><br/>
                            <select id="newprograms" name="newprograms" style={{width: 243}} className="newprograms" type="text">
                                <option value = "Yes">Yes</option>
                                <option value = "No">No</option>
                                <option value = "Ask">Ask</option>
                            </select>
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="portfolio">Portfolio</label><br/>
                            <input id="portfolio" name="portfolio" size="30" type="text" />
                        </div>

                        
                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="notes">Notes</label><br/>
                            <input id="notes" name="notes" size="30" type="text" />
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="eop">EOP</label><br/>
                            <input id="eop" name="eop" size="30" type="text" />
                        </div>

                        <br/><br/>

                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="eos">EOS</label><br/>
                            <input id="eos" name="eos" size="30" type="text" />
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="replacement">Replacement</label><br/>
                            <input id="replacement" name="replacement" size="30" type="text"/>
                        </div>

                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <input id="addProductId" name="id" size="30" type="hidden" value="-1" />
                            <label htmlFor="associatedContracts">Associated Contracts</label><br/>
                            <select id="associatedContractsList" style={{width: 243, height: 140}} multiple/><br/>
                            <input id="associatedContractsAdder"/>
                            <button type="button" id="addAssociatedContract" onClick={this.addAssociatedContract}>+</button>
                            <button type="button" id="removeAssociatedContract" onClick={this.removeAssociatedContract}>-</button><br/><br/>
                            <div id="associatedContractsPlaceHolder"/>
                        </div>
                        <div style={{position: "absolute", right: "5%", bottom: "10px", margin: "0 auto"}}>
                            <input type="submit" value="Add Product" onClick={this.closeAddProductModal}/>
                        </div>

                    </form>
                    
                    <form encType="multipart/form-data" action="http://producttracker.ece.iastate.edu:8080/management/excel-upload/product" method="post" target="hiddenFrame">
                        <div style={{float : 'right', paddingRight : '50px'}}>
                            Upload Products via CSV Document
                            <input name="file" id="productFile" type="file"/>
                        </div>
                        <div style={{float : 'left'}}>
                            <input class="uploadProductExcelButton" type="submit" value="Submit CSV Doc" onClick={this.closeAddProductModal}/>
                        </div>
                    </form>
                    <a href="Product_Upload_Template.xlsx" download>
                        <div style={{float: 'left', paddingRight: '50px'}}>
                            <button type="button">Download Template</button>
                        </div>
                    </a>
                    
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            <div className="modal-footer"/>
        </div>
    </div>
    );}
}