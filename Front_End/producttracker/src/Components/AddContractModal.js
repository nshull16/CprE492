import React from 'react';
import "../CSS/AddContractModal.css"
import $ from 'jquery';

/**
 * A modal window that creates a form with all applicable input fields to add a Contract. Contains form submission
 * and adding via CSV document upload. Also contains a template download link that is to be used when using the upload via CSV.
 */
export default class AddContractModal extends React.Component 
{
    /** 
     * Hides the modal window and refreshes page on close. 
     */
    closeAddContractModal = () => 
    {
        $('#addContractModal').css("display", "none");
        window.location.reload();
    }

    /** 
     * Adds an associated product to the list of associated products.
     */
    addAssociatedProduct = () => 
    {
        /** Use length for indexing and unique ids. */
        let length = $('#associatedProductsList option').length;
        let value = $('#associatedProductsAdder').val();
        $('#associatedProductsList').append("<option id='associatedProductOption"+ length +"' >"+value+"</option>");
        /** Clear the input and add a hidden input field used for form submission. */
        $('#associatedProductsAdder').val('');
        $('#associatedProductsPlaceHolder').append("<input style='display: none;' id='associatedProduct' name='associatedProducts["+length+"]' value='"+ value +"'/>");
    }

    /** 
     * Removes an associated product from the list of associated products.
     */
    removeAssociatedProduct = () => 
    {
        /** Remove from list and remove the hidden input. */
        let num = $('#associatedProductsList option:selected').index();
        $('#associatedProductsList option:selected').remove();
        $('#associatedProductsPlaceHolder input').get(num).remove();
        /** Re-index our inputs after removal. */
        $('#associatedProductsPlaceHolder input').each(function(index,ele){
            $(ele).attr('name', "associatedProducts["+index+"]");
         });
    }

    render() 
    {
      return (
        <div id="addContractModal" className="addContractModal">
            <iframe title="hiddenFrame" name="hiddenFrame" className="hide"/>
            <div className="addContractModal-content">
            <div className="addContractModal-header">
                <span className="close" onClick={this.closeAddContractModal}>&times;</span>
                <h2>Add Contract</h2>
            </div>
            <div className="addContractModal-body">
                <form action="http://producttracker.ece.iastate.edu:8080/management/form-upload/contract" method="post" target="hiddenFrame">

                    <div style={{float : 'left', paddingRight : '50px'}}>
                        <label htmlFor="contractMgr">Contract Mgr</label><br/>
                        <input id="contractMgr" name="cm" size="30" type="text" />
                    </div>

                    <div style={{float : 'left'}}>
                        <label htmlFor="customer">Customer</label><br/>
                        <input id="customer" name="customer" size="30" type="text" />
                    </div>

                    <br/><br/>

                    <div style={{float : 'left', paddingRight : '50px'}}>
                        <label htmlFor="contract">Contract</label><br/>
                        <input id="contract" name="contract" size="30" type="text" />
                    </div>

                    <div style={{float : 'left', paddingRight : '50px'}}>
                        <input id="addContractId" name="id" size="30" type="hidden" value="-1" />
                    </div>

                    <div style={{float : 'left'}}>
                        <label htmlFor="associatedProducts">Associated Products</label><br/>
                        <select id="associatedProductsList" style={{width: 243, height: 140}} multiple></select><br/>
                        <input id="associatedProductsAdder"/>
                        <button type="button" id="addAssociatedProduct" onClick={this.addAssociatedProduct}>+</button>
                        <button type="button" id="removeAssociatedProduct" onClick={this.removeAssociatedProduct}>-</button><br/><br/>
                        <div id="associatedProductsPlaceHolder"/>
                    </div>

                    <div style={{position: "absolute", right: "5%", bottom: "10px", margin: "0 auto"}}>
                        <input type="submit" value="Add Contract" onClick={this.closeAddContractModal}/>
                    </div>

                </form>

                <div style={{position: "absolute", left: "2%", bottom: "10px", margin: "0 auto", width: "400px"}}>
                    <form encType="multipart/form-data" action="http://producttracker.ece.iastate.edu:8080/management/excel-upload/contract" method="post" target="hiddenFrame">
                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <br/>
                            Upload Contracts via CSV Document
                            <input name="file" id="contractFile" type="file"/>
                        </div>
                        <div style={{float : 'left'}}>
                            <input class="uploadContractExcelButton" type="submit" value="Submit CSV Doc" onClick={this.closeAddContractModal}/>
                        </div>
                    </form>
                    <a href="Contract_Upload_Template.xlsx" download>
                        <div style={{float: 'left', paddingRight: '50px'}}>
                            <button type="button">Download Template</button>
                        </div>
                    </a>
                </div>
                
                <br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/>
                
            </div>
            <div className="modal-footer"/> 
        </div>
    </div>
    );}
}