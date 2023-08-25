import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';


const LoginComponent = () => {
  const [email, setEmail] = useState('a3@a');
  const [password, setPassword] = useState('123');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Get access to the navigate function


  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/signin',
        {
          userEmail: email,
          userPassword: password,
        }
      )

      const jsonResponse = response.data;
      const token = jsonResponse.token;

      localStorage.setItem('token', token);
      const decodedToken = jwt_decode(token);

      const userId = decodedToken.userId;
      localStorage.setItem('userId', userId);

      if (jsonResponse.userId !== 0 && jsonResponse.userId !== null) {
        setUserId(userId);

        if(decodedToken.role == "USER"){
          navigate('/product/byCategory');
        } else if (decodedToken.role == "ADMIN"){
          navigate('/adminpanel');
        }
        
      } else {
        console.log("Kullanıcı id bulunaması");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log("Giriş başarısız: Invalid credentials");
      } else {
        console.error("Bir hata oluştu:", error);
      }
    }
  };

  useEffect(() => {
    if (userId !== null) {
      console.log("UserID updated:", userId);
    }
  }, [userId]);


  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    sign in
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleLogin}>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3"controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Log in
                        </Button>
                      </div>
                      
                    </Form>
  
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

export default LoginComponent;

