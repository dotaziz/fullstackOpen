import Content from "./content"
import Header from "./header"

const Course = ({courses}) => {
    console.log(courses)
    return (
        <>
            <h1>Web development curriculum</h1>
            {courses.map((course)=>{
                return(
                <div key={course.id + 2}>
                <Header header={course.name} key={course.id} />
                <Content parts={course.parts} key={course.id + 1} />
                </div>
                )
            })}
        </>
    )
}

export default Course