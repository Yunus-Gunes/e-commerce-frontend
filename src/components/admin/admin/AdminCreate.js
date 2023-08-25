
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

import AdminPanelComponent from '../AdminPanelComponent';

const AdminCreate = () => {

    const [responseText, setResponseText] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminAddress, setAdminAddress] = useState('');


    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();



        if (!adminEmail || adminEmail === "") {

            setErrorMessage("Please check Email.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        } else if (!adminPassword || adminPassword === "") {

            setErrorMessage("Please check Password.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        } else if (!adminAddress || adminAddress === "") {

            setErrorMessage("Please check Address.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        } else {
            setErrorMessage('');
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/auth/signup',
                {
                  userEmail: adminEmail,
                  userPassword: adminPassword,
                  userAddress: adminAddress,
                  role: "ADMIN"
                }
              );



            if (response.status === 200) {
                setResponseText("result"); // Set the response from the API

                // Clear form inputs and show success message
                setAdminEmail('');
                setAdminAddress('');
                setAdminPassword('');



                setTimeout(() => {
                    setResponseText('');
                }, 2000);
            } else {
                // Handle error cases if necessary
                console.log("Admin creation failed:", "result");
            }

        } catch (error) {

            console.log("Admin creation failed:", error);
        }
    };

    return (
        <div>
            <AdminPanelComponent />

            <div>
                <Container>
                    <Row className="vh-100 d-flex justify-content-center align-items-center">
                        <Col md={8} lg={6} xs={12}>
                            <Card className="px-4">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-center text-uppercase ">
                                            Create Admin
                                        </h2>
                                        <div className="mb-3">
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center">
                                                        Admin Email
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="Email"
                                                        value={adminEmail}
                                                        onChange={(e) => setAdminEmail(e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label className="text-center">
                                                        Admin Password
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Password"
                                                        value={adminPassword}
                                                        onChange={(e) => setAdminPassword(e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicAddress">
                                                    <Form.Label className="text-center">
                                                        Admin Address
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Address"
                                                        value={adminAddress}
                                                        onChange={(e) => setAdminAddress(e.target.value)}
                                                    />
                                                </Form.Group>

                                                <div className="d-grid mt-3">
                                                    <Button variant="primary" type="submit">
                                                        Create Admin
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>

                            {responseText && (
                                <div className="mt-3 text-center text-success">
                                    Admin has been successfully created!
                                </div>
                            )}

                            {errorMessage && <p className="text-danger">{errorMessage}</p>}

                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default AdminCreate;
