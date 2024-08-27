const express = require('express');
const sql = require('mssql');
const router = express.Router();
const { config } = require('../database/db');

// Define get all books route
router.get('/', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT Books.*, Authors.Name AS AuthorName
            FROM Books
            INNER JOIN Authors ON Books.AuthorID = Authors.AuthorID
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Define get book by ID route
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                SELECT Books.*, Authors.Name AS AuthorName
                FROM Books
                INNER JOIN Authors ON Books.AuthorID = Authors.AuthorID
                WHERE Books.BookID = @id
            `);
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Define ADD book route (retaining /addbook)
router.post('/addbook', async (req, res) => {
    const { Title, Description, AuthorID } = req.body;

    if (!Title || !Description || !AuthorID) {
        return res.status(400).json({ error: 'Title, Description, and AuthorID are required' });
    }

    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('Title', sql.NVarChar, Title)
            .input('Description', sql.NVarChar, Description)
            .input('AuthorID', sql.Int, AuthorID)
            .query('INSERT INTO Books (Title, Description, AuthorID) VALUES (@Title, @Description, @AuthorID)');
        res.status(201).json({ message: 'Book added successfully' });
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Define Edit book route (retaining /editbook/:id)
router.put('/editbook/:id', async (req, res) => {
    const { id } = req.params;
    const { Title, Description, AuthorID } = req.body;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Title', sql.NVarChar, Title)
            .input('Description', sql.NVarChar, Description)
            .input('AuthorID', sql.Int, AuthorID)
            .input('BookID', sql.Int, id)
            .query('UPDATE Books SET Title = @Title, Description = @Description, AuthorID = @AuthorID WHERE BookID = @BookID');
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({ message: 'Book updated successfully' });
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Define Delete book route (retaining /deletebook/:id)
router.delete('/deletebook/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Books WHERE BookID = @id');
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
