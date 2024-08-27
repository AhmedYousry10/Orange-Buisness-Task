# Bookstore Application

## Overview

This project involves building a full-stack bookstore application with a responsive Angular frontend and a Node.js backend. The application features the following:

- **Angular Frontend**: Utilizes Bootstrap for styling.
- **Node.js REST API**: Manages CRUD operations for authors and books.

## Angular Frontend

### Home Page

- Displays a list of all available books.
- Each book entry includes:
  - Title
  - Image
  - Author information
- Features:
  - Filter books by author.
  - Search for a specific book by title.

### Authors Page

- Displays a paginated list of authors from the "Authors" table.
- Features:
  - Pagination to show a limited number of authors per page.
  - Option to add a new author.

### Author Details Page

- Displays detailed information about a selected author, including:
  - Name
  - Email
  - Bio
- Lists all books written by the author.
- Features:
  - Buttons to add, edit, and delete books.
  - Options to update and delete the author.

### Book Details Page

- Displays detailed information about a selected book, including:
  - Title
  - Description
  - Author's name

## Node.js REST API

### Endpoints

- **Authors Endpoints**:

  - `http://localhost:4000/api/authors` - Retrieve a list of authors.
  - `http://localhost:4000/api/authors/:id` - Retrieve details of a specific author.
  - `http://localhost:4000/api/authors/addauthor` - Create a new author.
  - `http://localhost:4000/api/authors/editauthor/:id` - Update an existing author.
  - `http://localhost:4000/api/authors/deleteauthor/:id` - Delete an author.

- **Books Endpoints**:
  - `http://localhost:4000/api/books/` - Retrieve a list of books.
  - `http://localhost:4000/api/books/:id` - Retrieve details of a specific book.
  - `http://localhost:4000/api/books/addbook` - Create a new book.
  - `http://localhost:4000/api/books/editbook/:id` - Update an existing book.
  - `http://localhost:4000/api/books/deletebook/:id` - Delete a book.

### Database

- Establishes relationships between the "Authors" and "Books" tables to support the application features and API operations.

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AhmedYousry10/Orange-Buisness-Task.git
   ```

# Developer Info

- Ahmed Yousry Helal
- +201007458070
- ahmedu3helal@gmail.com
