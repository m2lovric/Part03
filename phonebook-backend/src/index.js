import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors());

let persons = [
  { name: 'Arto Hellas', number: '040-123456', id : 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id : 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id : 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id : 4 }
]

app.use(express.json());

const middleware = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
})

app.use(middleware);

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

app.post('/api/persons', (req, res) => {
  const find = persons.find(el => el.name === req.body.name);
  console.log(find);
  if(!req.body.name || !req.body.number || !req.body){
    return res.status(400).json({error: 'content is missing'});
  }else if(find){
    return res.status(400).json({error: 'name must be unique'});
  }else{
    const person = {
      name: req.body.name,
      number: req.body.number,
      id: Math.floor(Math.random() * 100000000)
    }
  
    persons = persons.concat(person);
    res.json(person);
  }  
})

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log("Server running on port 3030");
})