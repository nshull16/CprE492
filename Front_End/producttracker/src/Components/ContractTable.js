import React, {Component} from 'react';
import '../CSS/Table.css';
import $ from 'jquery';
import { CSVLink } from "react-csv";

var rowData = [];
var pageNumber = 1;
var allData = [];
var csvData = [];
var selections = [];
var csv;

/**
 * A table that displays contracts based on users filters and sorts. Each row is selectable. After selection users can edit or delete that row.
 * Contracts are also displayed as a link. When clicking this link you will be shown the details of that contract.
 */
export default class ContractTable extends React.Component
{
    /**
     * Refreshes the page, now only showing the number of rows selected.
     */
    refreshPageWithNewPageLimiter = () =>
    {
        window.localStorage.setItem('contractLimiter', $('#contractPaginationLimiterSelect').val());
        window.localStorage.setItem('contractPage', 1);
        window.location.reload();
    }

    /**
     * Goes to the next page of contracts.
     */
    goToContractNext = () =>
    {
        pageNumber = parseInt(window.localStorage.getItem('contractPage'));
        if(pageNumber < Math.ceil(window.localStorage.getItem('contractSearchResultsTotal') / window.localStorage.getItem('contractLimiter')))
        {
            window.localStorage.setItem('contractPage', pageNumber + 1);
            window.location.reload();
        }
    }

    /**
     * Goes to the previous page of contracts.
     */
    goToContractPrev = () =>
    {
        pageNumber = parseInt(window.localStorage.getItem('contractPage')) - 1;
        if(pageNumber > 0)
        {
            window.localStorage.setItem('contractPage', pageNumber);
            window.location.reload();
        }
    }

    /**
     * Goes to the first page of contracts.
     */
    goToContractFirst = () =>
    {
        pageNumber = 1;
        window.localStorage.setItem('contractPage', pageNumber);
        window.location.reload();
    }

    /**
     * Goes to the last page of contracts.
     */
    goToContractLast = () =>
    {
        /** Last page is found by dividing total by the users limiter, then using the cieling of that value. */
        pageNumber = Math.ceil(window.localStorage.getItem('contractSearchResultsTotal') / window.localStorage.getItem('contractLimiter'));
        window.localStorage.setItem('contractPage', pageNumber);
        window.location.reload();
    }

