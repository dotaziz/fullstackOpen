const Phonebook = ({newSearch, persons})=>{
    return(
        <div>
            <h2>Numbers</h2>
            {
                newSearch? persons.filter((person,i)=>
                    new RegExp(newSearch,'i').exec(person.name)
                )
                .map((person,index)=><p key={index}>{person.name} {person.number}</p>) : 
                persons.map((person,index)=> <p key={index}>{person.name} {person.number}</p>)
            }
        </div>
    )
}

export default Phonebook