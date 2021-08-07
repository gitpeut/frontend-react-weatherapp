import React,{useContext} from 'react';
import iconMapper from "../../helpers/iconMapper";
import {TempContext} from "../../context/TempProvider";

import './WeatherDetail.css';
import createTimeString from "../../helpers/createTimeString";

function WeatherDetail( { hour, temp, type, description} ) {
    const { kelvinToMetric } = useContext( TempContext );

    // console.log('weather detail');
    // console.log( useContext( TempContext ) );

  return (
    <section className="day-part">
      <p className="legend">{ createTimeString( hour ) }</p>
      <span className="icon-wrapper">
          { iconMapper(type) }
      </span>
      <p className="description">{description}</p>
      <p>{ kelvinToMetric( temp) }</p>
    </section>
  );
};

export default WeatherDetail;
