import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './AdminPanel.css'

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); 

 
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:7000/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(response.data);
    } catch (err) {
      setError("Failed to fetch books");
      console.error(err);
    }
  };

 
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter((book) => book.id !== id)); 
    } catch (err) {
      setError("Failed to delete book");
      console.error(err);
    }
  };

  const handleAddBook = () => {
    navigate("/add-book");
  };

 
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="admin-panel">
      <h1>Admin Panel - Manage Books</h1>
      {error && <p className="error-message">{error}</p>}

      <button onClick={handleAddBook} className="add-book-button">
        Add New Book
      </button>

      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <img
              src={book.coverImage}
              alt={book.title}
              className="book-cover"
            />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <div className="actions">
              <Link to={`/edit-book/${book.id}`} className="edit-button">
                Edit
              </Link>
              <button
                onClick={() => deleteBook(book.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;

