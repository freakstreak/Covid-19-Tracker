import React from "react";
import Card from "./Card";

const CovidSummary = (props) => {
  const { totalConfimed, totalRecoverd, totalDeaths, country } = props;

  return (
    <div>
      <div>
        {/* <div className="dashboard">
          <img src="https://www.un.org/sites/un2.un.org/files/covid19_response_icon.svg" alt=""/>
          <h2>Covid19 Dashboard</h2>
        </div> */}
        
        {/* <h1>{country}</h1> */}

        <div className="container">
          <Card styleName="countryCard">
            <span className="cardHeading">Country</span>
            <br/>
            <span>{country}</span>
            {/* <hr/> */}
          </Card>
          <Card styleName="confirmedCard">
            <span className="cardHeading">Total Confirmed </span>
            <br/>
            
            <span>{totalConfimed.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </Card>
          <Card styleName="recoveredCard">
            <span className="cardHeading">Total Recovered</span>
            <br/>
            <span>{totalRecoverd.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </Card>
          <Card styleName="deathsCard">
            <span className="cardHeading">Total Deaths</span>
            <br/>
            <span>{totalDeaths.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CovidSummary;
