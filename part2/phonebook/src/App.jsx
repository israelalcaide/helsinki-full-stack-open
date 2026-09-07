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
				<p key={person.id} >{person.name} {person.number}
					<button type="button" onClick={() => props.removePerson(person.id)}>
						delete
					</button>
				</p>
			))}
		</div>
	)
}

const Notification = ({ message }) => {
	if (message === null) {
		return null
	}

	return (
		<div className="message">
			{message}
		</div>
	)
}

const ErrorMessage = ({ message }) => {
	if (message === null) {
		return null
	}

	return (
		<div className="errorMessage" >
			{message}
		</div>
	)
}


const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [notification, setNotification] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)

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

		const foundPerson = persons.find(person => person.name === newName)
		if (foundPerson) {
			const confirmReplace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

			if (confirmReplace) {
				const updatedPerson = {
					...foundPerson,
					number: newNumber
				}

				const promise = personService.updatePerson(
					foundPerson.id,
					updatedPerson
				)

				promise.then(response => {
					setPersons(
						persons.map(person =>
							person.id !== foundPerson.id
								? person
								: response.data
						)
					)
					setNotification(`Updated ${response.data.name}`)

					setTimeout(() => {
						setNotification(null)
					}, 5000)
				})

					.catch(() => {
						setErrorMessage(`Information of ${foundPerson.name} has already been removed from the server`)

						setPersons(
							persons.filter(person => person.id !== foundPerson.id)
						)

						setTimeout(() => {
							setErrorMessage(null)
						}, 5000)
					})
			}
		}
		else {
			const promise = personService.create(personObject)

			promise.then(response => {
				setPersons(persons.concat(response.data))
				setNotification(`Added ${response.data.name}`)

				setTimeout(() => {
					setNotification(null)
				}, 5000)
			})

		}

		setNewName('')
		setNewNumber('')
	}

	const removePerson = (id) => {
		const personToDelete = persons.find(person => person.id === id)
		const confirmDelete = window.confirm(`Delete ${personToDelete.name} ?`)

		if (confirmDelete) {
			const promise = personService.removePerson(id)

			promise.then(() => {
				setPersons(persons.filter(person => person.id !== id))
				setNotification(`Information of ${personToDelete.name} has been removed from the server`)

				setTimeout(() => {
					setNotification(null)
				}, 5000)
			})
		}
	}

	const filterPersonsToShow = persons.filter(person =>
		person.name.toLowerCase().includes(filter.toLowerCase()))

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification
				message={notification} />
			<ErrorMessage
				message={errorMessage} />
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
				persons={filterPersonsToShow}
				removePerson={removePerson} />
		</div>
	)
}

export default App