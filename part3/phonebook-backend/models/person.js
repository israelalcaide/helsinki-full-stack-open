const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Connecting to MongoDb')

mongoose.connect(url).then(() => {
	console.log('connected to MongoDb')
}).catch(error => {
	console.log('error connecting MongoDb', error.message)
})

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Person = mongoose.model('Person', personSchema)


module.exports = Person