    /**
     * Adds select attributes to each row. What is selected is decided by a background-color value.
     */
    addActiveAttributeToAllRows = () =>
    {
        $('#ContractTable tr').each(function(i, row)
        {
            /** First row is our headers. */
            if(i!==0)
            {
                /** Add on click function. */
                $(row).click(function ()
                {
                    /** If we click an already selected row, we can des-select it. */
                    if($(row).css("background-color") === "rgb(255, 0, 0)")
                    {
                        $('#editContractButton').prop('disabled', true);
                        $('#editContractButton').css('background-color', '#cacaca');
                        $('#deleteContractButton').prop('disabled', true);
                        $('#deleteContractButton').css('background-color', '#cacaca');
                        $(row).css('background-color', 'rgb(0, 0, 0)');
                        /** We have to set the correct color back to the row, since colors differ every other row. */
                        if(i%2!==0)
                        {
                            $(row).children().css({'background-color': '#dadada', 'color': '#332c28'}).find("a").css({'color': 'blue'});
                        }
                        else
                        {
                            $(row).children().css({'background-color': '#cecece', 'color': '#332c28'}).find("a").css({'color': 'blue'});
                        }
                    }
                    /** The row selected wasn't already selected. */
                    else
                    {
                        /** De-select any other rows that were selected. */
                        $('#ContractTable tr').each(function(i, row)
                        {
                            if($(row).css("background-color") === "rgb(255, 0, 0)")
                            {

                                $(row).css('background-color', 'rgb(0, 0, 0)');
                                if(i%2 !== 0)
                                {
                                    $(row).children().css({'background-color': '#dadada', 'color': '#332c28'}).find("a").css({'color': 'blue'});
                                }
                                else
                                {
                                    $(row).children().css({'background-color': '#cecece', 'color': '#332c28'}).find("a").css({'color': 'blue'});
                                }
                            }
                        });
                        var $tds = $(row).find("td");
                        $.each($tds, function()
                        {
                            rowData.push($(this).text());
                        });
                        /** Allow for edit and delete if Admin. */
                        $('#editContractButton').prop('disabled', false);
                        $('#editContractButton').css('background-color', '#d7451a');
                        $('#deleteContractButton').prop('disabled', false);
                        $('#deleteContractButton').css('background-color', '#d7451a');
                        /** Populate the details/edit/detail modal values. */
                        $('#editContractContract').val(rowData[0]);
                        $('#editContractCustomer').val(rowData[1]);
                        $('#editContractContractMgr').val(rowData[2]);
                        $('#contractDetailsCm').val(rowData[2]);
                        $('#contractDetailsCustomer').val(rowData[1]);
                        $('#contractDetailsContract').val(rowData[0]);
                        $('#contractDelete').val(rowData[0]);
                
                        /** Update the associated products lists and add the function that allows linking between contracts and products. */
                        var items = [];
                        $('#associatedProductsEditList').empty();
                        $.each(rowData[3].split(',') , function(key, val)
                        {
                            let length = $('#associatedProductsEditList option').length;
                            $('#associatedProductsEditList').append("<option id='associatedProductEditOption"+ length +"' >"+val+"</option>");
                            $('#associatedProductsEditPlaceHolder').append("<input style='display: none;' id='associatedProductEdit' name='associatedProducts["+length+"]' value='"+ val +"'/>");
                            items.push("<a href='#'  id = 'associatedProduct-" + key + "'  onclick=\"$(window.localStorage.setItem('tab', '0'), window.localStorage.setItem('productCpn', '" + val + "'), "
                            +"window.localStorage.setItem('productEqpttype', ''), "
                            +"window.localStorage.setItem('productPlant', ''), "
                            +"window.localStorage.setItem('productMakeorbuy', ''), "
                            +"window.localStorage.setItem('productBu', ''), "
                            +"window.localStorage.setItem('productPortfolio', ''), "
                            +"window.localStorage.setItem('productPoc', ''), "
                            +"window.localStorage.setItem('productNewprograms', ''), "
                            +"window.localStorage.setItem('productEop', ''), "
                            +"window.localStorage.setItem('productEos', ''), "
                            +"window.localStorage.setItem('productReplacement', ''), "
                            +"window.localStorage.setItem('productPage', 1), "
                            +"window.localStorage.setItem('productNotes', ''), window.location.reload())\">" + val + "</a>");
                        });
                        $('#contractDetailsAssociatedProducts').empty();
                        $('#contractDetailsAssociatedProducts').append(items.join(""));
                        rowData = [];
                        $(row).css('background-color', 'rgb(255, 0, 0)');
                        $(row).children().css({'background-color': '#332c28', 'color': 'white'}).find("a").css({'color': '#8fffee'});
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
        $('#ContractTable tbody').empty();
        /** Determine what rows should be displayed by multiplying our page number by our row limiter. In-case of null values default page to 1 and row limiter to 50. */
        let limiter = (parseInt(window.localStorage.getItem('contractPage') === null ? 1 : window.localStorage.getItem('contractPage')) - 1) * parseInt((window.localStorage.getItem('contractLimiter') === null ? 50 : (window.localStorage.getItem('contractLimiter'))));
        for (let index = 0; index < data.length; index++)
        {
            /** Only display the rows governed by our limiter and page number. */
            if(index >= limiter && index < limiter + parseInt(window.localStorage.getItem('contractLimiter') === null ? 50 : (window.localStorage.getItem('contractLimiter'))))
            {
                $('#ContractTable tbody').append( "<tr id='pr" + index + "' >"+
                    "<td><a href=\"#\" onclick=\"$('#contractDetailsModal').css('display', 'block');\">" + JSON.parse(data[index]).contract + "</a></td>"+
                    "<td>"+ JSON.parse(data[index]).customer + "</td>" +
                    "<td>"+ JSON.parse(data[index]).cm + "</td>" + 
                    "<td style='display: none'>"+ JSON.parse(data[index]).associatedProducts +"</td>"+
                    "</tr>");
            }
            /** Add in the other rows as hidden. This is neccessary, so that we may sort all the results, not just the results displayed. */
            else
            {
                $('#ContractTable tbody').append( "<tr id='pr" + index + "' style='display: none;'>"+
                    "<td><a href=\"#\" onclick=\"$('#productDetailsModal').css('display', 'block');\">" + JSON.parse(data[index]).contract + "</a></td>"+
                    "<td>"+ JSON.parse(data[index]).customer + "</td>" +
                    "<td>"+ JSON.parse(data[index]).cm + "</td>" +
                    "<td style='display: none'>"+ JSON.parse(data[index]).associatedProducts +"</td>"+
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
    sortContractTable = (key, n) =>
    {
        /** Show loading spinner. */
        $('#loadingModal').css('display', 'block');
        /** Remove sort arrow image. */
        $('#sortArrow').remove();
        /** Sort array of row data. */
        var sortedData = this.sortResults(key, n);
        window.localStorage.setItem('contractSearchResults', JSON.stringify(sortedData));
        /** Re-display table. */
        this.populateTable(JSON.parse(window.localStorage.getItem('contractSearchResults')));
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
        allData = JSON.parse(window.localStorage.getItem('contractSearchResults'));
        /** Pull the current sort attribute from column. */
        var way = $('#c'+n).attr('sort');
        /** Set to opposite value and display sort arrow image. */
        if (way === 'asc')
        {
            $('#c'+n).attr('sort', 'desc');
            $('#c'+n).append('<img id="sortArrow" src="Descending.png" alt="Descending" height="10" width="10"/>');
        }
        else
        {
            $('#c'+n).attr('sort', 'asc');
            $('#c'+n).append('<img id="sortArrow" src="Ascending.png" alt="Ascending" height="10" width="10"/>');
        }
        /** Basic sort function that sorts based on given column. */
        return allData.sort(function(a, b)
        {
            a = JSON.parse(a);
            b = JSON.parse(b);
            var x = a[key]; var y = b[key];
            if (way === 'asc' )
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
            $('#contractPaginationLimiterSelect').val((window.localStorage.getItem('contractLimiter') === null ? 50 : (window.localStorage.getItem('contractLimiter'))));
            $('#contractCurrentPage').val((window.localStorage.getItem('contractPage') === null ? 1 : (window.localStorage.getItem('contractPage'))));
            $('#loadingModal').css('display', 'block');

            /** Save which tab we are on. */
            if(window.localStorage.getItem('tab')==1)
            {
                $('#tab-nav-1').removeAttr('checked');
                $('#tab-nav-2').attr('checked', 'checked');
            }
            /** Start document off by disabling edit/delete. These get re-enabled if user is admin.*/
            $('#editContractButton').prop('disabled', true);
            $('#editContractButton').css('background-color', '#cacaca');
            $('#deleteContractButton').prop('disabled', true);
            $('#deleteContractButton').css('background-color', '#cacaca');
            /** POST request to backend services, send our search results as JSON data pulled from local storage. If these are null send defaults. */
            $.ajax({
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                url: "http://producttracker.ece.iastate.edu:8080/search/contract",
                data: JSON.stringify({
                    "id": null,
                    "cm": (window.localStorage.getItem('contractCm') === "" ? null : (window.localStorage.getItem('contractCm'))),
                    "customer": (window.localStorage.getItem('contractCustomer') === "" ? null : (window.localStorage.getItem('contractCustomer'))),
                    "contract": (window.localStorage.getItem('contractContract') === "" ? null : (window.localStorage.getItem('contractContract'))),
                    }),
                /** Upon successful POST, take returned data and store it into 2 arrays. One is used for table population, the other for creating CSV data. */
                success: function(data){
                $.each(data, function (key, contract)
                {
                    /** Put multiple rows of CSV data when a contract contains more than one associate product. */
                    if(contract.associatedProducts == null || contract.associatedProducts.length == 0) 
                    {
                        let tempContract = 
                        {
                            contract: "",
                            customer: "",
                            cm: "",
                            associatedProducts: ""
                        };
                        tempContract.contract = contract.contract;
                        tempContract.customer = contract.customer;
                        tempContract.cm = contract.cm;
                        csvData.push(tempContract);
                    }
                    else
                    {
                        let i = 0;
                        for(; i < contract.associatedProducts.length; i++) 
                        {
                            let tempContract = 
                            {
                                contract: "",
                                customer: "",
                                cm: "",
                                associatedProducts: ""
                            };
                            tempContract.contract = contract.contract;
                            tempContract.customer = contract.customer;
                            tempContract.cm = contract.cm;
                            tempContract.associatedProducts = contract.associatedProducts[i];
                            csvData.push(tempContract);
                        }
                    }
                    allData.push(JSON.stringify(contract));
                });

                /** Plugin that parses JSON into CSV data. */
                const { Parser } = require('json2csv');
                let fields = ["contract", "customer", "cm", "associatedProducts"];
                const parser = new Parser(
                {
                    fields,
                    unwind: ["contract", "customer", "cm", "associatedProducts"]
                });
                csv = parser.parse(csvData);
                window.localStorage.setItem('contractSearchResultsCSV', csv);
                /** This is the data that our state will wait for to load. */
                self.setState({ data: csv });

                window.localStorage.setItem('contractSearchResults', JSON.stringify(allData));
                window.localStorage.setItem('contractSearchResultsTotal', allData.length);
                
                /**
                 * Populates contract table from given array of contract rows.
                 * @param {*} data 
                 */
                function populateTable(data)
                {
                    /** Empty out the table. */
                    $('#ContractTable tbody').empty();
                    /** Determine what rows should be displayed by multiplying our page number by our row limiter. In-case of null values default page to 1 and row limiter to 50. */
                    let limiter = (parseInt(window.localStorage.getItem('contractPage') === null ? 1 : window.localStorage.getItem('contractPage')) - 1) * parseInt((window.localStorage.getItem('contractLimiter') === null ? 50 : (window.localStorage.getItem('contractLimiter'))));
                    for (let index = 0; index < data.length; index++)
                    {
                        /** Only display the rows governed by our limiter and page number. */
                        if(index >= limiter && index < limiter + parseInt(window.localStorage.getItem('contractLimiter') === null ? 50 : (window.localStorage.getItem('contractLimiter'))))
                        {
                            $('#ContractTable tbody').append( "<tr id='pr" + index + "' >"+
                                "<td><a href=\"#\" onclick=\"$('#contractDetailsModal').css('display', 'block');\">" + JSON.parse(data[index]).contract + "</a></td>"+
                                "<td>"+ JSON.parse(data[index]).customer + "</td>" +
                                "<td>"+ JSON.parse(data[index]).cm + "</td>"+
                                "<td style='display: none'>"+ JSON.parse(data[index]).associatedProducts +"</td>"+
                                "</tr>");
                        }
                        /** Add in the other rows as hidden. This is neccessary, so that we may sort all the results, not just the results displayed. */
                        else
                        {
                            $('#ContractTable tbody').append( "<tr id='pr" + index + "' style='display: none;'>"+
                                "<td><a href=\"#\" onclick=\"$('#contractDetailsModal').css('display', 'block');\">" + JSON.parse(data[index]).contract + "</a></td>"+
                                "<td>"+ JSON.parse(data[index]).customer + "</td>" +
                                "<td>"+ JSON.parse(data[index]).cm + "</td>"+
                                "<td style='display: none'>"+ JSON.parse(data[index]).associatedProducts +"</td>"+
                                "</tr>");
                        }
                    }
                    /** Hide loading spinner. */
                    $('#loadingModal').css('display', 'none');
                }

                /**
                 * Checks if a row is already selected and removes the select attributes from that row.
                 */
                function checkForAlreadySelectedContract()
                {
                    $('#ContractTable tr').each(function(i, row)
                    {
                        if($(row).css("background-color") === "rgb(255, 0, 0)")
                        {

                            $(row).css('background-color', 'rgb(0, 0, 0)');
                            if(i%2 !== 0)
                            {
                                $(row).children().css({'background-color': '#dadada', 'color': '#332c28'}).find("a").css({'color': 'blue'});
                            }
                            else
                            {
                                $(row).children().css({'background-color': '#cecece', 'color': '#332c28'}).find("a").css({'color': 'blue'});
                            }
                        }
                    });
                }

                /**
                 * Adds select attributes to each row. What is selected is decided by a background-color value.
                 */
                function addActiveAttributeToAllRows()
                {
                    $('#ContractTable tr').each(function(i, row)
                    {
                        /** First row is our headers. */
                        if(i!==0)
                        {
                            /** Add on click function. */
                            $(row).click(function ()
                            {
                                /** If we click an already selected row, we can des-select it. */
                                if($(row).css("background-color") === "rgb(255, 0, 0)")
                                {
                                    $('#editContractButton').prop('disabled', true);
                                    $('#editContractButton').css('background-color', '#cacaca');
                                    $('#deleteContractButton').prop('disabled', true);
                                    $('#deleteContractButton').css('background-color', '#cacaca');
                                    $(row).css('background-color', 'rgb(0, 0, 0)');
                                    /** We have to set the correct color back to the row, since colors differ every other row. */
                                    if(i%2!==0)
                                    {
                                        $(row).children().css({'background-color': '#dadada', 'color': '#332c28'}).find("a").css({'color': 'blue'});
                                    }
                                    else
                                    {
                                        $(row).children().css({'background-color': '#cecece', 'color': '#332c28'}).find("a").css({'color': 'blue'});
                                    }
                                }
                                /** The row selected wasn't already selected. */
                                else
                                {
                                    /** De-select any other rows that were selected. */
                                    checkForAlreadySelectedContract();
                                    var $tds = $(row).find("td");
                                    $.each($tds, function()
                                    {
                                        rowData.push($(this).text());
                                    });
                                    /** Allow for edit and delete if Admin. */
                                    $('#editContractButton').prop('disabled', false);
                                    $('#editContractButton').css('background-color', '#d7451a');
                                    $('#deleteContractButton').prop('disabled', false);
                                    $('#deleteContractButton').css('background-color', '#d7451a');
                                    /** Populate the details/edit/detail modal values. */
                                    $('#editContractContract').val(rowData[0]);
                                    $('#editContractCustomer').val(rowData[1]);
                                    $('#editContractContractMgr').val(rowData[2]);
                                    $('#contractDetailsCm').val(rowData[2]);
                                    $('#contractDetailsCustomer').val(rowData[1]);
                                    $('#contractDetailsContract').val(rowData[0]);
                                    $('#contractDelete').val(rowData[0]);
                          
                                    /** Update the associated products lists and add the function that allows linking between contracts and products. */
                                    var items = [];
                                    $('#associatedProductsEditList').empty();
                                    $.each(rowData[3].split(',') , function(key, val)
                                    {
                                        let length = $('#associatedProductsEditList option').length;
                                        $('#associatedProductsEditList').append("<option id='associatedProductEditOption"+ length +"' >"+val+"</option>");
                                        $('#associatedProductsEditPlaceHolder').append("<input style='display: none;' id='associatedProductEdit' name='associatedProducts["+length+"]' value='"+ val +"'/>");
                                        items.push("<a href='#'  id = 'associatedProduct-" + key + "'  onclick=\"$(window.localStorage.setItem('tab', '0'), window.localStorage.setItem('productCpn', '" + val + "'), "
                                        +"window.localStorage.setItem('productEqpttype', ''), "
                                        +"window.localStorage.setItem('productPlant', ''), "
                                        +"window.localStorage.setItem('productMakeorbuy', ''), "
                                        +"window.localStorage.setItem('productBu', ''), "
                                        +"window.localStorage.setItem('productPortfolio', ''), "
                                        +"window.localStorage.setItem('productPoc', ''), "
                                        +"window.localStorage.setItem('productNewprograms', ''), "
                                        +"window.localStorage.setItem('productEop', ''), "
                                        +"window.localStorage.setItem('productEos', ''), "
                                        +"window.localStorage.setItem('productReplacement', ''), "
                                        +"window.localStorage.setItem('productPage', 1), "
                                        +"window.localStorage.setItem('productNotes', ''), window.location.reload())\">" + val + "</a>");
                                    });
                                    $('#contractDetailsAssociatedProducts').empty();
                                    $('#contractDetailsAssociatedProducts').append(items.join(""));
                                    rowData = [];
                                    $(row).css('background-color', 'rgb(255, 0, 0)');
                                    $(row).children().css({'background-color': '#332c28', 'color': 'white'}).find("a").css({'color': '#8fffee'});
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
                    for(let i = 12; i < 15; i++)
                    {
                        var selection = $('#s' + i).val();
                        selections.push(selection);
                    }
                    window.localStorage.setItem('contractContract', selections[0]);
                    window.localStorage.setItem('contractCustomer', selections[1]);
                    window.localStorage.setItem('contractCm', selections[2]);
                    window.localStorage.setItem('contractLimiter', $('#contractPaginationLimiterSelect').val());
                    window.localStorage.setItem('contractPage', 1);
                    window.location.reload();
                }

                populateTable(JSON.parse(window.localStorage.getItem('contractSearchResults')));
                addActiveAttributeToAllRows();

                /** Show total results. */
                $('#contractPaginationLimiterSelect').after(" Found " + window.localStorage.getItem('contractSearchResultsTotal') + " results");

                $('#s12').val((window.localStorage.getItem('contractContract') === "" ? null : (window.localStorage.getItem('contractContract'))));
                $('#s13').val((window.localStorage.getItem('contractCustomer') === "" ? null : (window.localStorage.getItem('contractCustomer'))));
                $('#s14').val((window.localStorage.getItem('contractCm') === "" ? null : (window.localStorage.getItem('contractCm'))));

                /** Bind the enter key to trigger words. */
                $('#contractCurrentPage').bind("enterKeyPage",function(e)
                {
                    pageNumber = parseInt($('#contractCurrentPage').val());
                    if(pageNumber > 0)
                    {
                        window.localStorage.setItem('contractPage', pageNumber);
                        window.location.reload();
                    }
                });

                $('#contractCurrentPage').keyup(function(e)
                {
                    if(e.keyCode == 13)
                    {
                        $(this).trigger("enterKeyPage");
                    }
                });
                /** Add functions to each filter that allows pressing enter to search. */
                for(let i = 12; i < 15; i++)
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
            }});
        });
    }


  render() {

    return (
      <div className="ContractTableDiv">
        <table id="ContractTable" className="ContractTable">
            <thead>
                <tr id = "headers" className = "headers">
                    <th id = "c12" sort = 'asc' onClick = {() => this.sortContractTable("contract",12)}>
                        Contract<br/>
                        <input id = "s12" onClick="event.stopPropagation();"/>
                        <br/>
                    </th>
                    <th id = "c13" sort = 'asc' onClick = {() => this.sortContractTable("customer",13)}>
                        Customer<br/>
                        <input id = "s13" onClick="event.stopPropagation();"/>
                        <br/>
                    </th>
                    <th id = "c14" sort = 'asc' onClick = {() => this.sortContractTable("cm",14)}>
                        Contract Mgr<br/>
                        <input id = "s14" onClick="event.stopPropagation();"/>
                        <br/>
                    </th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
          <div className = "ContractPagination" id = "ContractPagination">
              <div className = "ContractPaginationPages" id = "ContractPaginationPages">
                  <button className = "contractFirst" id = "contractFirst"  onClick = {this.goToContractFirst}>First</button>
                  <button className = "contracttPrev" id = "contractPrev"onClick = {this.goToContractPrev}>Prev</button>
                  <input id = "contractCurrentPage" className = "contractCurrentPage" type = "text"/>
                  <button className = "contractNext" id = "contractNext" onClick = {this.goToContractNext}>Next</button>
                  <button className = "contractLast" id = "contractLast" onClick = {this.goToContractLast}>Last</button>
              </div>
              <div className = "ContractPaginationLimiter" id = "ContractPaginationLimiter">
                  Results Per Page:
                  <select id = "contractPaginationLimiterSelect" className="contractPaginationLimiterSelect" onChange={this.refreshPageWithNewPageLimiter}>
                      <option>0</option>
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
            <div><CSVLink id="contractCsvLink" filename={"ContractTableResults.csv"} data={window.localStorage.getItem('contractSearchResultsCSV')}> Export to Excel </CSVLink></div>
          }
      </div>
    );
    }
  }