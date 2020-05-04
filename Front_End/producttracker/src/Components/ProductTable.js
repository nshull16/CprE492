import React from 'react';
import '../CSS/Table.css';
import $ from 'jquery';
import { CSVLink } from "react-csv";


var makeOrBuys = ["Make", "Buy"];
var newPrograms = ["Yes", "No", "Ask"];

var rowData = [];
var pageNumber = 1;
var allData = [];
var csvData = [];
var selections = [];
var csv;

/**
 * A table that displays products based on users filters and sorts. Each row is selectable. After selection users can edit or delete that row.
 * Products are also displayed as a link. When clicking this link you will be shown the details of that product.
 */
export default class ProductTable extends React.Component
{
    /**
     * Refreshes the page, now only showing the number of rows selected.
     */
    refreshPageWithNewPageLimiter = () =>
    {
        window.localStorage.setItem('productLimiter', $('#productPaginationLimiterSelect').val());
        window.localStorage.setItem('productPage', 1);
        window.location.reload();
    }

    /**
     * Goes to the next page of products.
     */
    goToProductNext = () =>
    {
        pageNumber = parseInt(window.localStorage.getItem('productPage'));
        if(pageNumber < Math.ceil(window.localStorage.getItem('productSearchResultsTotal') / window.localStorage.getItem('productLimiter')))
        {
            window.localStorage.setItem('productPage', pageNumber + 1);
            window.location.reload();
        }
    }

    /**
     * Goes to the previous page of products.
     */
    goToProductPrev = () =>
    {
        pageNumber = parseInt(window.localStorage.getItem('productPage')) - 1;
        if(pageNumber > 0)
        {
            window.localStorage.setItem('productPage', pageNumber);
            window.location.reload();
        }
    }

    /**
     * Goes to the first page of products.
     */
    goToProductFirst = () =>
    {
        pageNumber = 1;
        window.localStorage.setItem('productPage', pageNumber);
        window.location.reload();
    }

    /**
     * Goes to the last page of products.
     */
    goToProductLast = () =>
    {
        /** Last page is found by dividing total by the users limiter, then using the cieling of that value. */
        pageNumber = Math.ceil(window.localStorage.getItem('productSearchResultsTotal') / window.localStorage.getItem('productLimiter'));
        window.localStorage.setItem('productPage', pageNumber);
        window.location.reload();
    }

