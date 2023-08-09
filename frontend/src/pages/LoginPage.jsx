import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  // Function to handle the login process
  const login = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:5000/users/login', { email, password });
      
      // Save the token in local storage (or wherever you want to store it)
      localStorage.setItem('token', data.token);

      navigate('/');
      
    } catch (err) {
      // Handle error here
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '40%' }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={login}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            </Form.Group>

            <Button variant="primary" type="submit">Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginPage;
