import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetail.css'

const BookDetail = () => {
  const [book, setBook] = useState({});
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  useEffect(() => {
    
    axios.get(`http://localhost:7000/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="book-detail">
      <button onClick={()=>{navigate('/book-list')}}>Go Back</button>
      <h2>{book.title}</h2>
      <img src={book.coverImage} style={{width: '20%', height: '30%'}}/>
      <h3>by {book.author}</h3>
      <p><strong>Description:</strong> {book.description}</p>
    </div>
  );
};

export default BookDetail;
