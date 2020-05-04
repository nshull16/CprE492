import React from 'react';
import $ from 'jquery';
import "../CSS/Buttons.css";

/**
 * Contains all the buttons that control the Product table.
 */
export default class ProductButtons extends React.Component 
{
    openAddProductModal = () => 
    {
      $('#addProductModal').css("display", "block");
    }

    openEditProductModal = () => 
    {
      $('#editProductModal').css("display", "block");
    }
    
    /**
     * Clears the current product filters and refreshes the page.
     */
    productClearFilters = () => 
    {
      for (let i = 0; i < 12; i++)
      {
        $('#s'+i).val('');
      }
      this.refreshPageWithSearchDetails();
    }

    /**
     * Clears the current product sorts and refreshes the page.
     */
    productClearSorts = () => 
    {
      this.refreshPageWithSearchDetails();
    }

    openGlobalEditProductModal = () => 
    {
      $('#globalEditProductModal').css("display", "block");
    }

    openDeleteProductModal = () => 
    {
      $('#deleteProductModal').css("display", "block");
    }

     /**
     * Pulls the values from search inputs and filters the table based on values.
     */
    refreshPageWithSearchDetails = () => 
    {
      var selections = [];
      /** Loop through inputs 0-11 and save their values to local storage. */
      for (let i = 0; i < 12; i++) 
      {
        var selection = $('#s'+i).val();
        selections.push(selection);
      }
      window.localStorage.setItem('productCpn', selections[0]);
      window.localStorage.setItem('productEqpttype', selections[1]);
      window.localStorage.setItem('productPlant', selections[2]);
      window.localStorage.setItem('productMakeorbuy', selections[3]);
      window.localStorage.setItem('productBu', selections[4]);
      window.localStorage.setItem('productPortfolio', selections[5]);
      window.localStorage.setItem('productPoc', selections[6]);
      window.localStorage.setItem('productNewprograms', selections[7]);
      window.localStorage.setItem('productEop', selections[8]);
      window.localStorage.setItem('productEos', selections[9]);
      window.localStorage.setItem('productReplacement', selections[10]);
      window.localStorage.setItem('productNotes', selections[11]);
      window.localStorage.setItem('productLimiter', $('#productPaginationLimiterSelect').val());
      window.localStorage.setItem('productPage', 1);
      window.location.reload();
    }
    
    render() 
    {
      return (
        <div id="productButtons" className="productButtons">
          <button id = "productRefreshButton" className = "productRefreshButton" onClick = {this.refreshPageWithSearchDetails}>REFRESH</button>
          <button id = "productClearFilters" className = "productClearFilters" onClick = {this.productClearFilters}>Clear Filters</button>
          <button id = "productClearSorts" className = "productClearSorts" onClick = {this.productClearSorts}>Clear Sorts</button>
          <button id = "addProductButton" className = "addProductButton" onClick = {this.openAddProductModal}>ADD</button>
          <button id = "globalEditProductButton" className = "globalEditProductButton" onClick={this.openGlobalEditProductModal}>Global Edit</button>
          <button id = "editProductButton" className = "editProductButton" onClick = {this.openEditProductModal}>Edit</button>
          <button id = "deleteProductButton" className = "deleteProductButton" onClick={this.openDeleteProductModal}>Delete</button>
        </div>
      );
    }
}