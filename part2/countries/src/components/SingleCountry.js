import React from 'react';
import Weather from './Weather'

const SingleCountry = ({country}) => {
  return (
    <div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h3>languages</h3>
    <ul>
      {country.languages.map(language => (
        <li key = {language.name}>{language.name}</li>
      ))}
    </ul>
    <img src={country.flag} alt = {`${country.name} flag`} width = '100px'/>
    <Weather capital = {country.capital} />
  </div>
  )
}

export default SingleCountry
