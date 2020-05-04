import React from 'react';
import "../CSS/DeleteProductModal.css"
import $ from 'jquery';

/**
 * Modal window that allows users to delete a product.
 */
export default class DeleteProductModal extends React.Component
{
    closeDeleteProductModal = () =>
    {
        $('#deleteProductModal').css("display", "none");
        window.location.reload();
    }

    /**
     * Sends a POST request to backend services to delete a product.
     */
    deleteProductFunction = () =>
    {
        var endP = "http://producttracker.ece.iastate.edu:8080/management/delete/product?cpn=" + $('#productDelete')[0].value;
        $.ajax({url: endP, method: "POST"})
            .then(function (data) {
                console.log("Success");
            })
            .catch(function (err) {
                console.log(err);
            });
        $('#deleteProductModal').css("display", "none");
        window.location.reload();
    }

    render()
    {
        return (
            <div id="deleteProductModal" className="deleteProductModal">
                <iframe title="hiddenFrame" name="hiddenFrame" className="hide"/>
                <div className="deleteProductModal-content">
                    <div className="deleteProductModal-header">
                        <span className="close" onClick={this.closeDeleteProductModal}>&times;</span>
                        <h2>Delete Product</h2>
                    </div>
                    <div className="deleteProductModal-body" >
                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="productDelete">Product CPN</label><br/>
                            <input id="productDelete" name="cpn" size="30" type="text" readOnly={true}/>
                        </div>
                        <br/>
                        <div style={{float : 'left'}}>
                            <input type="submit" value="Delete" onClick={this.deleteProductFunction}/>
                        </div>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </div>
                    <div className="modal-footer"/>
                </div>
            </div>
        );
    }
}