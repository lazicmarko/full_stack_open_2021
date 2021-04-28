const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the proper password: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =
  `mongodb+srv://fullstack:${password}@cluster0.5fvsz.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const getUsers = () => {
  Person
  .find({})
  .then(result => {
    console.log('phonebook:');
    result.forEach(note => {
      console.log(`${note.name} ${note.number}`)
    })
mongoose.connection.close()
})
}

if (name && number) {
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`added ${person.name} number: ${person.number} to phonebook`);
    getUsers();
  })
} else {
  getUsers();
}


