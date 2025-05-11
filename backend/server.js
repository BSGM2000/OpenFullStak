const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001; // Elige un puerto diferente al de tu frontend (e.g., 3001)

// Middleware para habilitar CORS (permite peticiones desde diferentes dominios/puertos)
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// Simulación de una base de datos en memoria (reemplazar con una base de datos real)
let persons = [
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-123456' }
];

// GET para obtener todos los contactos
app.get('/api/persons', (req, res) => {
    res.json(persons);
});

// GET para obtener un contacto por ID
app.get('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const person = persons.find(p => p.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).send({ error: 'Contacto no encontrado' });
    }
});

// DELETE para eliminar un contacto por ID
app.delete('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    persons = persons.filter(p => p.id !== id);
    res.status(204).end();
});
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0;
    return maxId + 1;
}
// POST para agregar un nuevo contacto
app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(400).json({ error: 'Nombre y número son requeridos' });
    }
    const id = generateId(); // Generar un ID simple
    const newPerson = { id, name, number };
    persons.push(newPerson);
    res.status(201).json(newPerson);
});

// PUT para actualizar un contacto por ID (ejemplo básico)
app.put('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, number } = req.body;
    persons = persons.map(p => p.id === id ? { ...p, name, number } : p);
    const updatedPerson = persons.find(p => p.id === id);
    if (updatedPerson) {
        res.json(updatedPerson);
    } else {
        res.status(404).send({ error: 'Contacto no encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});