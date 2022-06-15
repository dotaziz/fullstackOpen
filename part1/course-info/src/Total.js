const Total = (props) =>{
    return (
        <div>
            <p>
                Number of excercises {props[0].excercises1 + props[1].excercises2 + props[2].excercises3 }
            </p>
        </div>
    )
}

export default Total