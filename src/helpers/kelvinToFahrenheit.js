

function kelvinToFahrenheit( kelvins ){

    const fahrenheit = Math.round( ( (kelvins - 273.15)*1.8 ) + 32 ); // from Kelvin to to Celsius

    return( `${fahrenheit} °F`);
}

export default kelvinToFahrenheit;