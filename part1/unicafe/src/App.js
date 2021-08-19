import React, {useState} from 'react';

const Button = ({text, onClick}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Feedback = ({handleGood, handleNeutral, handleBad}) => {
  return(
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGood}/>
      <Button text="neutral" onClick={handleNeutral}/>
      <Button text="bad" onClick={handleBad}/>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  const average = (good - bad) / all
  const positive = (good/ all)*100.0

  return(
    <div>
      <table>
        <tbody>
        <tr>
          <td>
            <StatisticLine text="good" value={good}/>
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="neutral" value={neutral} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="bad" value={bad} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="all" value={all} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="average" value={average} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="positive" value={positive+'%'} />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
  }

  const handleBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <Feedback handleGood={handleGood}
                handleNeutral={handleNeutral}
                handleBad={handleBad}/>
      {
      (good===0 && neutral === 0 && bad ===0)?<p>No feedback given</p>:          
      <Statistics good={good} neutral={neutral} bad={bad} />
      }          
    </div>
       
  )
}

export default App;
