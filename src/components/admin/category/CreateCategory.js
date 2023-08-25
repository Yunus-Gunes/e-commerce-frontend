
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

import AdminPanelComponent from '../AdminPanelComponent';

const CreateCategpory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [createdCategoryName, setCreatedCategoryName] = useState('');

    const [responseText, setResponseText] = useState('');

    const [errorMessage, setErrorMessage] = useState('');


    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (categoryName == "" || !categoryName) {
            setErrorMessage("Please check Category Name.");
            setTimeout(() => {
              setErrorMessage('');
            }, 3000);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/category/create",
                {
                    categoryName: categoryName
                }
            );

            

            if (response.status === 200) {
                setResponseText("result"); // Set the response from the API

                // Clear form inputs and show success message
                setCategoryName('');

                setCreatedCategoryName(categoryName);

                setTimeout(() => {
                    setResponseText('');
                    setCreatedCategoryName('');
                }, 2000);
            } else {
                // Handle error cases if necessary
                console.log("Category creation failed:", "result");
            }

        } catch (error) {

            console.log("Category creation failed:", error);
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
                                            Create category
                                        </h2>
                                        <div className="mb-3">
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center">
                                                        Category name
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Category name"
                                                        value={categoryName}
                                                        onChange={(e) => setCategoryName(e.target.value)}
                                                    />
                                                </Form.Group>

                                                <div className="d-grid mt-3">
                                                    <Button variant="primary" type="submit">
                                                        Create Category
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>

                            {responseText && (
                                <div className="mt-3 text-center text-success">
                                    Category '{createdCategoryName}' has been successfully created!
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

export default CreateCategpory;
