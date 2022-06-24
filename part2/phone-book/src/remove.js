import PhoneBookService from './services/phonebook'

const Remove = ({id, setPersons,name,setMessage})=>{

    function removePerson (id,name){
        // eslint-disable-next-line no-restricted-globals
        let auth = confirm(`are you sure you want to remove ${name}?`)

        if(auth){
            PhoneBookService.remove({id})
            .then(()=>{
                setMessage({
                    error: false,
                    success:true,
                    message:`removed ${name}`
                })
                setTimeout(() => {
                    setMessage('start')
                },2000);
            })
            .catch(err=>{
                setMessage({
                    error:true,
                    success:false,
                    message:`information of ${name} has already been removed from server `,
                })
                setTimeout(()=>{
                    setMessage('start')
                },2000)
                console.log(err)
            })
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