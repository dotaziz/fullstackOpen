import { useState } from 'react'
import Filter from './filter'
import Form from './form'
import Phonebook from './phonebook'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newSearch, setSearch] = useState('')

  formProps = {
    persons,
    setPersons,
    setNewName,
    setNewNumber,
    newName,
    newNumber
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setSearch={setSearch} />
      <h4>Add a new person</h4>
      <Form formProps={formProps} />
      <Phonebook newSearch={newSearch} persons={persons} />
    </div>
  )

}

let formProps ={}

export default App