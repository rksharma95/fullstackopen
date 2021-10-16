//const { TextEncoder, TextDecoder } = require('util');
//global.TextEncoder = TextEncoder;
//global.TextDecoder = TextDecoder;
const mongoose = require('mongoose')
//var ObjectId = require('mongoose').Types.ObjectId


if(process.argv.length < 3){
    console.log('please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://fullstack:${password}@cluster0.sarqg.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true})
    
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const getAll = async () => {
    var cursor = await Person.find({ })
    return cursor
}

if(process.argv.length == 3){
   var cursor =  getAll()
    cursor.then(result => {
        console.log('phonebook:')
        //console.log(result)
        result.forEach(person => console.log(`${person.name} ${person.number}`))
        mongoose.connection.close()
    })
        .catch(err => {
            console.log(err)
            mongoose.connection.close()
        })
        
}

if(process.argv.length == 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}



