import React from 'react';
import './TabBarMenu.css';
import {NavLink} from 'react-router-dom';

function TabBarMenu() {
  return (
    <nav className="tab-bar">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active" >
            Vandaag
          </NavLink>
        </li>
        <li>
          <NavLink to="/komende-week" activeClassName="active" >
            Komende week
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default TabBarMenu;
