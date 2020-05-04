import React from 'react';
import $ from 'jquery';
import "../CSS/Buttons.css";

/**
 * Button that will open the admin login modal window or log out of admin if already logged in.
 */
export default class AdminViewButton extends React.Component 
{
    /**
     * Function that will open the admin login modal window or log out of admin if already logged in.
     */
    openAdminViewModal = () => 
    {
        $('#passNotCorrectText').text("");
        if(window.localStorage.getItem('isAdmin') === "true")
        {
            window.localStorage.setItem('isAdmin', "false");
            window.location.reload();
        }
        else
        {
            $('#adminViewModal').css("display", "block");
        }
    }
  
    render() 
    {
      return (
        <div id = "adminViewButtonContainer" className = "adminViewButtonContainer">
            <button id = "adminViewButton" className = "adminViewButton" onClick = {this.openAdminViewModal}>Switch to Admin View</button>
        </div>
        );
    }
}
