import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [message, setMessage] = useState(null);

useEffect(() => {
  personService
    .getAll()
    .then(response => {
      setPersons(response.data);
    })
}, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message} />
      <Filter
        searchInput = {searchInput}
        setSearchInput = {setSearchInput}
        />
      <h2>add a new</h2>
      <PersonForm
        persons = {persons}
        setPersons = {setPersons}
        setMessage = {setMessage}
        />
      <h2>Numbers</h2>
      <Persons
        persons = {persons}
        setPersons = {setPersons}
        searchInput = {searchInput}
        setMessage = {setMessage}
        />
    </div>
  )
}

export default App
