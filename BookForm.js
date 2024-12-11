import React, { useState, useEffect,useReducer } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './BookForm.css'

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); 
  const token = localStorage.getItem('token')
  const [showAddForm, setShowAddForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null); 
 

  const initialState = {
    title: '',
    description: '',
    publicationDate: '',
    author: '',
    coverImage: '', // For the image file
}
 
function reducer(state, action){
  console.log(action.type)
  switch (action.type){
      case 'updateField':
          return {
              ...state,
              [action.field]:action.value
          }
      case 'reset':
          return initialState
      default:
          return state
  }
}
 
 const[ notification,setNotification] = useState('')
 const GetBooks = async () => {
  try {
    const response = await fetch('http://localhost:7000/books', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.message || 'CANNOT GET BOOKS');
      return;
    }

    const data = await response.json();
    setBooks(data);
    setError('');
  } catch (err) {
    console.error('failed to get books', err);
    setError('An error occurred while getting books');
  }
};

 
const [state, dispatch] = useReducer(reducer, initialState)
const handleChange=(e)=>{
    dispatch({
        type:'updateField',
        field:e.target.name,
        value:e.target.value
    })
}


const AddBook = async (event) => {
  console.log(state)
  try {  
    
    const response = await fetch('http://localhost:7000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(state),
    });

    if (!response.ok) {
        const data = await response.json();
        setNotification(`Failed to add book: ${data.message}`);
        return;
    }

    setNotification('Book added successfully!');
    setShowAddForm(false); // Hide the form
    GetBooks(); // Refresh the list of books
  }  catch (err) {
    console.error('Failed to add book', err);
    setNotification('An error occurred while adding the book');
  }
};














  
  useEffect(() => {
    if (id) {
      axios
      .get(`http://localhost:7000/books/${id}}`)
        .then((response) => {
          const book = response.data;
          console.log(book)
          state.title = book.title;
          state.author = book.author;
          state.description = book.description;
          state.publicationDate = book.publicationDate;
          state.coverImage = book.coverImage;  
        })
        .catch((error) => {
          setErrorMessage('Failed to load book details.');
          console.error('Error fetching book:', error);
        });
    }
  }, [id]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      title: '',
      author: '',
      description: '',
      publicationDate: '',
      coverImage: ''
    };

    try {
      
      if (id) {
       
        await axios.put(`http://localhost:7000/books/id}`, bookData);
        setSuccessMessage('Book updated successfully!');
      } else {
        
        await axios.post('http://localhost:7000/books', bookData);
        setSuccessMessage('Book added successfully!');
      }
      setErrorMessage('');
      setTimeout(() => navigate('/book-list'), 2000); 
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Failed to save the book.');
      console.error('Error saving book:', error);
    }
  };

 
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:7000/books/:id`);
      setSuccessMessage('Book deleted successfully!');
      setErrorMessage('');
      setTimeout(() => navigate('/book-list'), 2000); 
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Failed to delete the book.');
      console.error('Error deleting book:', error);
    }
  };
 
 

  return (
    <div className="book-form">
            <button onClick={()=>{navigate('/admin-panel')}}>Go Back</button>

      <h2>{id ? 'Edit Book' : 'Add New Book'}</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={AddBook} className='addForm'>
        <input
          type="text"
          name='title'
          placeholder="Book Title"
          value={state.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name='author'
          placeholder="Author"
          value={state.author}
          onChange={handleChange}
          required
        />
        <textarea
          name='description'
          placeholder="Description"
          value={state.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          name='publicationDate'
          type="date"
          placeholder="Publication Date"
          value={state.publicationDate}
          onChange={handleChange}
          required
        />
        <input
        name='coverImage'
          type="url"
          placeholder="Cover Image URL"
          value={state.coverImage}
          onChange={handleChange}
          required
        />
        <button type="submit">{id ? 'Update Book' : 'Add Book'}</button>
      </form>

      {id && (
        <button onClick={handleDelete} className="delete-button">
          Delete Book
        </button>
      )}
    </div>
  );
};

export default BookForm;

