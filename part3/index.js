require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }

  next(error)
}

// middlewares

app.use(cors());
app.use(express.json())
app.use(express.static('build'))
morgan.token('data', (req, res) => JSON.stringify({name: req.body.name, number: req.body.number}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));


//routes

app.get('/', (request, response) => {
  response.send('<h1>Hello World !</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date();
  Person.find({})
    .then(people => {
      response.send(`
      <h3>Phonebook has ${people.length} people</h3>
      <p>${date}</p>`)
    })
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.json(people)
    })
    .catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (body.name && body.number) {
    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save()
      .then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(err => next(err))
  } else {
    return response.status(400).json({error: 'name or number missing'})
  }
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    }).catch((err) => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  console.log(body);

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(err => next(err))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
