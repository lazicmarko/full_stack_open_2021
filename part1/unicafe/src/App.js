import React, { useState } from 'react';

const Header = ({name}) => <h1>{name}</h1>

const Button = ({handleClick, name}) => <button onClick = {handleClick}>{name}</button>

const SingleStat = ({name, value}) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad;

  if (total > 0) {
    let average = (good - bad) / total;

    return (
      <table>
        <tbody>
          <SingleStat name = "good" value = {good} />
          <SingleStat name = "neutral" value = {neutral} />
          <SingleStat name = "bad" value = {bad} />
          <SingleStat name = "all" value = {total} />
          <SingleStat name = "average" value = {average.toFixed(1)} />
          <SingleStat name = "positive" value = {(good / total * 100).toFixed(1) + '%'} />
        </tbody>
      </table>
    )
  }
  return (
    <p>No feedback given</p>
  )



}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => {
    setGood(good + 1);
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  }

  const increaseBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Header name = "give feedback" />
      <Button handleClick = {increaseGood} name = "good" />
      <Button handleClick = {increaseNeutral} name = "neutral" />
      <Button handleClick = {increaseBad} name = "bad" />
      <Header name = "statistics" />
      <Statistics
        good = {good}
        neutral = {neutral}
        bad = {bad}
        />
    </div>
   );
}

export default App;
