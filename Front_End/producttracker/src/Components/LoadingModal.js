import React from 'react';
import "../CSS/Loading.css"

/**
 * This is where the loading spinner is created. All animations are handled in CSS.
 */
export default class LoadingModal extends React.Component 
{
    render() 
    {
      return(
        <div id="loadingModal" className="loadingModal">
          <div className="loadingModal-content">
            <div className="loadingModal-body" >
              <div id = "loading" className="loading">Loading....<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
        </div>
      );
    }
  }