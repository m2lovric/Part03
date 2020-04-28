import express from 'express';

const app = express();

let persons = [
  { name: 'Arto Hellas', number: '040-123456', id : 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id : 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id : 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id : 4 }
]

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Phonebook API');
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${Date()}</p>
  `);
})

app.get('/api/persons', (req, res) => {
  res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find(el => el.id === id);
  if(person){
    res.json(person);
  }else{
    res.status(404).end();
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  persons = persons.filter(el => el.id !== id);

  res.status(204).end();
})

const PORT = 3030;

app.listen(PORT, () => {
  console.log("Server running on port 3030");
})