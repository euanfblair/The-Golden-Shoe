import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();
    const newUser = { name, email, password, address, cart: [] };
    
    try {
      await axios.post('http://localhost:5000/users/register', newUser);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data === 'Error: Email already exists!') {
        // Handle duplicate email error here
        alert('Email already exists!');
      } else {
        // Handle other errors here
        console.error(err);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '40%' }}>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Form onSubmit={register}>
            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            </Form.Group>

            <Form.Group controlId="formBasicAddress" className="mb-3">
              <Form.Control type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" required />
            </Form.Group>

            <Button variant="primary" type="submit">Register</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RegisterPage;
