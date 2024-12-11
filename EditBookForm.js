import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditBookForm.css'

const EditBookForm = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    publicationDate: '',
    coverImage: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams(); 
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:7000/books/${id}`)
        .then((response) => {
          setBook(response.data);
        })
        .catch((error) => {
          setError('Failed to fetch book details.');
          console.error('Error fetching book:', error);
        });
    }
  }, [id]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7000/books/${id}`, book,   {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Book updated successfully!');
      setError('');
      setTimeout(() => navigate('/admin-panel'), 2000); 
    } catch (err) {
      setMessage('');
      setError('Failed to update the book.');
      console.error('Error updating book:', err);
    }
  };

  return (
    <div className="edit-form-container">
                    <button onClick={()=>{navigate('/admin-panel')}}>Go Back</button>
      <h2>Edit Book</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleUpdate} className="editform">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          name="publicationDate"
          type="date"
          placeholder="Publication Date"
          value={book.publicationDate}
          onChange={handleChange}
          required
        />
        <input
          name="coverImage"
          type="url"
          placeholder="Cover Image URL"
          value={book.coverImage}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBookForm;
