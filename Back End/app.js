const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/books'); 
const authorsRoutes = require('./routes/Authors'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the /api/books routes
app.use('/api/books', booksRoutes); 
// Use the /api/authors routes
app.use('/api/authors', authorsRoutes); 

app.get('/', (req, res) => {
    res.send('Welcome to the Library API!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
