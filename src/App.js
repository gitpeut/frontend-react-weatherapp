import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from "./pages/forecastTab/ForecastTab";
import TodayTab from "./pages/todayTab/TodayTab";
import getApiKey from "./helpers/getApiKey";
import {TempContext} from "./context/TempProvider";

import{
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import './App.css';

const openWeatherUrl     = "https://api.openweathermap.org/data/2.5/weather";
const defaultLocation    = "Veldhoven";

function App() {

   const [ weatherData, setWeatherData] = useState( null);
   const [ location, setLocation] = useState( defaultLocation );
   const [ error, setError] = useState( false );
   const { kelvinToMetric } = useContext( TempContext );

    useEffect(() => {

            async function fetchData() {
                setError( false);
                try {
                    const result = await axios.get(`${openWeatherUrl}?q=${location},nl&appid=${ getApiKey()}&lang=nl`);
                    setWeatherData(result.data);
                } catch (e) {
                    setError( true);
                    console.error(e);
                }
            }

            if (location) fetchData();

        }, [location]
    );



  return (
    <>
      <div className="weather-container">

        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar setLocationHandler={setLocation} />

            {error && (
                <span className="wrong-location-error">
                    Deze locatie bestaat niet in Nederland
                </span>
            )}

            { (!weatherData && !error) &&
            <span className="no-forecast">
                        Voer eerst een geldige plaats in
                    </span>
            }

            <span className="location-details">
              {weatherData &&
                  <>
                  <h2>{weatherData.weather[0].description}</h2>
                  <h3>{weatherData.name}</h3>
                  <h1>{kelvinToMetric(weatherData.main.temp)}</h1>
                  </>
              }

          </span>
        </div>

        {/*CONTENT ------------------ */}

          <Router basename="/weather">
              <div className="weather-content">
                  <TabBarMenu/>

                  <div className="tab-wrapper">
                      <Switch>
                          <Route exact path="/">
                              <TodayTab coordinates={weatherData && weatherData.coord}/>
                          </Route>
                          <Route path="/komende-week">
                              <ForecastTab coordinates={weatherData && weatherData.coord}/>
                          </Route>
                      </Switch>
                  </div>
              </div>
          </Router>

    <MetricSlider/>

      </div>
    </>
  );
}

export default App;
