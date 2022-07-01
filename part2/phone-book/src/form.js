import phoneBookService from './services/phonebook'
const Form = ({formProps})=>{
    const {newName,newNumber,persons,setPersons, setNewNumber ,setNewName,setMessage} = formProps
    const handleSubmit = (e) =>{
        e.preventDefault()
        const personsCopy = [...persons]
        if(JSON.stringify(personsCopy).includes(JSON.stringify({name: newName}))){
          // eslint-disable-next-line no-restricted-globals
          let auth = confirm(`${newName} is already added to phoneBook, do you want to replace the old number with a new one?`)
          if(auth){
            let id = personsCopy.find((person)=> person.name === newName)
            phoneBookService.edit({
              id:id.id,
              name: newName,
              number: newNumber
            })
            .then(()=>{
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
            phoneBookService.getAll()
            .then(res=>{
              setMessage({
                error: false,
                success: true,
                message: `added ${newName}`,
              })
              setTimeout(()=>{
                setMessage('start')
              },2000)
              setPersons(res.data)
            })
          })
          .catch(err=>{
            console.log(err.response.data.message)
            setMessage({
              error: true,
              success: false,
              message: err.response.data.message
            })
            setTimeout(()=>{
              setMessage('start')
            },2000)
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
                number: <input required type='tel' value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        
            </form>
        </div>
    )
}

export default Form