    /**
     * Adds select attributes to each row. What is selected is decided by a background-color value.
     */
    addActiveAttributeToAllRows = () =>
    {
        $('#ProductTable tr').each(function(i, row)
        {
            /** First row is our headers. */
            if(i !== 0)
            {
                /** Add on click function. */
                $(row).click(function()
                {
                    if($(row).css("background-color") === "rgb(255, 0, 0)")
                    {
                        $('#editProductButton').prop('disabled', true);
                        $('#editProductButton').css('background-color', '#cacaca');
                        $('#deleteProductButton').prop('disabled', true);
                        $('#deleteProductButton').css('background-color', '#cacaca');
                        $(row).css('background-color', 'rgb(0, 0, 0)');
                        /** We have to set the correct color back to the row, since colors differ every other row. */
                        if(i % 2 !== 0)
                        {
                          $(row).children().css({ 'background-color': '#dadada', 'color': '#332c28' }).find("a").css({ 'color': 'blue' });
                        }
                        else
                        {
                          $(row).children().css({ 'background-color': '#cecece', 'color': '#332c28' }).find("a").css({ 'color': 'blue' });
                        }
                    }
                    /** The row selected wasn't already selected. */
                    else
                    {
                      /** De-select any other rows that were selected. */
                      $('#ProductTable tr').each(function(i, row)
                      {
                          if($(row).css("background-color") === "rgb(255, 0, 0)")
                          {
                              $(row).css('background-color', 'rgb(0, 0, 0)');
                              if(i % 2 !== 0)
                              {
                                $(row).children().css({ 'background-color': '#dadada', 'color': '#332c28' }).find("a").css({ 'color': 'blue' });
                              }
                              else
                              {
                                $(row).children().css({ 'background-color': '#cecece', 'color': '#332c28' }).find("a").css({ 'color': 'blue' });
                              }
                          }
                      });
                        var $tds = $(row).find("td");
                        $.each($tds, function()
                        {
                          rowData.push($(this).text());
                        });
                        /** Allow for edit and delete if Admin. */
                        $('#editProductButton').prop('disabled', false);
                        $('#editProductButton').css('background-color', '#d7451a');
                        $('#deleteProductButton').prop('disabled', false);
                        $('#deleteProductButton').css('background-color', '#d7451a');
                        /** Populate the details/edit/detail modal values. */
                        $('#editProductCpn').val(rowData[0]);
                        $('#editProductEqpttype').val(rowData[1]);
                        $('#editProductPlant').val(rowData[2]);
                        $('#editProductMakeorbuy').val(rowData[3]);
                        $('#editProductBu').val(rowData[4]);
                        $('#editProductPortfolio').val(rowData[5]);
                        $('#editProductPoc').val(rowData[6]);
                        $('#editProductNewprograms').val(rowData[7]);
                        $('#editProductEop').val(rowData[8]);
                        $('#editProductEos').val(rowData[9]);
                        $('#editProductReplacement').val(rowData[10]);
                        $('#editProductNotes').val(rowData[11]);
                        $('#productDetailsCpn').val(rowData[0]);
                        $('#productDetailsEqpttype').val(rowData[1]);
                        $('#productDetailsPlant').val(rowData[2]);
                        $('#productDetailsMakeorbuy').val(rowData[3]);
                        $('#productDetailsBu').val(rowData[4]);
                        $('#productDetailsPortfolio').val(rowData[5]);
                        $('#productDetailsPoc').val(rowData[6]);
                        $('#productDetailsNewprograms').val(rowData[7]);
                        $('#productDetailsEop').val(rowData[8]);
                        $('#productDetailsEos').val(rowData[9]);
                        $('#productDetailsReplacement').val(rowData[10]);
                        $('#productDetailsNotes').val(rowData[11]);
                        $('#productDelete').val(rowData[0]);var items = [];
                        $('#associatedContractsEditList').empty();
                        /** Update the associated contracts lists and add the function that allows linking between contracts and products. */
                        $.each(rowData[12].split(','), function(key, val)
                        {
                          let length = $('#associatedContractsEditList option').length;
                          $('#associatedContractsEditList').append("<option id='associatedContractEditOption"+ length +"' >"+val+"</option>");
                          $('#associatedContractsEditPlaceHolder').append("<input style='display: none;' id='associatedContractEdit' name='associatedContracts["+length+"]' value='"+ val +"'/>");
                          items.push("<a href='#'  id = 'associatedContract-" + key + "'  onclick=\"$(window.localStorage.setItem('tab', '1'), window.localStorage.setItem('contractContract', '" + val + "'), "
                          +"window.localStorage.setItem('contractCustomer', ''), "
                          +"window.localStorage.setItem('contractPage', 1), "
                          +"window.localStorage.setItem('contractContractCm', ''), window.location.reload())\">" + val + "</a>");
                        });
                        $('#productDetailsAssociatedContracts').empty();
                        $('#productDetailsAssociatedContracts').append(items.join(""));
                        rowData = [];
                        $(row).css('background-color', 'rgb(255, 0, 0)');
                        $(row).children().css({ 'background-color': '#332c28', 'color': 'white' }).find("a").css({ 'color': '#8fffee' });
                    }
                });
            }
        });
    }
    
