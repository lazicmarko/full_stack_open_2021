import React, {useState} from 'react';
import personService from '../services/persons'

const PersonForm = ({persons, setPersons, setMessage}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }
  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    let newMessage = {};
    const existingUser = persons.find(person => person.name === newPerson.name)

    if (existingUser) {
      if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number?`)) {
        const updatedUser = {...existingUser, number: newPerson.number};
        personService
          .update(existingUser.id, updatedUser)
          .then((response) => {
            setPersons(persons.map(p => p.id !== existingUser.id ? p : response.data))
            newMessage.text = `Updated ${response.data.name}`
            newMessage.classname = 'success'
            setMessage(newMessage)
            setTimeout(() => {
              setMessage(null)
            }, 5000);
            setNewName('')
            setNewNumber('')
          })
          .catch(err => {
            newMessage.text = err.response.data.error
            newMessage.classname = 'error'
            setMessage(newMessage)
            setTimeout(() => {
              setMessage(null)
            }, 5000);
          });
      }
    } else {
      personService
      .create(newPerson)
      .then(response => {
        newMessage.text = `Added ${response.data.name}`
        newMessage.classname = 'success'
        setPersons(persons.concat(response.data))
        setMessage(newMessage)
        setTimeout(() => {
          setMessage(null)
        }, 5000);
        setNewName('')
        setNewNumber('')
    })
      .catch(err => {
        newMessage.text = err.response.data.error
        newMessage.classname = 'error'
        setMessage(newMessage)
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      });
    }
  }

  return (
    <form onSubmit = {addPerson}>
    <div>
      name: <input
        value = {newName}
        onChange = {handlePersonChange}
      />
    </div>
    <div>
      number : <input
        value = {newNumber}
        onChange = {handlePhoneChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
   );
}

export default PersonForm;
