import { useState,useEffect } from 'react'
import axios from 'axios'
import Filter from './filter'
import Form from './form'
import Phonebook from './phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newSearch, setSearch] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
    .then((response)=>{
      setPersons(response.data)
    })
  },[])


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