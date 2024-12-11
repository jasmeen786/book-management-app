import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 


 
const Form = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [highlighted, setHighlighted] = useState(true);
 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
 
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
    const response = await fetch('http://localhost:7000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)    
    });
 
    if (!response.ok) {    // Handle login failure
      const data = await response.json();
      setError(data.message || 'Login failed');
      return;
    }
    const data = await response.json();
    setToken(data.token);  
    localStorage.setItem('token', data.token);
    navigate('/admin-panel');
 
    setError('');
  } catch (err) {
    console.error('Login failed', err);
    setError('An error occurred while logging in');
  }
 
  }
 
  
 
  function handleReset() {
    setFormData({
      username: "",
      password: "",
    });
  }
 
  function handleChange(e) {
    const { name, value } = e.target;
 
    setFormData((prevData) => ({
      ...prevData, 
      [name]: value,
    }));
  }
  return (
    <div >
    <form onSubmit={handleSubmit} >
       
      <input
        label="User Name"
        typeName="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      ></input>
      <br />
      <input
        label="Password"
        typeName="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      ></input>
      <button >Login</button>
     
      {error && <p style={{fontSize: 'larger', color:'Red'}}>{error}</p>}
    </form>
    </div>
 
  );
};
 
export default Form;
