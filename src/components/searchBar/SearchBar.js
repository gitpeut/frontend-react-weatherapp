import {useState, React} from 'react';
import './SearchBar.css';

function SearchBar( props ) {

  const [query, setQuery] = useState('');

  function handleClick(e){
    props.setLocationHandler( query );
    console.log( e.target.name );
  }

  function handleKey(e){
    if( e.keyCode === 13 )props.setLocationHandler( query );
  }

  return (
    <span className="searchbar">
      <input
        type="text"
        name="search"
        value={query}
        placeholder="Zoek een stad in Nederland"
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleKey}
      />

      <button type="button" name="searchCity" onClick={handleClick} >
        Zoek
      </button>
    </span>
  );
};

export default SearchBar;
