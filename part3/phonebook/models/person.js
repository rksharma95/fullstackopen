const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true})
    .then(result => console.log('connected to mongoDB'))
    .catch(error => console.log('error connecting to mongoDB',error.message))

const personSchema = new mongoose.Schema({
    name: {type:String, unique:true, minLength: 3, required: true},
    number: {type: String, minLength: 8}
})

personSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__V
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = {Person}