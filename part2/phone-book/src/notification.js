const Notification = ({message}) => {

    const errorStyles ={
        padding: '10px',
        border: '2px solid red',
        color: 'red',
        display : 'block'
    }

    const successStyles = {
        padding:'10px',
        border: '2px solid green',
        color: 'green'
    }

    if(message === 'start'){
        return <></>
    }else if(message.error){
        return <p style={errorStyles}>{message.message}</p>
    }else if(message.success){
        return <p style={successStyles}>{message.message}</p>
    }
}

export default Notification