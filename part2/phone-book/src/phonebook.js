import Remove from "./remove"

const Phonebook = ({newSearch, persons, setPersons})=>{
    return(
        <div>
            <h2>Numbers</h2>
            {
                newSearch? persons.filter((person,i)=>
                    new RegExp(newSearch,'i').exec(person.name)
                )
                .map((person,index)=><p key={index}>{person.name} {person.number}</p>) : 
                persons.map((person,index)=> <p key={index}>{person.name} {person.number}
                <Remove id={person.id} name={person.name} setPersons={setPersons} />
                </p>)
            }
        </div>
    )
}

export default Phonebook