    /**
     * Parses the JSON data returned from search, seperates it into rows and populates a table.
     * @param data
     */
    populateTable = (data) =>
    {
       /** Empty out the table. */
        $('#ProductTable tbody').empty();
        /** Determine what rows should be displayed by multiplying our page number by our row limiter. In-case of null values default page to 1 and row limiter to 50. */
        let limiter = (parseInt(window.localStorage.getItem('productPage') === null ? 1 : window.localStorage.getItem('productPage')) - 1) * parseInt((window.localStorage.getItem('productLimiter') === null ? 50 : (window.localStorage.getItem('productLimiter'))));
        for(let index = 0; index < data.length; index++)
        {
            /** Only display the rows governed by our limiter and page number. */
            if(index >= limiter && index < limiter + parseInt(window.localStorage.getItem('productLimiter') === null ? 50 : (window.localStorage.getItem('productLimiter'))))
            {
                $('#ProductTable tbody').append("<tr id='pr" + index + "' >" +
                    "<td><a href=\"#\" onclick=\"$('#productDetailsModal').css('display', 'block');\">" + JSON.parse(data[index]).cpn + "</a></td>" +
                    "<td>" + JSON.parse(data[index]).eqpttype + "</td>" +
                    "<td>" + JSON.parse(data[index]).plant + "</td>" +
                    "<td>" + JSON.parse(data[index]).makeorbuy + "</td>" +
                    "<td>" + JSON.parse(data[index]).bu + "</td>" +
                    "<td>" + JSON.parse(data[index]).portfolio + "</td>" +
                    "<td>" + JSON.parse(data[index]).poc + "</td>" +
                    "<td>" + JSON.parse(data[index]).newprograms + "</td>" +
                    "<td>" + JSON.parse(data[index]).eop + "</td>" +
                    "<td>" + JSON.parse(data[index]).eos + "</td>" +
                    "<td>" + JSON.parse(data[index]).replacement + "</td>" +
                    "<td>" + JSON.parse(data[index]).notes + "</td>" +
                    "<td style='display: none'>"+ JSON.parse(data[index]).associatedContracts +"</td>"+
                    "</tr>");
            }
            /** Add in the other rows as hidden. This is neccessary, so that we may sort all the results, not just the results displayed. */
            else
            {
                $('#ProductTable tbody').append("<tr id='pr" + index + "' style='display: none;'>" +
                    "<td><a href=\"#\" onclick=\"$('#productDetailsModal').css('display', 'block');\">" + JSON.parse(data[index]).cpn + "</a></td>" +
                    "<td>" + JSON.parse(data[index]).eqpttype + "</td>" +
                    "<td>" + JSON.parse(data[index]).plant + "</td>" +
                    "<td>" + JSON.parse(data[index]).makeorbuy + "</td>" +
                    "<td>" + JSON.parse(data[index]).bu + "</td>" +
                    "<td>" + JSON.parse(data[index]).portfolio + "</td>" +
                    "<td>" + JSON.parse(data[index]).poc + "</td>" +
                    "<td>" + JSON.parse(data[index]).newprograms + "</td>" +
                    "<td>" + JSON.parse(data[index]).eop + "</td>" +
                    "<td>" + JSON.parse(data[index]).eos + "</td>" +
                    "<td>" + JSON.parse(data[index]).replacement + "</td>" +
                    "<td>" + JSON.parse(data[index]).notes + "</td>" +
                    "<td style='display: none'>"+ JSON.parse(data[index]).associatedContracts +"</td>"+
                    "</tr>");
            }
        }
        /** Hide loading spinner. */
        $('#loadingModal').css('display', 'none');
    }

    /**
     * Sorts list of row data by column. Key is the column to compare. n is used for id's to find and alter attributes in html.
     * @param key
     * @param n
     */
    sortProductTable = (key, n) =>
    {
      /** Show loading spinner. */
      $('#loadingModal').css('display', 'block');
      /** Remove sort arrow image. */
      $('#sortArrow').remove();
      /** Sort array of row data. */
      var sortedData = this.sortResults(key, n);
      window.localStorage.setItem('productSearchResults', JSON.stringify(sortedData));
      /** Re-display table. */
      this.populateTable(JSON.parse(window.localStorage.getItem('productSearchResults')));
      this.addActiveAttributeToAllRows();
    }

