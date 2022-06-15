import { useState } from 'react'
import Button from './button'
import Statistics from './stats'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text="Good" func={ ()=>setGood(good + 1)} />
        <Button text="Neutral" func={ ()=>setNeutral(neutral + 1)} />
        <Button text="Bad" func={ ()=>setBad(bad + 1)} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App