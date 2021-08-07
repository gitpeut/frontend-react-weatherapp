import React,{useState,useContext} from 'react';
import './MetricSlider.css';
import {TempContext} from "../../context/TempProvider";

const MetricSlider = () => {

  const [checked, toggleChecked] = useState( false );
  const { toggleTemp } = useContext( TempContext );

  //console.log( useContext( TempContext ));
  // do not use useEffect, as es lint will complain of having a dependency on toggleTemp,
  // adding it to the dependencies results in a loop. Instead add toggleTemp simply to
  // the onChange function.
  //
  // useEffect(() => {
  //        toggleTemp();
  // }, [checked]);

  return (
    <div className="weather-container-extention">
      Weergeven in

      <p className="switch-label">
          &deg;C
      </p>

      <span className="switch-wrapper">
        <input
          type="checkbox"
          className="switch"
          id="metric-system"
          checked={checked}
          onChange={ ()=>
          { toggleChecked(!checked); toggleTemp();}
          }
        />

        <label
          htmlFor="metric-system"
          className="switch-btn"
        />
      </span>

      <p className="switch-label">
        &deg;F
      </p>
    </div>
  );
};

export default MetricSlider;
