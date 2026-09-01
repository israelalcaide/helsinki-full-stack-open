import { useState, useEffect } from 'react'
import personService from './services/persons'


const Filter = (props) => {
	return (
		<div>
			filter shown with <input value={props.filter} onChange={props.handleFilterChange} />
		</div>
	)
}

const PersonForm = (props) => {
	return (
		<form onSubmit={props.addPerson}>
			<div>
				name: <input value={props.newName} onChange={props.handleNameChange} />
			</div>
			<div>
				number: <input value={props.newNumber} onChange={props.handleNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

const Persons = (props) => {
	return (
		<div>
			{props.persons.map(person => (
				<p key={person.id} >{person.name} {person.number}</p>
			))}
		</div>
	)
}


const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')


	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

	useEffect(() => {
		const promise = personService.getAll()

		promise.then(response => {
			setPersons(response.data)
		})

	}, [])

	const addPerson = (event) => {
		event.preventDefault()

		const personObject = {
			name: newName,
			number: newNumber
		}

		if (persons.some(person => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
		}
		else {
			const promise = personService.create(personObject)

			promise.then(response => {
				setPersons(persons.concat(response.data))
			})
			
		}

		setNewName('')
		setNewNumber('')
	}

	const filterPersonsToShow = persons.filter(person =>
		person.name.toLowerCase().includes(filter.toLowerCase()))

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter
				filter={filter}
				handleFilterChange={handleFilterChange} />
			<h3>add a new</h3>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange} />
			<h3>Numbers</h3>
			<Persons
				persons={filterPersonsToShow} />
		</div>
	)
}

export default App