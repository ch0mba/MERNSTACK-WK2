const express = require('express');
const app = express();
const PORT = 3000;
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocs = YAML.load('./swagger.yaml'); // Load Swagger configuration from YAML file
// Initialize Swagger documentation

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    console.log('Received a request on /');
  res.send('Hello, This is a Express.js!');
});

// Middleware
app.use((req, res, next) =>{
  console.log(`Request received at ${new Date().toISOString()}`);
  next();
});

// Routes:
app.get(`/about`, (req, res) => {
  res.send('About Us Page');
});


// Query parameters
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`Search results for: ${query}`);
});

// A RESTful API ( Representational State Transfer API) is an architectural style tha allows different software applications to communicate with each other over HTTP.
// RESTful APIs follow a stabndardized set of CRUD operations.

// GET -Retrive data from the server
// POST - Create new data on the server
// PUT - Update existing data on the server
// DELETE - Remove data from the server

// BASIC CRUD OPERATIONS
let users = [
  {id:1, name: 'Alice'},
  {id:2, name: 'Bob'},

];

//GET - retrive all users
app.get('/users', (req, res) => {
  res.json(users);
});

//GET - Retrieve a single user by ID 
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  res.json(user);
});
// POST - Create a new user
app.post('/users', (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Update an existing user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).send('User not found');
  Object.assign(user, req.body)
  res.json(user);
});

// DELETE - Remove a user
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== Number(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger documentation is available at http://localhost:${PORT}/api-docs`);
});