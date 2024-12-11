import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import AdminPanel from './pages/AdminPanel';
import BookForm from './pages/BookForm';
import EditBookForm from './pages/EditBookForm';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<h1>Welcome to the Book Management App</h1>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/book-list" element={<BookList />} />
            {/* <Route path="/book/:id" element={<BookDetail />} /> */}
            <Route path='/bookdetails/:id' element={<BookDetail />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/add-book" element={<BookForm />} />
            <Route path="/edit-book/:id" element={<EditBookForm />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

