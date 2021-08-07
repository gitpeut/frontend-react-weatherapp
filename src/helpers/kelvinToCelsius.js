

function kelvinToCelsius( kelvins ){

    const celsius = Math.round( kelvins - 273.15 ); // from Kelvin to to Celsius

    return( `${celsius} °C`);
}

export default kelvinToCelsius;