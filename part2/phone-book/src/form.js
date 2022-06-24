import phoneBookService from './services/phonebook'
const Form = ({formProps})=>{
    const {newName,newNumber,persons,setPersons, setNewNumber ,setNewName} = formProps
    const handleSubmit = (e) =>{
        e.preventDefault()
        const personsCopy = [...persons]
        if(JSON.stringify(personsCopy).includes(newName)){
          // eslint-disable-next-line no-restricted-globals
          let auth = confirm(`${newName} is already added to phoneBook, do you want to replace the old number with a new one?`)
          if(auth){
            let id = personsCopy.find((person)=> person.name === newName)
            phoneBookService.edit({
              id:id.id,
              name: newName,
              number: newNumber
            })
            .then(res=>{
              phoneBookService.getAll()
            .then(res=>{
              setPersons(res.data)
            })
            })

          }
        }else{
          personsCopy.push({
            name: newName,
            number: newNumber
          })
          phoneBookService.add({
            name: newName,
            number: newNumber
          })
          .then(()=>{
            alert(`${newName} added`)
            phoneBookService.getAll()
            .then(res=>{
              setPersons(res.data)
            })
          })
          .catch(err=>{
            console.log(err)
          })
        }
    
    }
    const handleNumberChange = (e)=>{
        setNewNumber(e.target.value)
      }
    
      const handleNameChange = (e)=>{
        setNewName(e.target.value)
      }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div>
                name: <input required value={newName} onChange={handleNameChange}  />
            </div>
            <div>
                number: <input required value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        
            </form>
        </div>
    )
}

export default Form