const express = require('express');
const sql = require('mssql');
const router = express.Router();
const { config } = require('../database/db');

// Define get all authors route
router.get('/', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Authors');
        res.json(result.recordset);
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Define get author by ID route
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Authors WHERE AuthorID = @id');
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Author not found' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Define add author route
router.post('/addauthor', async (req, res) => {
    const { Name, Email, Bio } = req.body;

    if (!Name || !Email) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }

    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('Name', sql.NVarChar, Name)
            .input('Email', sql.NVarChar, Email)
            .input('Bio', sql.NVarChar, Bio)
            .query('INSERT INTO Authors (Name, Email, Bio) VALUES (@Name, @Email, @Bio)');
        res.status(201).json({ message: 'Author added successfully' });
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Define edit author route
router.put('/editauthor/:id', async (req, res) => {
    const { id } = req.params;
    const { Name, Email, Bio } = req.body;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('Name', sql.NVarChar, Name)
            .input('Email', sql.NVarChar, Email)
            .input('Bio', sql.NVarChar, Bio)
            .query('UPDATE Authors SET Name = @Name, Email = @Email, Bio = @Bio WHERE AuthorID = @id');
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Author not found' });
        }

        res.json({ message: 'Author updated successfully' });
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Define delete author route
router.delete('/deleteauthor/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Authors WHERE AuthorID = @id');
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Author not found' });
        }

        res.json({ message: 'Author deleted successfully' });
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
