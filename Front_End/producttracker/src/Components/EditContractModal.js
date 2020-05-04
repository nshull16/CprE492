import React from 'react';
import "../CSS/EditContractModal.css"
import $ from 'jquery';

/**
 * A modal window that allows Users to edit the details of a selected Contract.
 */
export default class EditContractModal extends React.Component
{
    /** 
     * Hides the modal window and refreshes page on close. 
     */
    closeEditContractModal = () => 
    {
        $('#addContractModal').css("display", "none");
        window.location.reload();
    }

    /** 
     * Adds an associated product to the list of associated products.
     */
    addAssociatedProductEdit = () => 
    {
        /** Use length for indexing and unique ids. */
        let length = $('#associatedProductsEditList option').length;
        let value = $('#associatedProductsEditAdder').val();
        $('#associatedProductsEditList').append("<option id='associatedProductOptionEdit"+ length +"' >"+value+"</option>");
        /** Clear the input and add a hidden input field used for form submission. */
        $('#associatedProductsEditAdder').val('');
        $('#associatedProductsEditPlaceHolder').append("<input style='display: none;' id='associatedProduct' name='associatedProducts["+length+"]' value='"+ value +"'/>");
    }

    /** 
     * Removes an associated product from the list of associated products.
     */
    removeAssociatedProductEdit = () => 
    {
        /** Remove from list and remove the hidden input. */
        let num = $('#associatedProductsEditList option:selected').index();
        $('#associatedProductsEditList option:selected').remove();
        $('#associatedProductsEditPlaceHolder input').get(num).remove();
        /** Re-index our inputs after removal. */
        $('#associatedProductsEditPlaceHolder input').each(function(index,ele)
        {
            $(ele).attr('name', "associatedProducts["+index+"]");
        });
    }

    render()
    {
        return (
            <div id="editContractModal" className="editContractModal">
                <iframe title="hiddenFrame" name="hiddenFrame" className="hide"/>
                <div className="editContractModal-content">
                    <div className="editContractModal-header">
                        <span className="close" onClick={this.closeEditContractModal}>&times;</span>
                        <h2>Edit Contract</h2>
                    </div>
                    <div className="editContractModal-body" >
                        <form action="http://producttracker.ece.iastate.edu:8080/management/edit/contract" method="post" target="hiddenFrame">

                            <div style={{float : 'left', paddingRight : '50px'}}>
                                <label htmlFor="editContractContractMgr">Contract Manager</label><br/>
                                <input id="editContractContractMgr" name="cm" size="30" type="text" />
                            </div>

                            <div style={{float : 'left'}}>
                                <label htmlFor="editContractCustomer">Customer</label><br/>
                                <input id="editContractCustomer" name="customer" size="30" type="text" />
                            </div>

                            <br/><br/>

                            <div style={{float : 'left', paddingRight : '50px'}}>
                                <label htmlFor="editContractContract">Contract</label><br/>
                                <input id="editContractContract" name="contract" size="30" type="text" readOnly={true}/>
                            </div>

                            <div style={{float : 'left', paddingRight : '50px'}}>
                                <input id="editContractId" name="id" size="30" type="hidden" value="-1" />
                                <label htmlFor="associatedProductsEdit">Associated Products</label><br/>
                                <select id="associatedProductsEditList" style={{width: 243, height: 140}} multiple>
                                </select><br/>
                                <input id="associatedProductsEditAdder"/>
                                
                                <button type="button" id="addAssociatedProductEdit" onClick={this.addAssociatedProductEdit}>+</button>
                                <button type="button" id="removeAssociatedProductEdit" onClick={this.removeAssociatedProductEdit}>-</button><br/><br/>
                                <div id="associatedProductsEditPlaceHolder"/>
                            </div>

                            <div style={{position: "absolute", right: "5%", bottom: "10px", margin: "0 auto"}}>
                                <input type="submit" value="Edit Product" onClick={this.closeEditContractModal}/>
                            </div>
                            
                        </form>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </div>
                    <div className="modal-footer"/>
                </div>
            </div>
        );
    }
}