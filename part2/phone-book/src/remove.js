import PhoneBookService from './services/phonebook'

const Remove = ({id, setPersons,name})=>{

    function removePerson (id,name){
        // eslint-disable-next-line no-restricted-globals
        let auth = confirm(`are you sure you want to remove ${name}?`)

        if(auth){
            PhoneBookService.remove({id})
            .then()
        .then(()=>{
            PhoneBookService.getAll()
            .then(res=>{
                setPersons(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        }
    }

    return (
        <>
        <button onClick={()=> removePerson(id,name)}>remove</button>
        </>
    )

}

export default Remove