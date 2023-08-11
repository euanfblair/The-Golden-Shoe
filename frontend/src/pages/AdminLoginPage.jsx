import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';

function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:5000/admin/adminLogin', { username, password });
      
      // Admin logged in successfully. Redirect to admin dashboard or wherever you like
      navigate('/admin/dashboard');
      
    } catch (err) {
      // Handle error here
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '40%' }}>
        <Card.Body>
          <Card.Title>Admin Login</Card.Title>
          <Form onSubmit={login}>
            <Form.Group controlId="formBasicUsername" className="mb-3">
              <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
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

export default AdminLoginPage;
