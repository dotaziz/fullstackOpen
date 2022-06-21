const Part = ({parts}) => {
    let total= 0
    return(
        <div>
            {parts.map((part)=>{
                total +=part.exercises;
                return <p key={part.id}>{part.name} {part.exercises}</p>
            })}
            <h4>total of {total} exercises</h4>
        </div>
    )
}

export default Part