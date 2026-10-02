require('dotenv').config()

const Person = require('./models/person')

const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request) => {
	if (request.method === 'POST') { 
			return JSON.stringify(request.body)
	}
	return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms  :body'))

const PORT = process.env.PORT || 3001

let persons = [
	{
		"id": "1",
		"name": "Arto Hellas",
		"number": "040-123456"
	},
	{
		"id": "2",
		"name": "Ada Lovelace",
		"number": "39-44-5323523"
	},
	{
		"id": "3",
		"name": "Dan Abramov",
		"number": "12-43-234345"
	},
	{
		"id": "4",
		"name": "Mary Poppendieck",
		"number": "39-23-6423122"
	}
]


app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
	response.json(persons)
	})
})

app.get('/info', (request, response) => {
	
	const agenda = persons.length
	const date = new Date()
	response.send(`Phonebook has info for ${agenda} people <br/> ${date}`)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id

	const person = persons.find(person => person.id === id)
	if (person) {
		response.json(person)
	}
	else {
		response.status(404).end()
	}

})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id

	persons = persons.filter(person => person.id !== id)
	response.status(204).end()

})

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json(
			{ error: 'Name or Number are missing'})
	}

	const person = new Person({
		name: body.name,
		number: body.number
	})

	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
	console.log('Exercise 3.14')
})
