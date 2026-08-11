import { useState } from "react";


const Button = (props) => {
	return (
		<button onClick={props.handleClick}>
			{props.text}
		</button>
	)
}

const StatisticLine = (props) => {
	return (
		<tr>
			<td>{props.text}</td>
			<td>{props.value}</td>
		</tr>
	)
}

const Statistics = (props) => {
	const total = props.good + props.neutral + props.bad;

	if (total === 0) {
		return (<p>No feedback given</p>)
	}

	return (
		<table>
			<tbody>
				<StatisticLine text="good" value={props.good} />
				<StatisticLine text="neutral" value={props.neutral} />
				<StatisticLine text="bad" value={props.bad} />
				<StatisticLine text="all" value={total} />
				<StatisticLine text="average" value={(props.good - props.bad) / total} />
				<StatisticLine text="positive" value={props.good / total * 100 + " %"} />
			</tbody>
		</table>

	)
}

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);


	return (
		<div>
			<h1>give feedback</h1>
			<Button text="good" handleClick={() => setGood(good + 1)} />
			<Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
			<Button text="bad" handleClick={() => setBad(bad + 1)} />
			<h1>statistics</h1>
			<Statistics good={good}
				neutral={neutral}
				bad={bad} />
		</div>

	)
}

export default App;