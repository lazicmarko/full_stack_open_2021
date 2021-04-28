import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries'
import Search from './components/Search';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data);
    })
  }, []);

  return (
    <div>
      <Search
        searchInput = {searchInput}
        setSearchInput = {setSearchInput}
      />
      <DisplayCountries
        countries = {countries}
        searchInput = {searchInput}
        setSearchInput = {setSearchInput}
       />
    </div>
   );
}

export default App;
