import "./App.css";
import LineGraph from "./components/LineGraph";
import CovidSummary from "./components/CovidSummary";
import GraphGlobal from "./components/GraphGlobal";
import axios from "./axios";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import { textAlign } from "@mui/system";

function App() {
  const [totalConfimed, settotalConfirmed] = useState(0);
  const [totalRecovered, settotalRecovered] = useState(0);
  const [totalDeaths, settotalDeaths] = useState(0);
  const [loading, setloading] = useState(false);
  const [covidSummary, setCovidSummary] = useState({});
  const [days, setDays] = useState(7);
  // const [changeCountry, setChangeCountry] = useState("");
  const [country, setCountry] = useState("");
  const [coronaCountArr, setCoronaCountArr] = useState([]);
  const [label, setLabel] = useState([]);

  useEffect(() => {
    setloading(true);
    axios
      .get(`/summary`)
      .then((res) => {
        setloading(false);
        if (res.status === 200) {
          settotalConfirmed(res.data.Global.TotalConfirmed);
          settotalRecovered(res.data.Global.TotalRecovered);
          settotalDeaths(res.data.Global.TotalDeaths);
          setCovidSummary(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const globalDataArr = [totalConfimed, totalRecovered, totalDeaths];

  let countryData = [];

  if (covidSummary.Countries) {
    countryData = covidSummary.Countries.map((country) => country.Country);
    countryData = [...countryData, ""];
  }

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = d.getDate();
    return `${year}-${month}-${_date}`;
  };

  const countryHandler = (event, newValue) => {
    setCountry(newValue);
    if (newValue === null) {
      axios
        .get(`/summary`)
        .then((res) => {
          setloading(false);
          if (res.status === 200) {
            settotalConfirmed(res.data.Global.TotalConfirmed);
            settotalRecovered(res.data.Global.TotalRecovered);
            settotalDeaths(res.data.Global.TotalDeaths);
            // setCountry("Global")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const d = new Date();
      const to = formatDate(d);
      const from = formatDate(d.setDate(d.getDate() - days));
      // console.log(from, to);

      reportByDateChange(newValue, from, to);
    }
  };

  const daysHandler = (event) => {
    setDays(event.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - event.target.value));

    reportByDateChange(country, from, to);
  };

  const reportByDateChange = (countrySlug, from, to) => {
    axios
      .get(
        `/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
      )
      .then((res) => {
        console.log(res);
        console.log(covidSummary);

        const yAxisCovidCount = res.data.map((d) => d.Cases);
        const xAxisLabel = res.data.map((d) => d.Date.substring(0,10));
        const covidDetails = covidSummary.Countries.find(
          (country) => country.Slug === countrySlug.toLowerCase()
        );
        setCoronaCountArr(yAxisCovidCount);
        settotalConfirmed(covidDetails.TotalConfirmed);
        settotalRecovered(covidDetails.TotalRecovered);
        settotalDeaths(covidDetails.TotalDeaths);
        setLabel(xAxisLabel);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center" }}>...Wait, Loading Data from Api...</p>
    );
  }

  return (
    <div className="App">
      
      <CovidSummary
        totalConfimed={totalConfimed}
        totalRecoverd={totalRecovered}
        totalDeaths={totalDeaths}
        country={country ? country : "Global"}
      />
      <div className="">
        {/* <input type="text" list="countries" onChange={countryHandler} />
          <datalist id="countries" onClick={optionCountryHandler}>
          {covidSummary.Countries &&
            covidSummary.Countries.map( (country) => 
                  <option key={country.Slug} value={country.Country}></option> 
            )}
          </datalist> */}
        <ul className="navbar">
          {/* <li className="logo">
            <img alt="" src="https://www.un.org/sites/un2.un.org/files/covid-19.svg"/>
          </li> */}
          <li className="filter">
            <label >Filters: </label>
          </li>
          <li>
            <Autocomplete
              value={country}
              onChange={countryHandler}
              disablePortal
              id="combo-box-demo"
              options={countryData}
              sx={{
                width: 150,
                background: "#fff"
              }}
              renderInput={(params) => <TextField {...params} placeholder="Country" label="" />}
            />
          </li>
          <li>
            <select className="optionMenu" placeholder="Days" value={days} onChange={daysHandler}>
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </li>
        </ul>
      </div>
      {country ? (
        <LineGraph yAxis={coronaCountArr} label={label} />
      ) : (
        <GraphGlobal values={globalDataArr} />
      )}
      {/* <LineGraph yAxis={country && coronaCountArr} label={country && label} /> */}
    </div>
  );
}

export default App;
