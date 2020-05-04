import React from 'react';
import "../CSS/GlobalEditContractModal.css"
import $ from 'jquery';

/**
 * A modal window where Users can edit all rows that contain a certain column value in Contracts.
 */
export default class GlobalEditContractModal extends React.Component
{
    closeGlobalEditContractModal = () =>
    {
        $('#globalEditContractModal').css("display", "none");
        window.location.reload();
    }

    /**
     * Send POST request to backend services to edit all rows with certain column value.
     */
    globalEditFunction = () =>
    {
        var endP = "http://producttracker.ece.iastate.edu:8080/management/globalEdit/contract?columnToEdit=" + $('#columnToEdit')[0].value + "&oldValue=" + $('#oldContractEditValue')[0].value + "&newValue=" + $('#newContractEditValue')[0].value;
        $.ajax({url: endP, method: "POST"})
            .then(function (data) {
                console.log("Success");
            })
            .catch(function (err) {
                console.log(err);
            });
        $('#globalEditContractModal').css("display", "none");
        window.location.reload();
    }

    render()
    {
        return (
            <div id="globalEditContractModal" className="globalEditContractModal">
                <iframe title="hiddenFrame" name="hiddenFrame" className="hide"/>
                <div className="globalEditContractModal-content">
                    <div className="globalEditContractModal-header">
                        <span className="close" onClick={this.closeGlobalEditContractModal}>&times;</span>
                        <h2>Edit Contracts</h2>
                    </div>
                    <div className="globalEditContractModal-body" >

                            <div style={{float : 'left', paddingRight : '500px', paddingTop :'10px'}}>
                                <label htmlFor="columnToEdit">Column To Edit</label><br/>
                                <select id="columnToEdit" name="columnToEdit" type="text">
                                    <option value = "cm">Contract Manager</option>
                                    <option value = "customer">Customer</option>
                                </select>
                            </div>

                            <div style={{float : 'left', paddingTop :'10px'}}>
                                <label htmlFor="oldContractEditValue">Old Value</label><br/>
                                <input id="oldContractEditValue" name="oldContractEditValue" size="30" type="text"/>
                            </div>

                            <br/><br/>
                            
                            <div style={{float : 'left', paddingRight : '500px', paddingTop :'10px'}}>
                                <label htmlFor="newContractEditValue">New Value</label><br/>
                                <input id="newContractEditValue" name="newContractEditValue" size="30" type="text"/>
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