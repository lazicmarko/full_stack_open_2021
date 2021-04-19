import React from 'react';
import SingleCountry from './SingleCountry'

const DisplayCountries = ({countries, searchInput, setSearchInput}) => {
  if(searchInput === '') return null

  let filteredCountries = [];
    filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchInput.toLowerCase()));

    if (filteredCountries.length === 1) {
      return (
        filteredCountries.map(country => (
          <SingleCountry country = {country} key = {country.name} />
        ))
      )
    } else if (filteredCountries.length > 1 && filteredCountries.length < 10) {
      return (
        <ul>
          {filteredCountries.map(country => (
            <li key = {country.name}>
              {country.name}
              <button onClick = {() => setSearchInput(country.name)}>show</button>
            </li>
            ))
          }
        </ul>
      )
    } else {
      return <div>Too many matches, specify another filter</div>
    }
}

export default DisplayCountries
