require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const { Person } = require('./models/person')
const app = express()
const PORT = process.env.PORT || 3001
const url = process.env.MONGODB_URI

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(
    function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body)
        ].join(' ')
    }
))

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(result => {
            res.send(result)
            //mongoose.connection.close()
        })
        .catch(error => {
            console.log('error getting data', error.message)
            //mongoose.connection.close()
        })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id

    Person.findOne({ _id: id })
        .then(result => {
            console.log(result)
            res.send(result)
            mongoose.connection.close()
        })
        .catch(error => {
            console.log('error getting data', error.message)
            mongoose.connection.close()
        })
}
)

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id

    Person.findByIdAndDelete(id, (err, result) => {
        if (err) {
            console.error('error deleting a record')
            next(err)
        }
        else {
            console.log('a record deleted successfully')
            res.json(result)
        }
    })
        .catch(error => next(error))



        // Person.findOne({_id:id})
        //     .then(result => {
        //         if(result){
        //             Person.deleteOne({_id:id})
        //                 .then(result => console.log(result))
        //                 .catch(error => console.log('error deleting record',error.message))
        //             //mongoose.connection.close()
        //         }
        //         else{
        //             res.status(204).end()
        //             //mongoode.connection.close()
        //         }
        //     })
        .catch(error => console.log('error deleting a record', error.message))
})

app.post('/api/persons/', (req, res) => {

    const personToAdd = new Person({ name: req.body.name, number: req.body.number })

    personToAdd.save((error, result) => {
        if (error) {
            console.error(error)
        }
        else {
            console.log(`added ${result.name} number ${result.number} to phonebook`)
            res.json(result)
        }
    })
})

app.put('/api/persons/:id', (req, res) => {
    Person.findByIdAndUpdate(req.params.id, { name: req.body.name, number: req.body.number })
        .then(result => res.json(result))
        .catch(error => next(error))
})

app.get('/info', async (req, res) => {
    let count = 0

    await Person.countDocuments({}, (err, c) => { count = c })

    const info = {
        text: `Phonebook has info for ${count} people`,
        date: new Date().toGMTString()
    }

    res.send(`<div><p>${info.text}</p><p>${info.date}</p></div>`)

})

const unknownEndPoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        res.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        res.status(400).send({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server has started on PORT:${PORT}`)
})