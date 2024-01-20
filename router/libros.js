const express = require('express');
const router = express.Router();

const Libro = require('../model/libro');

const {requiredScopes} = require('express-oauth2-jwt-bearer');

// Ruta para mostrar los libros
router.get('/', requiredScopes('read:libros'), async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros' });
    }
});

// Ruta para crear libro
router.post('/', requiredScopes('write:libros'), async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el Libro' });
    }
});

// Ruta para modificar un libro
router.put('/:id', requiredScopes('write:libros'), async (req, res) => {
    try {
        const Libro = await Libro.findByIdAndUpdate(req.params.id, req.body,
        {
        new: true,
        });
    res.json(Libro);
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar el Libro' });
    }
});

// Ruta para eliminar un libro
router.delete('/:id', requiredScopes('write:libros'), async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el Libro' });
    }
});

module.exports = router;