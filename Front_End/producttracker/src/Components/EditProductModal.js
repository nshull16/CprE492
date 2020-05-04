import React from 'react';
import "../CSS/EditProductModal.css"
import $ from 'jquery';

/**
 * A modal window that allows Users to edit the details of a selected Product.
 */
export default class EditProductModal extends React.Component 
{
    /** 
     * Hides the modal window and refreshes page on close. 
     */
    closeEditProductModal = () => 
    {
        $('#editProductModal').css("display", "none");
        window.location.reload();
    }

    /** 
     * Adds an associated contract to the list of associated contracts.
     */
    addAssociatedContractEdit = () => 
    {
        let length = $('#associatedContractsEditList option').length;
        let value = $('#associatedContractsEditAdder').val();
        $('#associatedContractsEditList').append("<option id='associatedContractEditOption"+ length +"' >"+value+"</option>");
        $('#associatedContractsEditAdder').val('');
        $('#associatedContractsEditPlaceHolder').append("<input style='display: none;' id='associatedContractEdit' name='associatedContracts["+length+"]' value='"+ value +"'/>");
    }

    /** 
     * Removes an associated contract from the list of associated contracts.
     */
    removeAssociatedContractEdit = () => 
    {
        /** Remove from list and remove the hidden input. */
        let num = $('#associatedContractsEditList option:selected').index();
        $('#associatedContractsEditList option:selected').remove();
        $('#associatedContractsEditPlaceHolder input').get(num).remove();
        /** Re-index our inputs after removal. */
        $('#associatedContractsEditPlaceHolder input').each(function(index,ele){
            $(ele).attr('name', "associatedContracts["+index+"]");
         });
      }

    render() 
    {
      return (
        <div id="editProductModal" className="editProductModal">
            <iframe title="hiddenFrame" name="hiddenFrame" className="hide"/>
            <div className="editProductModal-content">
                <div className="editProductModal-header">
                    <span className="close" onClick={this.closeEditProductModal}>&times;</span>
                    <h2>Edit Product</h2>
                </div>
                <div className="editProductModal-body" >
                    <form id="editProductForm" action="http://producttracker.ece.iastate.edu:8080/management/edit/product" method="post" target="hiddenFrame">

                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="editProductCpn">CPN</label><br/>
                            <input id="editProductCpn" name="cpn" size="30" type="text" readOnly={true}/>
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="editProductPlant">Plant</label><br/>
                            <input id="editProductPlant" name="plant" size="30" type="text" />
                        </div>

                        <br/><br/>

                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="editProductEqpttype">Eqpt Type</label><br/>
                            <input id="editProductEqpttype" name="eqpttype" size="30" type="text" />
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="editProductMakeorbuy">Make/Buy</label><br/>
                            <select id="editProductMakeorbuy" name="makeorbuy" className="editProductMakeorbuy" type="text">
                                <option value = "Make">Make</option>
                                <option value = "Buy">Buy</option>
                            </select>
                        </div>
                        
                        <br/><br/>

                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="editProductPoc">POC</label><br/>
                            <input id="editProductPoc" name="poc" size="30" type="text" />
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="editProductBu">BU</label><br/>
                            <input id="editProductBu" name="bu" size="30" type="text" />
                        </div>

                        <br/><br/>

                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="editProductNewprograms">New Programs</label><br/>
                            <select id="editProductNewprograms" name="newprograms" className="editProductNewprograms" type="text">
                                <option value = "Yes">Yes</option>
                                <option value = "No">No</option>
                                <option value = "Ask">Ask</option>
                            </select>
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="editProductPortfolio">Portfolio</label><br/>
                            <input id="editProductPortfolio" name="portfolio" size="30" type="text" />
                        </div>

                        <br/><br/>
                        
                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="editProductNotes">Notes</label><br/>
                            <input id="editProductNotes" name="notes" size="30" type="text" />
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="editProductEop">EOP</label><br/>
                            <input id="editProductEop" name="eop" size="30" type="text" />
                        </div>

                        <br/><br/>

                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="editProductEos">EOS</label><br/>
                            <input id="editProductEos" name="eos" size="30" type="text" />
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="editProductReplacement">Replacement</label><br/>
                            <input id="editProductReplacement" name="replacement" size="30" type="text" />
                        </div>

                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <input id="editProductid" name="id" size="30" type="hidden" value="-1" />
                        </div>

                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="associatedContractsEdit">Associated Contracts</label><br/>
                            <select id="associatedContractsEditList" style={{width: 243, height: 140}} multiple>
                            </select><br/>
                            <input id="associatedContractsEditAdder"/>
                            <button type="button" id="addAssociatedContractEdit" onClick={this.addAssociatedContractEdit}>+</button>
                            <button type="button" id="removeAssociatedContractEdit" onClick={this.removeAssociatedContractEdit}>-</button><br/><br/>
                            <div id="associatedContractsEditPlaceHolder"></div>
                        </div>

                        <div style={{position: "absolute", right: "5%", bottom: "10px", margin: "0 auto"}}>
                            <input type="submit" value="Edit Product" onClick={this.closeEditProductModal}/>
                        </div>

                    </form>

               <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
              
            </div>
            <div className="modal-footer"/>
        </div>
        </div>
      );
    }
  }