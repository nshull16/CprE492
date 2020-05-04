import React from 'react';
import "../CSS/AdminViewModal.css"
import $ from 'jquery';
import sha256 from 'crypto-js/sha256';


/**
 * A modal window where an admin can input thier password in-order to gain admin privileges.
 */
export default class AdminViewModal extends React.Component
{
    /**
     * Sets css to hidden on close.
     */
    closeAdminViewModal = () =>
    {
        $('#adminViewModal').css("display", "none");
    }

    /**
     * Checks if the password entered is correct using sha256 encryption
     */
    checkForRightPassword = () =>
    {
        var pass = $('#adminPassword').val();
        $('#adminPassword').val("");
        /** Encrypt given password. */
        const hashDigest = sha256(pass);
        /** Compare to our admin password. NOTE: This will need to be changed if you wish to change the password. A database would be much more secure. */
        if(hashDigest.toString() === "2081e642572065a0da3dc3b0d8333c18c2c1d316d017d5760ad1c3be1cf502ee")
        {
            window.localStorage.setItem('isAdmin', "true");
            window.location.reload();
        }
        else
        {
            $('#passNotCorrectText').text("Incorrect password, please try again.");
        }
    }

    render()
    {
        return (
            <div id="adminViewModal" className="modal">
                <iframe title="hiddenFrame" name="hiddenFrame" className="hide"/>
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={this.closeAdminViewModal}>&times;</span>
                        <h2>Please Enter Your Admin Password</h2>
                    </div>
                    <div className="modal-body" >
                        <div style={{float : 'left', paddingRight : '50px'}}>
                            <label htmlFor="adminPassword">Admin Password</label><br/>
                            <input type="password" id="adminPassword" name="adminPassword" size="30"/>
                            <button onClick={this.checkForRightPassword}>Submit</button>
                            <p id="passNotCorrectText" className="passNotCorrectText"/>
                        </div>
                      
                        <br/><br/>
                        <br/><br/>
                    </div>
                    <div className="modal-footer"/>
                </div>
            </div>
        );
    }
}