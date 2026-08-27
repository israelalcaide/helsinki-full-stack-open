import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{	name: 'Arto Hellas' ,
			number: '39-44-5323523'
		}
	])

	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const addPerson = (event) => {
		event.preventDefault()

		const personObject = {
			name: newName,
			number: newNumber
		}

		if(persons.some(person => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
		}
		else { 
			setPersons(persons.concat(personObject))
		}

		setNewName('')
		setNewNumber('')
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange}/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{persons.map(person => (
					<p key={person.name} >{person.name} {person.number}</p>
				))}
			</div>
		</div>
	)
}

export default App