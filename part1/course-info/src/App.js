import Header from './Header'
import Content from './Content'
import Total  from './Total';

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts:[{
      part1: 'Fundamentals of React',
      excercises1: 10,
    },
    {
      part2:'Using props to pass data',
      excercises2: 7,
    },
    {
      part3: 'State of a component',
      excercises3: 14,
    }]
  
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content {...course.parts}/>
      <Total {...course.parts}/>
    </div>
  ) 
}

export default App;
