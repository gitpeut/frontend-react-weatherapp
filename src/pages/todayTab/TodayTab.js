import React,{useEffect,useState} from 'react';
import './TodayTab.css';
import axios from "axios";
import getApiKey from "../../helpers/getApiKey";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";

const hourlyUrl = "https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,current,daily&lang=nl";

function TodayTab( {coordinates} ) {

    const [ hourlyData, setHourlyData] = useState( null);
    const [ error, setError] = useState( false );
    const [ loading, setLoading] = useState( false );

//    if( coordinates ) console.log( 'TodayTab - coordinates ' + coordinates["lon"] + " " + coordinates["lat"]  );

    useEffect(() => {

            async function fetchData() {
                setError( false );
                setLoading( true );
                try {
                    const result = await axios.get(`${hourlyUrl}&appid=${getApiKey()}&lat=${coordinates.lat}&lon=${ coordinates.lon}` );
                    setHourlyData( [result.data.hourly[3],result.data.hourly[6], result.data.hourly[9] ] );
                } catch (e) {
                    setError( true );
                    console.error(e);
                }
                setLoading( false );
            }

            if( coordinates ) fetchData();

        }, [coordinates]
    );

    return(
		<div className="tab-wrapper">
			<div className="chart">
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
                { (!hourlyData && !error) &&
                <span className="no-forecast">
                        Voer eerst een geldige plaatsnaam in
                    </span>
                }

                {hourlyData &&
                hourlyData.map((hour) => {
                    return (
                        <WeatherDetail
                            key={hour.dt}
                            hour={hour.dt}
                            temp={hour.temp}
                            type={hour.weather[0].main}
                            description={hour.weather[0].description}
                        />
                    )
                })
                }
			</div>
			{/*<div className="legend">*/}
            {/*    { hourlyData && hourlyData.map(( hour ) => {*/}
            {/*        return <span key={ (hour.dt+1)}>{ createTimeString( hour.dt ) }</span>*/}
            {/*    })}*/}
			{/*</div>*/}
		</div>
  );
}

export default TodayTab;
