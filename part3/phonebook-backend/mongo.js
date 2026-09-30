const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Minimum 3 arguments, password required')
	process.exit(1)
}

const password = process.argv[2]
const nameArg = process.argv[3]
const numberArg = process.argv[4]

const mongoUrl = `mongodb+srv://fullstack:${password}@cluster0.lgk2ebz.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(mongoUrl)

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
	Person.find({}).then(result => {
		console.log('phonebook:')

		result.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
	})
}

if (process.argv.length === 5) {
	const person = new Person({
		name: nameArg,
		number: numberArg
	})

	person.save().then(() => {
		console.log(`added ${nameArg} number ${numberArg} to phonebook`)
		mongoose.connection.close()
	})

}