    /**
     * Compare all values in row array and return an ascending or descending sorted array.
     * @param key
     * @param n
     * @return
     */
    sortResults = (key, n) =>
    {
        allData = JSON.parse(window.localStorage.getItem('productSearchResults'));
        /** Pull the current sort attribute from column. */
        var way = $('#c' + n).attr('sort');
        /** Set to opposite value and display sort arrow image. */
        if(way === 'asc')
        {
            $('#c' + n).attr('sort', 'desc');
            $('#c'+n).append('<img id="sortArrow" src="Descending.png" alt="Descending" height="10" width="10"/>');
        }
        else
        {
            $('#c' + n).attr('sort', 'asc');
            $('#c'+n).append('<img id="sortArrow" src="Ascending.png" alt="Ascending" height="10" width="10"/>');
        }
        /** Basic sort function that sorts based on given column. */
        return allData.sort(function(a, b)
        {
            a = JSON.parse(a);
            b = JSON.parse(b);
            var x = a[key];
            var y = b[key];
            if(way === 'asc')
            {
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }
            else
            {
              return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
        });
    }

    componentDidMount()
    {
        /** Used for determining if everything is fully loaded or not. */
        const self = this;

        /** Once page is loaded pull values from local storage. In scenarios where null, use default values. */
        $("document").ready(function()
        {
            $('#productPaginationLimiterSelect').val((window.localStorage.getItem('productLimiter') === null ? 50 : (window.localStorage.getItem('productLimiter'))));
            $('#productCurrentPage').val((window.localStorage.getItem('productPage') === null ? 1 : (window.localStorage.getItem('productPage'))));
            $('#loadingModal').css('display', 'block');
            /** Start document off by disabling edit/delete. These get re-enabled if user is admin.*/
            $('#editProductButton').prop('disabled', true);
            $('#editProductButton').css('background-color', '#cacaca');
            $('#deleteProductButton').prop('disabled', true);
            $('#deleteProductButton').css('background-color', '#cacaca');
            /** POST request to backend services, send our search results as JSON data pulled from local storage. If these are null send defaults. */
            $.ajax(
            {
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                url: "http://producttracker.ece.iastate.edu:8080/search/product",
                data: JSON.stringify(
                {
                    "id": null,
                    "cpn": (window.localStorage.getItem('productCpn') === "" ? null : (window.localStorage.getItem('productCpn'))),
                    "eqpttype": (window.localStorage.getItem('productEqpttype') === "" ? null : (window.localStorage.getItem('productEqpttype'))),
                    "plant": (window.localStorage.getItem('productPlant') === "" ? null : (window.localStorage.getItem('productPlant'))),
                    "makeorbuy": (window.localStorage.getItem('productMakeorbuy') === "" ? null : (window.localStorage.getItem('productMakeorbuy'))),
                    "bu": (window.localStorage.getItem('productBu') === "" ? null : (window.localStorage.getItem('productBu'))),
                    "portfolio": (window.localStorage.getItem('productPortfolio') === "" ? null : (window.localStorage.getItem('productPortfolio'))),
                    "poc": (window.localStorage.getItem('productPoc') === "" ? null : (window.localStorage.getItem('productPoc'))),
                    "newprograms": (window.localStorage.getItem('productNewprograms') === "" ? null : (window.localStorage.getItem('productNewprograms'))),
                    "eop": (window.localStorage.getItem('productEop') === "" ? null : (window.localStorage.getItem('productEop'))),
                    "eos": (window.localStorage.getItem('productEos') === "" ? null : (window.localStorage.getItem('productEos'))),
                    "replacement": (window.localStorage.getItem('productReplacement') === "" ? null : (window.localStorage.getItem('productReplacement'))),
                    "notes": (window.localStorage.getItem('productNotes') === "" ? null : (window.localStorage.getItem('productNotes'))),
                }),
                 /** Upon successful POST, take returned data and store it into 2 arrays. One is used for table population, the other for creating CSV data. */
                success: function(data)
                {
                    $.each(data, function(key, product)
                    {
                      /** Put multiple rows of CSV data when a contract contains more than one associate product. */
                        if(product.associatedContracts == null || product.associatedContracts.length == 0) 
                        {
                            let tempProduct = 
                            {
                                cpn: "",
                                eqpttype: "",
                                plant: "",
                                makeorbuy: "",
                                bu: "",
                                portfolio: "",
                                poc: "",
                                newprograms: "",
                                eop: "",
                                eos: "",
                                replacement: "",
                                notes: "",
                                associatedContracts: ""
                            };
                            tempProduct.cpn = product.cpn;
                            tempProduct.eqpttype = product.eqpttype;
                            tempProduct.plant = product.plant;
                            tempProduct.makeorbuy = product.makeorbuy;
                            tempProduct.bu = product.bu;
                            tempProduct.portfolio = product.portfolio;
                            tempProduct.poc = product.poc;
                            tempProduct.newprograms = product.newprograms;
                            tempProduct.eop = product.eop;
                            tempProduct.eos = product.eos;
                            tempProduct.replacement = product.replacement;
                            tempProduct.notes = product.notes;
                            csvData.push(tempProduct);
                        }
                        else
                        {
                            let i = 0;
                            for(; i < product.associatedContracts.length; i++) 
                            {
                                let tempProduct = 
                                {
                                    cpn: "",
                                    eqpttype: "",
                                    plant: "",
                                    makeorbuy: "",
                                    bu: "",
                                    portfolio: "",
                                    poc: "",
                                    newprograms: "",
                                    eop: "",
                                    eos: "",
                                    replacement: "",
                                    notes: "",
                                    associatedContracts: ""
                                };
                                tempProduct.cpn = product.cpn;
                                tempProduct.eqpttype = product.eqpttype;
                                tempProduct.plant = product.plant;
                                tempProduct.makeorbuy = product.makeorbuy;
                                tempProduct.bu = product.bu;
                                tempProduct.portfolio = product.portfolio;
                                tempProduct.poc = product.poc;
                                tempProduct.newprograms = product.newprograms;
                                tempProduct.eop = product.eop;
                                tempProduct.eos = product.eos;
                                tempProduct.replacement = product.replacement;
                                tempProduct.notes = product.notes;
                                tempProduct.associatedContracts = product.associatedContracts[i];
                                csvData.push(tempProduct);
                            }
                        }

                        allData.push(JSON.stringify(product));
                    });
                    /** Plugin that parses JSON into CSV data. */
                    const { Parser } = require('json2csv');
                    let fields = ["cpn", "eqpttype", "plant", "makeorbuy", "bu", "portfolio", "poc", "newprograms", "eop", "eos", "replacement", "notes", "associatedContracts"];
                    const parser = new Parser(
                    {
                      fields,
                      unwind: ["cpn", "eqpttype", "plant", "makeorbuy", "bu", "portfolio", "poc", "newprograms", "eop", "eos", "replacement", "notes", "associatedContracts"]
                    });
                    csv = parser.parse(csvData);
                    window.localStorage.setItem('productSearchResultsCSV', csv);
                    /** This is the data that our state will wait for to load. */
                    self.setState({ data: csv });

                    window.localStorage.setItem('productSearchResults', JSON.stringify(allData));
                    window.localStorage.setItem('productSearchResultsTotal', allData.length);

                    /**
                     * Populates contract table from given array of contract rows.
                     * @param {*} data 
                     */
                    function populateTable(data)
                    {
                        /** Empty out the table. */
                        $('#ProductTable tbody').empty();
                         /** Determine what rows should be displayed by multiplying our page number by our row limiter. In-case of null values default page to 1 and row limiter to 50. */
                        let limiter = (parseInt(window.localStorage.getItem('productPage') === null ? 1 : window.localStorage.getItem('productPage')) - 1) * parseInt((window.localStorage.getItem('productLimiter') === null ? 50 : (window.localStorage.getItem('productLimiter'))));
                        for(let index = 0; index < data.length; index++)
                        {
                            /** Only display the rows governed by our limiter and page number. */
                            if(index >= limiter && index < limiter + parseInt(window.localStorage.getItem('productLimiter') === null ? 50 : (window.localStorage.getItem('productLimiter'))))
                            {
                                $('#ProductTable tbody').append("<tr id='pr" + index + "' >" +
                                    "<td><a href=\"#\" onclick=\"$('#productDetailsModal').css('display', 'block');\">" + JSON.parse(data[index]).cpn + "</a></td>" +
                                    "<td>" + JSON.parse(data[index]).eqpttype + "</td>" +
                                    "<td>" + JSON.parse(data[index]).plant + "</td>" +
                                    "<td>" + JSON.parse(data[index]).makeorbuy + "</td>" +
                                    "<td>" + JSON.parse(data[index]).bu + "</td>" +
                                    "<td>" + JSON.parse(data[index]).portfolio + "</td>" +
                                    "<td>" + JSON.parse(data[index]).poc + "</td>" +
                                    "<td>" + JSON.parse(data[index]).newprograms + "</td>" +
                                    "<td>" + JSON.parse(data[index]).eop + "</td>" +
                                    "<td>" + JSON.parse(data[index]).eos + "</td>" +
                                    "<td>" + JSON.parse(data[index]).replacement + "</td>" +
                                    "<td>" + JSON.parse(data[index]).notes + "</td>" +
                                    "<td style='display: none'>"+ JSON.parse(data[index]).associatedContracts +"</td>"+
                                    "</tr>");
                            }
                            /** Add in the other rows as hidden. This is neccessary, so that we may sort all the results, not just the results displayed. */
                            else
                            {
                                $('#ProductTable tbody').append("<tr id='pr" + index + "' style='display: none;'>" +
                                    "<td><a href=\"#\" onclick=\"$('#productDetailsModal').css('display', 'block');\">" + JSON.parse(data[index]).cpn + "</a></td>" +
                                    "<td>" + JSON.parse(data[index]).eqpttype + "</td>" +
                                    "<td>" + JSON.parse(data[index]).plant + "</td>" +
                                    "<td>" + JSON.parse(data[index]).makeorbuy + "</td>" +
                                    "<td>" + JSON.parse(data[index]).bu + "</td>" +
                                    "<td>" + JSON.parse(data[index]).portfolio + "</td>" +
                                    "<td>" + JSON.parse(data[index]).poc + "</td>" +
                                    "<td>" + JSON.parse(data[index]).newprograms + "</td>" +
                                    "<td>" + JSON.parse(data[index]).eop + "</td>" +
                                    "<td>" + JSON.parse(data[index]).eos + "</td>" +
                                    "<td>" + JSON.parse(data[index]).replacement + "</td>" +
                                    "<td>" + JSON.parse(data[index]).notes + "</td>" +
                                    "<td style='display: none'>"+ JSON.parse(data[index]).associatedContracts +"</td>"+
                                    "</tr>");
                            }
                        }
                        /** Hide loading spinner. */
                        $('#loadingModal').css('display', 'none');
                    }

                    /**
                     * Fills in the options for select dropdowns.
                     * @param {*} array 
                     * @param {*} id 
                     */
                    function fillOptions(array, id)
                    {
                        for(var i = 0; i < array.length; i++)
                        {
                          $('#' + id).append("<option>" + array[i].replace(/^"(.*)"$/, '$1') + "</option>");
                        }
                    }

                    /**
                     * Checks if a row is already selected and removes the select attributes from that row.
                     */
                    function checkForAlreadySelectedProduct()
                    {
                        $('#ProductTable tr').each(function(i, row)
                        {
                            if($(row).css("background-color") === "rgb(255, 0, 0)")
                            {
                                $(row).css('background-color', 'rgb(0, 0, 0)');
                                if(i % 2 !== 0)
                                {
                                  $(row).children().css({ 'background-color': '#dadada', 'color': '#332c28' }).find("a").css({ 'color': 'blue' });
                                }
                                else
                                {
                                  $(row).children().css({ 'background-color': '#cecece', 'color': '#332c28' }).find("a").css({ 'color': 'blue' });
                                }
                            }
                        });
                    }

                    /**
                     * Adds select attributes to each row. What is selected is decided by a background-color value.
                     */
                    function addActiveAttributeToAllRows()
                    {
                        $('#ProductTable tr').each(function(i, row)
                        {
                            /** First row is our headers. */
                            if(i !== 0)
                            {
                                /** Add on click function. */
                                $(row).click(function()
                                {
                                    /** If we click an already selected row, we can des-select it. */
                                    if($(row).css("background-color") === "rgb(255, 0, 0)")
                                    {
                                        $('#editProductButton').prop('disabled', true);
                                        $('#editProductButton').css('background-color', '#cacaca');
                                        $('#deleteProductButton').prop('disabled', true);
                                        $('#deleteProductButton').css('background-color', '#cacaca');
                                        $(row).css('background-color', 'rgb(0, 0, 0)');
                                        /** We have to set the correct color back to the row, since colors differ every other row. */
                                        if(i % 2 !== 0)
                                        {
                                          $(row).children().css({ 'background-color': '#dadada', 'color': '#332c28' }).find("a").css({ 'color': 'blue' });
                                        }
                                        else
                                        {
                                          $(row).children().css({ 'background-color': '#cecece', 'color': '#332c28' }).find("a").css({ 'color': 'blue' });
                                        }
                                    }
                                    /** The row selected wasn't already selected. */
                                    else
                                    {
                                        /** De-select any other rows that were selected. */
                                        checkForAlreadySelectedProduct();
                                        var $tds = $(row).find("td");
                                        $.each($tds, function()
                                        {
                                          rowData.push($(this).text());
                                        });
                                        /** Allow for edit and delete if Admin. */
                                        $('#editProductButton').prop('disabled', false);
                                        $('#editProductButton').css('background-color', '#d7451a');
                                        $('#deleteProductButton').prop('disabled', false);
                                        $('#deleteProductButton').css('background-color', '#d7451a');
                                        /** Populate the details/edit/detail modal values. */
                                        $('#editProductCpn').val(rowData[0]);
                                        $('#editProductEqpttype').val(rowData[1]);
                                        $('#editProductPlant').val(rowData[2]);
                                        $('#editProductMakeorbuy').val(rowData[3]);
                                        $('#editProductBu').val(rowData[4]);
                                        $('#editProductPortfolio').val(rowData[5]);
                                        $('#editProductPoc').val(rowData[6]);
                                        $('#editProductNewprograms').val(rowData[7]);
                                        $('#editProductEop').val(rowData[8]);
                                        $('#editProductEos').val(rowData[9]);
                                        $('#editProductReplacement').val(rowData[10]);
                                        $('#editProductNotes').val(rowData[11]);
                                        $('#productDetailsCpn').val(rowData[0]);
                                        $('#productDetailsEqpttype').val(rowData[1]);
                                        $('#productDetailsPlant').val(rowData[2]);
                                        $('#productDetailsMakeorbuy').val(rowData[3]);
                                        $('#productDetailsBu').val(rowData[4]);
                                        $('#productDetailsPortfolio').val(rowData[5]);
                                        $('#productDetailsPoc').val(rowData[6]);
                                        $('#productDetailsNewprograms').val(rowData[7]);
                                        $('#productDetailsEop').val(rowData[8]);
                                        $('#productDetailsEos').val(rowData[9]);
                                        $('#productDetailsReplacement').val(rowData[10]);
                                        $('#productDetailsNotes').val(rowData[11]);
                                        $('#productDelete').val(rowData[0]);
                                        /** Update the associated contracts lists and add the function that allows linking between contracts and products. */
                                        var items = [];
                                        $('#associatedContractsEditList').empty();
                                        $.each(rowData[12].split(','), function(key, val)
                                        {
                                          let length = $('#associatedContractsEditList option').length;
                                          $('#associatedContractsEditList').append("<option id='associatedContractEditOption"+ length +"' >"+val+"</option>");
                                          $('#associatedContractsEditPlaceHolder').append("<input style='display: none;' id='associatedContractEdit' name='associatedContracts["+length+"]' value='"+ val +"'/>");
                                          items.push("<a href='#'  id = 'associatedContract-" + key + "'  onclick=\"$(window.localStorage.setItem('tab', '1'), window.localStorage.setItem('contractContract', '" + val + "'), "
                                          +"window.localStorage.setItem('contractCustomer', ''), "
                                          +"window.localStorage.setItem('contractPage', 1), "
                                          +"window.localStorage.setItem('contractContractCm', ''), window.location.reload())\">" + val + "</a>");
                                        });
                                        $('#productDetailsAssociatedContracts').empty();
                                        $('#productDetailsAssociatedContracts').append(items.join(""));
                                        rowData = [];
                                        $(row).css('background-color', 'rgb(255, 0, 0)');
                                        $(row).children().css({ 'background-color': '#332c28', 'color': 'white' }).find("a").css({ 'color': '#8fffee' });
                                    }
                                });
                            }
                        });
                    }

                    /**
                     * Pulls the values from search inputs and filters the table based on values.
                     */
                    function refreshPageWithSearchDetails()
                    {
                        selections = [];
                        for(let i = 0; i < 12; i++)
                        {
                            var selection = $('#s' + i).val();
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

                    populateTable(JSON.parse(window.localStorage.getItem('productSearchResults')));
                    addActiveAttributeToAllRows();
                    fillOptions(makeOrBuys, "s3");
                    fillOptions(newPrograms, "s7");

                     /** Show total results. */
                    $('#productPaginationLimiterSelect').after(" Found " + window.localStorage.getItem('productSearchResultsTotal') + " results");

                    $('#s0').val((window.localStorage.getItem('productCpn') === "" ? null : (window.localStorage.getItem('productCpn'))));
                    $('#s1').val((window.localStorage.getItem('productEqpttype') === "" ? null : (window.localStorage.getItem('productEqpttype'))));
                    $('#s2').val((window.localStorage.getItem('productPlant') === "" ? null : (window.localStorage.getItem('productPlant'))));
                    $('#s3').val((window.localStorage.getItem('productMakeorbuy') === "" ? null : (window.localStorage.getItem('productMakeorbuy'))));
                    $('#s4').val((window.localStorage.getItem('productBu') === "" ? null : (window.localStorage.getItem('productBu'))));
                    $('#s5').val((window.localStorage.getItem('productPortfolio') === "" ? null : (window.localStorage.getItem('productPortfolio'))));
                    $('#s6').val((window.localStorage.getItem('productPoc') === "" ? null : (window.localStorage.getItem('productPoc'))));
                    $('#s7').val((window.localStorage.getItem('productNewprograms') === "" ? null : (window.localStorage.getItem('productNewprograms'))));
                    $('#s8').val((window.localStorage.getItem('productEop') === "" ? null : (window.localStorage.getItem('productEop'))));
                    $('#s9').val((window.localStorage.getItem('productEos') === "" ? null : (window.localStorage.getItem('productEos'))));
                    $('#s10').val((window.localStorage.getItem('productReplacement') === "" ? null : (window.localStorage.getItem('productReplacement'))));
                    $('#s11').val((window.localStorage.getItem('productNotes') === "" ? null : (window.localStorage.getItem('productNotes'))));

                    /** Bind the enter key to trigger words. */
                    $('#productCurrentPage').bind("enterKeyPage", function(e)
                    {
                        pageNumber = parseInt($('#productCurrentPage').val());
                        if(pageNumber > 0)
                        {
                          window.localStorage.setItem('productPage', pageNumber);
                          window.location.reload();
                        }
                    });

                    $('#productCurrentPage').keyup(function(e)
                    {
                        if(e.keyCode == 13)
                        {
                            $(this).trigger("enterKeyPage");
                        }
                    });
                    /** Add functions to each filter that allows pressing enter to search. */
                    for(let i = 0; i < 12; i++)
                    {
                        $('#s' + i).bind("enterKey", function(e)
                        {
                            refreshPageWithSearchDetails();
                        });

                        $('#s' + i).keyup(function(e)
                        {
                            if(e.keyCode == 13)
                            {
                                $(this).trigger("enterKey");
                            }
                        });
                    }
                }
            });
        });
    }

    render()
    {
      return (
        <div className="ProductTableDiv">
          <table id = "ProductTable" className="ProductTable">
            <thead> 
              <tr id = "headers" className = "headers">
                <th id = "c0" sort = 'asc' onClick = {() => this.sortProductTable("cpn",0)}>
                  CPN<br/>
                  <input id = "s0" onClick="event.stopPropagation();"></input>
                  <br/>
                  </th>
                <th id = "c1" sort = 'asc' onClick = {() => this.sortProductTable("eqpttype",1)}>
                  Eqpt Type<br/>
                  <input id = "s1" onClick="event.stopPropagation();"></input>
                  <br/>
                  </th>
                <th id = "c2" sort = 'asc' onClick = {() => this.sortProductTable("plant",2)}>
                  Plant<br/>
                  <input id = "s2" onClick="event.stopPropagation();"></input>
                  <br/>
                  </th>
                <th id = "c3" sort = 'asc' onClick = {() => this.sortProductTable("makeorbuy",3)}>
                  Make/Buy<br/>
                  <select id = "s3" onClick="event.stopPropagation();">
                    <option></option>
                  </select><br/>
                  </th>
                <th id = "c4" sort = 'asc' onClick = {() => this.sortProductTable("bu",4)}>
                  BU<br/>
                  <input id = "s4" onClick="event.stopPropagation();">
                    
                  </input>
                  <br/>
                  </th>
                <th id = "c5" sort = 'asc' onClick = {() => this.sortProductTable("portfolio",5)}>
                  Portfolio<br/>
                  <input id = "s5" onClick="event.stopPropagation();">
                    
                  </input>
                  <br/>
                  </th>
                <th id = "c6" sort = 'asc' onClick = {() => this.sortProductTable("poc",6)}>
                  POC<br/>
                  <input id = "s6" onClick="event.stopPropagation();">
                    
                  </input>
                  <br/>
                  </th>
                <th id = "c7" sort = 'asc' onClick = {() => this.sortProductTable("newprograms",7)}>
                  New Programs<br/>
                  <select id = "s7" onClick="event.stopPropagation();">
                    <option></option>
                  </select><br/>
                  </th>
                <th id = "c8" sort = 'asc' onClick = {() => this.sortProductTable("eop",8)}>
                  EOP<br/>
                  <input id = "s8" onClick="event.stopPropagation();">
                    
                  </input>
                  <br/>
                  </th>
                <th id = "c9" sort = 'asc' onClick = {() => this.sortProductTable("eos",9)}>
                  EOS<br/>
                  <input id = "s9" onClick="event.stopPropagation();">
                    
                  </input>
                  <br/>
                  </th>
                <th id = "c10" sort = 'asc' onClick = {() => this.sortProductTable("replacement",10)}>
                  Replacement<br/>
                  <input id = "s10" onClick="event.stopPropagation();">
                    
                  </input>
                  <br/>
                  </th>
                <th id = "c11" sort = 'asc' onClick = {() => this.sortProductTable("notes",11)}>
                  Notes<br/>
                  <input id = "s11" onClick="event.stopPropagation();">
                   
                  </input>
                  <br/>
                  </th>
                </tr>
                </thead> 
                <tbody>
                </tbody>
            </table>
            <div className = "ProductPagination" id = "ProductPagination">
              <div className = "ProductPaginationPages" id = "ProductPaginationPages">
                <button className = "productFirst" id = "productFirst"  onClick = {this.goToProductFirst}>First</button>  
                <button className = "productPrev" id = "productPrev"onClick = {this.goToProductPrev}>Prev</button>
                <input id = "productCurrentPage" className = "productCurrentPage" type = "text"></input>
                <button className = "productNext" id = "productNext" onClick = {this.goToProductNext}>Next</button>
                <button className = "productLast" id = "productLast" onClick = {this.goToProductLast}>Last</button>
              </div>
             <div className = "ProductPaginationLimiter" id = "ProductPaginationLimiter">
                  Results Per Page: 
                  <select id = "productPaginationLimiterSelect" className="productPaginationLimiterSelect" onChange={this.refreshPageWithNewPageLimiter}>
                    <option>1</option>
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                    <option>500</option>
                  </select>
             </div>
            </div>
            { 
            this.state && this.state.data &&
            <div><CSVLink id="productCsvLink" filename={"ProductTableResults.csv"} data={window.localStorage.getItem('productSearchResultsCSV')}> Export to Excel </CSVLink></div>
            }
    </div>
        );
    }
}