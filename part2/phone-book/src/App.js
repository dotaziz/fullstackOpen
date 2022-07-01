import { useState,useEffect } from 'react'
import Filter from './filter'
import Form from './form'
import Phonebook from './phonebook'
import PhoneBookService from './services/phonebook'
import Notification from './notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newSearch, setSearch] = useState('')

  const [message,setMessage] = useState({})

  useEffect(()=>{
    PhoneBookService.getAll()
    .then(res=>{
      setPersons(res.data)
    })
    .catch(err=>{
      // console.log(err)
      setMessage({
        error: true,
        success: false,
        message: err.message
      })
      setTimeout(()=>{
        setMessage('start')
      },2000)
    })
  },[])

  const formProps = {
    persons,
    setPersons,
    setNewName,
    setNewNumber,
    newName,
    newNumber,
    setMessage,
  }

  return (
    
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} persons={persons} />
      <Filter newSearch={newSearch} setSearch={setSearch} />
      <h4>Add a new person</h4>
      <Form formProps={formProps} />
      <Phonebook newSearch={newSearch} persons={persons} setPersons={setPersons} setMessage={setMessage} />
    </div>
  )

}

export default App