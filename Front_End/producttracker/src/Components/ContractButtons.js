import React from 'react';
import $ from 'jquery';
import "../CSS/Buttons.css";

/**
 * Contains all the buttons that control the Contract table.
 */
export default class ContractButtons extends React.Component 
{
    openAddContractModal = () => 
    {
      $('#addContractModal').css("display", "block");
    }

    openEditContractModal = () => 
    {
      $('#editContractModal').css("display", "block");
    }

    /**
     * Clears the current contract filters and refreshes the page.
     */
    contractClearFilters = () =>
    {
      for (let i = 12; i < 15; i++)
      {
        $('#s'+i).val('');
      }
      this.refreshPageWithSearchContractDetails();
    }

    /**
     * Clears the current contract sorts and refreshes the page.
     */
    contractClearSorts = () =>
    {
      this.refreshPageWithSearchContractDetails();
    }

    openGlobalEditContractModal = () =>
    {
        $('#globalEditContractModal').css("display", "block");
    }

    openDeleteContractModal = () =>
    {
        $('#deleteContractModal').css("display", "block");
    }

    /**
     * Pulls the values from search inputs and filters the table based on values.
     */
    refreshPageWithSearchContractDetails = () =>
    {
        var selections = [];
        /** Loop through inputs 12-14 and save their values to local storage. */
        for (let i = 12; i < 15; i++)
        {
            var selection = $('#s'+i).val();
            selections.push(selection);
        }
        window.localStorage.setItem('contractContract', selections[0]);
        window.localStorage.setItem('contractCustomer', selections[1]);
        window.localStorage.setItem('contractCm', selections[2]);
        window.localStorage.setItem('contractLimiter', $('#contractPaginationLimiterSelect').val());
        window.localStorage.setItem('contractPage', 1);

        window.location.reload();
    }

    render() 
    {
      return (
        <div id="contractButtons" className="contractButtons">
          <button id = "contractRefreshButton" className = "contractRefreshButton" onClick={this.refreshPageWithSearchContractDetails}>REFRESH</button>
          <button id = "contractClearFilters" className = "contractClearFilters" onClick = {this.contractClearFilters}>Clear Filters</button>
          <button id = "contractClearSorts" className = "contractClearSorts" onClick = {this.contractClearSorts}>Clear Sorts</button>
          <button id = "addContractButton" className = "addContractButton" onClick = {this.openAddContractModal}>ADD</button>
          <button id = "globalEditContractButton" className = "globalEditContractButton" onClick={this.openGlobalEditContractModal}>Global Edit</button>
          <button id = "editContractButton" className = "editContractButton" onClick = {this.openEditContractModal}>Edit</button>
          <button id = "deleteContractButton" className = "deleteContractButton" onClick = {this.openDeleteContractModal}>Delete</button>
        </div>
      );
    }
}