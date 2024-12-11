import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const isAuthenticated = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('role') === 'admin';

  useEffect(() => {
    axios.get('http://localhost:7000/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:7000/books/${id}`)
      .then(() => setBooks(books.filter(book => book.id !== id)))
      .catch(err => console.error('Error deleting book', err));
  };

  
  const filteredBooks = books.filter(book => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query) || 
      book.publicationDate.includes(query)
    );
  });

  return (
    <div>
      <h2>Book List</h2>
      
      
      <div>
        <input
          type="text"
          placeholder="Search by title, author, keyword, or date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

    
      <div className="bookListContainer">
        {filteredBooks.map(book => (
          <div key={book.id}>
            <Link to={`/bookdetails/${book.id}`}>
              <img src={book.coverImage} alt={book.title} className="booklistImg" />
              <h1>{book.title}</h1>
            </Link>
            {isAdmin && (
              <>
                <Link to={`/edit-book/${book.id}`}>Edit</Link>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>

      
      {filteredBooks.length === 0 && <p>No books found matching your search criteria.</p>}
    </div>
  );
};

export default BookList;
