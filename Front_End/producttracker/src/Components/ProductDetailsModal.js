import React from 'react';
import "../CSS/ProductDetailsModal.css"
import $ from 'jquery';

export default class ProductDetailsModal extends React.Component 
{
    closeProductDetailsModal = () => 
    {
        $('#productDetailsModal').css("display", "none");
    }

    render() 
    {
      return (
        <div id="productDetailsModal" className="productDetailsModal">
            <iframe title="hiddenFrame" name="hiddenFrame" className="hide"/>
            <div className="productDetailsModal-content">
                <div className="productDetailsModal-header">
                    <span className="close" onClick={this.closeProductDetailsModal}>&times;</span>
                    <h2>Product Details</h2>
                </div>
                <div className="productDetailsModal-body">
                    <div style={{float : 'left', paddingRight : '50px'}}>
                        <label htmlFor="cpn">CPN</label><br/>
                        <input readOnly id="productDetailsCpn" name="cpn" size="30" type="text" />
                    </div>

                    <div style={{float : 'left'}}>
                        <label htmlFor="bu">BU</label><br/>
                        <input readOnly id="productDetailsBu" name="bu" size="30" type="text" />
                    </div>

                    <div style={{float : 'left', paddingRight : '50px'}}>
                        <label htmlFor="plant">Plant</label><br/>
                        <input readOnly id="productDetailsPlant" name="plant" size="30" type="text" />
                    </div>

                    <div style={{float : 'left'}}>
                        <label htmlFor="portfolio">Portfolio</label><br/>
                        <input readOnly id="productDetailsPortfolio" name="portfolio" size="30" type="text" />
                    </div>

                    <br/><br/>

                    <div style={{float : 'left', paddingRight : '50px'}}>
                        <label htmlFor="eqpttype">Eqpt Type</label><br/>
                        <input readOnly id="productDetailsEqpttype" name="eqpttype" size="30" type="text" />
                    </div>

                    <div style={{float : 'left'}}>
                        <label htmlFor="eop">EOP</label><br/>
                        <input readOnly id="productDetailsEop" name="eop" size="30" type="text" />
                    </div>

                    <div style={{float : 'left', paddingRight : '50px'}}>
                        <label htmlFor="makeorbuy">Make/Buy</label><br/>
                        <input readOnly id="productDetailsMakeorbuy" name="makeorbuy" size="30" type="text" />
                    </div>

                    <div style={{float : 'left'}}>
                        <label htmlFor="replacement">Replacement</label><br/>
                        <input readOnly id="productDetailsReplacement" name="replacement" size="30" type="text" />
                    </div>

                    <div style={{float : 'left', paddingRight : '50px'}}>
                        <label htmlFor="poc">POC</label><br/>
                        <input readOnly id="productDetailsPoc" name="poc" size="30" type="text" />
                    </div>

                    <br/><br/>

                    <div style={{float : 'left', paddingRight : '50px'}}>
                        <label htmlFor="newprograms">New Programs</label><br/>
                        <input readOnly id="productDetailsNewprograms" name="newprograms" size="30" type="text" />
                    </div>

                    <div style={{float : 'left', paddingRight : '50px'}}>
                        <label htmlFor="notes">Notes</label><br/>
                        <input readOnly id="productDetailsNotes" name="notes" size="30" type="text" />
                    </div>
               
                    <br/><br/>

                    <div style={{float : 'left', paddingRight : '50px'}}>
                        <label htmlFor="eos">EOS</label><br/>
                        <input readOnly id="productDetailsEos" name="eos" size="30" type="text" />
                    </div>

                    <div style={{float : 'left', paddingRight : '50px'}}>
                        <input readOnly id="productDetailsId" name="id" size="30" type="hidden" value="-1" />
                    </div>

                    <div style={{float : 'left'}}>
                        <label htmlFor="associatedContracts">Associated Contracts</label><br/>
                        <div id="productDetailsAssociatedContracts" className="productDetailsAssociatedContracts"/>
                    </div>
                   
               <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    
            </div>
            <div className="modal-footer"/>
        </div>
        </div>
      );
    }
  }