
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

import AdminPanelComponent from '../AdminPanelComponent';

const DeleteCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [createdCategoryName, setCreatedCategoryName] = useState('');

    const [responseText, setResponseText] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [numberOfProducts, setNumberOfProducts] = useState('');

    const token = localStorage.getItem('token');

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    
    const takeCategoryById = async (e) => {
        e.preventDefault();

        if (categoryId == "" || !categoryId) {
            setErrorMessage("Please check Category Id.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        try {
            const response = await axios.get(
                "http://localhost:8080/category/" + categoryId
            );

            if (response.status === 200) {

                setCategoryName(response.data.categoryName);

                setNumberOfProducts(response.data.products.length)

                setErrorMessage("The category with id " + categoryId + " was brought");
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            }

        } catch (error) {

            if (error.response.status === 400) {

                setCategoryName('');
                setCategoryId('');

                setErrorMessage("Category not found.");
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000);
                return;
            }

            console.log("Category creation failed:", error);
        }
    };

    const handleDeleteConfirmation = () => {
        setShowDeleteConfirmation(true);
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirmation(false);
    };

    const handleDeleteCategory = async () => {
        setShowDeleteConfirmation(false); // Close the confirmation dialog

        if (categoryName == "" || !categoryName || categoryId == "") {
            setErrorMessage("Please check Category Name.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        try {
            const response = await axios.delete(
                "http://localhost:8080/category/delete?categoryId=" + categoryId
            );


            if (response.status === 200) {
                setResponseText("result");
                setCategoryName('');
                setCategoryId('');

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleDeleteCategory();
    };

    /*
    const handleSubmit = async (e) => {
        e.preventDefault();


        if (categoryName == "" || !categoryName || categoryId == "") {
            setErrorMessage("Please check Category Name.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        try {
            const response = await axios.delete(
                "http://localhost:8080/category/delete?categoryId=" + categoryId
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

*/


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
                                            Delete category
                                        </h2>
                                        <div className="mb-3">
                                            <Form onSubmit={takeCategoryById}>
                                                <Form.Group className="mb-3" controlId="formBasicId">
                                                    <Form.Label className="text-center">
                                                        Category Id
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Category Id"
                                                        value={categoryId}
                                                        onChange={(e) => setCategoryId(e.target.value)}
                                                    />
                                                </Form.Group>

                                                <div className="d-grid mt-3">
                                                    <Button variant="primary" type="submit">
                                                        Take Category Name
                                                    </Button>
                                                </div>
                                            </Form>
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3" controlId="formBasicName">
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
                                                <Button variant="primary" type="button" onClick={handleDeleteConfirmation}>
                                                        Delete Category
                                                    </Button>
                                                </div>
                                            </Form>

                                            {showDeleteConfirmation && (
                                                <div className="mt-3 text-center">
                                                    <p> There are currently {numberOfProducts} products in this category. </p>
                                                    <p>Are you sure you want to delete the category '{categoryName}'?</p>
                                                    <div className="d-grid mt-3">
                                                        <Button variant="danger" onClick={handleDeleteCategory}>
                                                            Confirm Delete
                                                        </Button>
                                                        <Button variant="secondary" onClick={handleDeleteCancel}>
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>

                            {responseText && (
                                <div className="mt-3 text-center text-success">
                                    Category '{createdCategoryName}' has been successfully deleted!
                                </div>
                            )}

                            {errorMessage && <p className="text">{errorMessage}</p>}

                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default DeleteCategory;
