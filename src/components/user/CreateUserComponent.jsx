import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';



const CreateUserComponent = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();
  



  const handleCreateUser = async (e) => {
    e.preventDefault();

    console.log('Form data:',  userEmail, userPassword, userAddress);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/signup',
        {
          userEmail: userEmail,
          userPassword: userPassword,
          userAddress: userAddress,
          role: "USER"
        }
      );
      console.log('Form data:', response);
      navigate('/login-user');

    } catch (error) {
     
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    sign up
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleCreateUser}>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                        />
                      </Form.Group>
       
                      <Form.Group className="mb-3" controlId="formBasicAdresess">
                        <Form.Label className="text-center">
                          Adresess
                        </Form.Label>
                        <Form.Control
                          type="string"
                          placeholder="Enter address"
                          value={userAddress}
                          onChange={(e) => setUserAddress(e.target.value)}
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{' '}
                        <a href="/login-user" className="text-primary fw-bold">
                          Sign In
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};



export default CreateUserComponent;
