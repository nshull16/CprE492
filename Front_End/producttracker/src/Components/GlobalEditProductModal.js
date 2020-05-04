import React from 'react';
import "../CSS/GlobalEditProductModal.css"
import $ from 'jquery';

/**
 * A modal window where Users can edit all rows that contain a certain column value in Products.
 */
export default class GlobalEditProductModal extends React.Component
{
    closeGlobalEditProductModal = () =>
    {
        $('#globalEditProductModal').css("display", "none");
        window.location.reload();
    }

    /**
     * Send POST request to backend services to edit all rows with certain column value.
     */
    globalEditFunction = () =>
    {
        var endP = "http://producttracker.ece.iastate.edu:8080/management/globalEdit/product?columnToEdit=" + $('#columnToEditProduct')[0].value + "&oldValue=" + $('#oldProductEditValue')[0].value + "&newValue=" + $('#newProductEditValue')[0].value;
        $.ajax({url: endP, method: "POST"})
            .then(function (data) {
                console.log("Success");
            })
            .catch(function (err) {
                console.log(err);
            });
        $('#globalEditProductModal').css("display", "none");
        window.location.reload();
    }

    render()
    {
        return (
            <div id="globalEditProductModal" className="globalEditProductModal">
                <iframe title="hiddenFrame" name="hiddenFrame" className="hide"/>
                <div className="globalEditProductModal-content">
                    <div className="globalEditProductModal-header">
                        <span className="close" onClick={this.closeGlobalEditProductModal}>&times;</span>
                        <h2>Edit Products</h2>
                    </div>
                    <div className="globalEditProductModal-body" >

                        <div style={{float : 'left', paddingRight : '500px', paddingTop :'10px'}}>
                            <label htmlFor="columnToEditProduct">Column To Edit</label><br/>
                            <select id="columnToEditProduct" name="columnToEditProduct" type="text">
                                <option value = "plant">Plant</option>
                                <option value = "eqqttype">EqptType</option>
                                <option value = "makeorbuy">Make/Buy</option>
                                <option value = "poc">POC</option>
                                <option value = "bu">BU</option>
                                <option value = "newprograms">New Programs</option>
                                <option value = "portfolio">Portfolio</option>
                                <option value = "notes">Notes</option>
                                <option value = "eop">EOP</option>
                                <option value = "eos">EOS</option>
                                <option value = "replacement">Replacement</option>
                            </select>
                        </div>

                        <div style={{float : 'left', paddingTop : '10px'}}>
                            <label htmlFor="oldProductEditValue">Old Value</label><br/>
                            <input id="oldProductEditValue" name="oldProductEditValue" size="30" type="text" />
                        </div>

                        <br/><br/>

                        <div style={{float : 'left', paddingRight : '500px', paddingTop :'10px'}}>
                            <label htmlFor="newProductEditValue">New Value</label><br/>
                            <input id="newProductEditValue" name="newProductEditValue" size="30" type="text"/>
                        </div>

                        <div style={{float : 'left', paddingTop: '10px'}}>
                            <input type="submit" value="Submit" onClick={this.globalEditFunction}/>
                        </div>

                        <br/><br/><br/><br/><br/><br/><br/><br/><br/>

                    </div>
                    <div className="modal-footer"/>
                </div>
            </div>
        );
    }
}