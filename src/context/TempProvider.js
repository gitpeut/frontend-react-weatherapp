
import React, { createContext, useState} from "react";
import kelvinToCelsius from "../helpers/kelvinToCelsius";
import kelvinToFahrenheit from "../helpers/kelvinToFahrenheit";

export const TempContext=createContext(null);

function TempContextProvider( {children} ){
    const [selectedMetric, setSelectedMetric] = useState( 'celsius');


    function toggleTemp() {
        if (selectedMetric === 'celsius') {
            setSelectedMetric('fahrenheit');
        } else {
            setSelectedMetric('celsius');
        }
    }

    return (
        <TempContext.Provider value={

             {
                 toggleTemp: toggleTemp,
                 kelvinToMetric: (selectedMetric === 'celsius')?kelvinToCelsius:kelvinToFahrenheit ,
                 selectedMetric: selectedMetric,
             }
        }>
            {children}
        </TempContext.Provider>
    )
}

export default TempContextProvider;