import React from 'react';
import "../CSS/DeleteContractModal.css"
import $ from 'jquery';

/**
 * Modal window that allows users to delete a contract.
 */
export default class DeleteContractModal extends React.Component
{
    closeDeleteContractModal = () =>
    {
        $('#deleteContractModal').css("display", "none");
        window.location.reload();
    }

    /**
     * Sends a POST request to backend services to delete a contract.
     */
    deleteContractFunction = () =>
    {
        var endP = "http://producttracker.ece.iastate.edu:8080/management/delete/contract?contract=" + $('#contractDelete')[0].value;
        $.ajax({url: endP, method: "POST"})
            .then(function (data) 
            {
                console.log("Success");
            })
            .catch(function (err) {
                console.log(err);
            });
        $('#deleteContractModal').css("display", "none");
        window.location.reload();
    }

    render()
    {
        return (
            <div id="deleteContractModal" className="deleteContractModal">
                <iframe title="hiddenFrame" name="hiddenFrame" className="hide"/>
                <div className="deleteContractModal-content">
                    <div className="deleteContractModal-header">
                        <span className="close" onClick={this.closeDeleteContractModal}>&times;</span>
                        <h2>Delete Contract</h2>
                    </div>
                    <div className="deleteContractModal-body" >
                            <div style={{float : 'left', paddingRight : '50px'}}>
                                <label htmlFor="contractDelete">Contract</label><br/>
                                <input id="contractDelete" name="contract" size="30" type="text" readOnly={true}/>
                            </div>
                            <br/>
                            <div style={{float : 'left'}}>
                                <input type="submit" value="Delete" onClick={this.deleteContractFunction}/>
                            </div>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </div>
                    <div className="modal-footer"/>
                </div>
            </div>
        );
    }
}