const express = require('express')

const app = express()

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)
    const getPerson = persons.filter((person)=> person.id === Number(id))

    console.log(getPerson)

    if(getPerson.length !== 0){
        res.json(getPerson)
    }else{
        res.status(404).end()
    }
})

app.get('/info',(req,res)=>{
    const time = new Date()
    res.send(
        `<p>Phonebook has info for ${persons.length} people<p>
         <p>${time}</p>
        `
    )
})

const PORT = 3001

app.listen(PORT,()=>{
    console.log('server started')
})