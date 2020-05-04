import React from 'react';
import "../CSS/ContractDetailsModal.css"
import $ from 'jquery';

/**
 * A modal window that displays all the details of a selected contract.
 */
export default class ContractDetailsModal extends React.Component
{
    closeContractDetailsModal = () => 
    {
        $('#contractDetailsModal').css("display", "none");
    }

    render()
    {
        return (
            <div id="contractDetailsModal" className="contractDetailsModal">
                <iframe title="hiddenFrame" name="hiddenFrame" className="hide"/>
                <div className="contractDetailsModal-content">
                    <div className="contractDetailsModal-header">
                        <span className="close" onClick={this.closeContractDetailsModal}>&times;</span>
                        <h2>Contract Details</h2>
                    </div>
                    <div className="contractDetailsModal-body">
                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="cm">Contract Mgr</label><br/>
                            <input readOnly id="contractDetailsCm" name="cm" size="30" type="text" />
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="customer">Customer</label><br/>
                            <input readOnly id="contractDetailsCustomer" name="customer" size="30" type="text" />
                        </div>
                        <br/><br/>
                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="contract">Contract</label><br/>
                            <input readOnly id="contractDetailsContract" name="contract" size="30" type="text" />
                        </div>

                        <div style={{float : 'left'}}>
                            <label htmlFor="associatedProducts">Associated Products</label><br/>
                        <div id="contractDetailsAssociatedProducts" className="contractDetailsAssociatedProducts">
                        </div>
                    </div>

                        <br/><br/><br/><br/><br/>
                        <br/><br/><br/><br/><br/>
                        <br/><br/><br/>
                    
                    </div>
                    <div className="modal-footer"/>
                </div>
            </div>
        );
    }
}