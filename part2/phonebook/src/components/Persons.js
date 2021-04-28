import React from 'react';
import Person from './Person'
import personService from '../services/persons'


const Persons = ({persons, setPersons, searchInput, setMessage}) => {
  const deletePerson = (person) => {
    let newMessage = {}

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then((response) => {
          newMessage.text = `Deleted ${person.name}`
          newMessage.classname = 'success'
          setPersons(persons.filter(p => p.id !== person.id))
          setMessage(newMessage)
          setTimeout(() => {
            setMessage(null)
          }, 3000);
        })
        .catch(err => {
          newMessage.text = `An error has ocurred while deleting`
          newMessage.classname = 'error'
          setMessage(newMessage)
          setTimeout(() => {
            setMessage(null)
          }, 3000);
        });
      }
    }

  if (searchInput) {
    return (
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase()))
                .map(filtered =>
                  <Person person = {filtered} key = {filtered.name} deletePerson = {deletePerson} />
                )}
      </ul>
  )
}
  return (
    <ul>
        {persons.map(person =>
          <Person person = {person} key = {person.name} deletePerson = {deletePerson}/>
        )}
    </ul>
  )
}

export default Persons;
