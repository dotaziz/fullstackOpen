const Form = ({formProps})=>{
    const {newName,newNumber,persons,setPersons, setNewNumber ,setNewName} = formProps
    const handleSubmit = (e) =>{
        e.preventDefault()
        const personsCopy = [...persons]
        if(JSON.stringify(persons).includes(JSON.stringify({name: newName}))){
          alert(`${newName} is already added to phoneBook`)
        }else{
          personsCopy.push({
            name: newName,
            number: newNumber
          })
          setPersons(personsCopy)
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
                name: <input value={newName} onChange={handleNameChange}  />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        
            </form>
        </div>
    )
}

export default Form