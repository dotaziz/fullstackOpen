import Part from "./Part"

const Content = (props) => {
    return (
        <div>
            <Part part={props[0].part1} exercise={props[0].exercises1}/>
            <Part part={props[1].part2} exercise={props[1].exercises2}/>
            <Part part={props[2].part3} exercise={props[2].exercises3}/>
        </div>
    )
}

export default Content