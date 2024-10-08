const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 80; // EC2 instances will listen on port 80

app.use(bodyParser.json());

let todos = [];
let id = 1;

// Create a new todo
app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    const newTodo = { id: id++, title, description };
    todos.push(newTodo);
    res.status(201).json({ message: 'Todo created', todo: newTodo });
});

// Get all todos
app.get('/todos', (req, res) => {
    res.json({ todos });
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== todoId);
    res.json({ message: `Todo with id ${todoId} deleted` });
});

// Start the server
app.listen(80, () => {
    console.log('Server running on port 80');
  });
  
