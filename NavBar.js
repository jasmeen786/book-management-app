import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';



const NavBar = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let isAuthenicated = false;
 
  if(token){
    try{
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if(decodedToken.exp < currentTime){
        localStorage.removeItem('token');
      }
      else{
        isAuthenicated = true;
      }
    }
    catch(error){
      console.error('Invalid token', error);
    }
  }
  
  function handleLogOut(){
    localStorage.removeItem('token')
    navigate('/');
  }
  

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/book-list">Books</Link></li>
     
        {isAuthenicated ? (
          <li><button onClick={handleLogOut}>Logout</button></li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
