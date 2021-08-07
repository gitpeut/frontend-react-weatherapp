
import React, {useState, useEffect, useContext} from 'react';
import './ForecastTab.css';
import axios from 'axios';
import getApiKey from "../../helpers/getApiKey";
import {TempContext} from "../../context/TempProvider";

const forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,current,hourly&lang=nl";
// &appid=${ JOUW API KEY }&lat=${ VOEG HIER LATITUDE TOE }&lon=${ VOEG HIER LONGITUDE TOE }&exclude=minutely,current,hourly&appid=${ JOUW API KEY }&lang=nl"



function ForecastTab( {coordinates} ) {

  const [forecastData, setForecastData] = useState(null);
  const [ error, setError] = useState( false );
  const [ loading, setLoading] = useState( false );

  const { kelvinToMetric } = useContext( TempContext );

//  if( coordinates ) console.log( 'ForecastTab - coordinates ' + coordinates["lon"] + " " + coordinates["lat"]  );

    function getDayData( day ){

        let returnObj = {
            d : "",  // Dutch long weekday name
            t: "", // temperature in Celsius
            i: ""    // weather description
        };

        //convert UNIX time to a Date object
        const unixTime = day.dt;
        const jsDay = new Date( (unixTime*1000) );
        returnObj.d = jsDay.toLocaleString('nl-NL', {weekday: 'long'});

        // get the temperature
        const daytemp = day.temp.day;
        returnObj.t = kelvinToMetric( daytemp ) // from Kelvin to to Celsius

        // get the weather description
        returnObj.i = day.weather[0].description;

        return( returnObj );

    }


    useEffect(() => {

        async function fetchData() {
            setError( false );
            setLoading( true );
            try {
                const result = await axios.get(`${forecastUrl}&appid=${getApiKey()}&lat=${coordinates.lat}&lon=${ coordinates.lon}` );
                setForecastData(result.data.daily.slice(1, 6));
            } catch (e) {
                setError( true );
                console.error(e);
            }
            setLoading( false );
        }

        if( coordinates ) fetchData();

        }, [coordinates]
    );


    return (

        <div className="tab-wrapper">
            {loading && (
                <span className="no-forecast">
                        Loading...
                </span>
                )
            }
            {error && (
                <span className="wrong-location-error">
                        Er is iets misgegaan bij het ophalen van de gegevens.
                    </span>
            )}
            { (!forecastData && !error) &&
                    <span className="no-forecast">
                        Voer eerst een geldige plaats in
                    </span>
            }

            {   forecastData &&
                forecastData.map ( (day) => {

                    // convert owm data to a format we like in object dayFields
                    const dayFields = getDayData( day );

                    return(

                    <article className="forecast-day" key={day.dt}>
                    <p className="day-description">
                        { dayFields.d }
                    </p>
                    <section className="forecast-weather">
                    <span>
                        { dayFields.t }
                    </span>
                    <span className="weather-description">
                        { dayFields.i }
                    </span>
                    </section>
                    </article>
                )
                }) // end map call



            }



        </div>
  );
}

export default ForecastTab;
