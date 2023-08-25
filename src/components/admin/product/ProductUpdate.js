

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

import AdminPanelComponent from '../AdminPanelComponent';

const ProductUpdate = () => {
    const [categoryName, setCategoryName] = useState('');

    const [createdCategoryName, setCreatedCategoryName] = useState('');

    const [responseText, setResponseText] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategoryId, setProductCategoryId] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [createdProductName, setCreatedProductName] = useState('');



    const token = localStorage.getItem('token');



    const takeProductById = async (e) => {
        e.preventDefault();

        if (productId === "" || !productId) {
            setErrorMessage("Please check Product Id.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        try {
            const response = await axios.get(
                "http://localhost:8080/product/" + productId
            );

            if (response.status === 200) {
                const productData = response.data;

                setProductName(productData.productName);
                setProductDesc(productData.productDesc);
                setProductPrice(productData.productPrice);

                setProductCategoryId(productData.productCategoryId);

                //console.log(productData.productImages);

                const imageFiles3 = productData.productImages.map(image => ({
                    name: image.name,
                    type: image.type,
                    preview: `data:${image.type};base64,${image.picByte}`
                }));

                setImageFiles([...imageFiles, ...imageFiles3]);

                //setImageFiles(imageFiles);

                setImageFiles(imageFiles3)
                console.log(imageFiles)
                console.log(imageFiles3)

                setErrorMessage(`The product with id ${productId} was fetched.`);
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            }

        } catch (error) {
            if (error.response.status === 400) {
                setProductName('');
                setProductDesc('');
                setProductPrice('');
                setProductCategoryId('');

                setErrorMessage("Product not found.");
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
                return;
            }

            console.log("Product retrieval failed:", error);
        }
    };

    const handleProductSubmit = async (event) => {
        event.preventDefault();


        if (productPrice <= 0) {
            setErrorMessage("Please check Product Price.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        } else if (productCategoryId < 1) {

            setErrorMessage("Please check Product Category.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        } else if (!productName || productName === "") {

            setErrorMessage("Please check Product Name.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        } else if (imageFiles.length <= 0) {

            setErrorMessage("The product must have at least 1 photo.");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        } else {
            setErrorMessage('');
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const formdata = new FormData();
        const productData = {
            productId,
            productName,
            productDesc,
            productPrice,
            productCategoryId
        };

        formdata.append("product", new Blob([JSON.stringify(productData)], { type: 'application/json' }));

        imageFiles.forEach((file, index) => {
            formdata.append(`imageFile`, file);
        });

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };


        try {
            const response = await fetch("http://localhost:8080/product/update", requestOptions);
            const result = await response.text();

            if (response.status === 200) {
                setResponseText(result); // Set the response from the API

                // Clear form inputs and show success message
                setProductName('');
                setProductDesc('');
                setProductPrice(0);
                setProductCategoryId(1);
                setImageFiles([]);
                setCreatedProductName(productName);

                setTimeout(() => {
                    setResponseText('');
                    setCreatedProductName('');
                }, 2000);
            } else {
                // Handle error cases if necessary
                console.log("Product update failed:", result);
            }
        } catch (error) {
            console.log('error', error);
        }


    };


    const handleImageChange = (event) => {
        console.log(event)
        const files = event.target.files;
        setImageFiles([...imageFiles, ...files]); // Add selected files to the array
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
                                            Update product
                                        </h2>
                                        <div className="mb-3">
                                            <Form onSubmit={takeProductById}>
                                                <Form.Group className="mb-3" controlId="formBasicProductId">
                                                    <Form.Label className="text-center">Product Id</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Product Id"
                                                        value={productId}
                                                        onChange={(e) => setProductId(e.target.value)}
                                                    />
                                                </Form.Group>

                                                <div className="d-grid mt-3">
                                                    <Button variant="primary" type="submit">
                                                        Take Product Details
                                                    </Button>
                                                </div>
                                            </Form>

                                            <Form onSubmit={handleProductSubmit}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">

                                                    <Form.Label className="text-center">Product name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Product name"
                                                        value={productName}
                                                        onChange={(e) => setProductName(e.target.value)}
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail3">
                                                    <Form.Label className="text-center">Product Description</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Product Description"
                                                        value={productDesc}
                                                        onChange={(e) => setProductDesc(e.target.value)}
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Product Price</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Product Price"
                                                        value={productPrice}
                                                        onChange={(e) => {
                                                            const newPrice = parseFloat(e.target.value);
                                                            if (!isNaN(newPrice) && newPrice >= 0) {
                                                                setProductPrice(newPrice);
                                                            }
                                                        }}
                                                    />
                                                </Form.Group>


                                                <Form.Group className="mb-3" controlId="formBasicPassword2">
                                                    <Form.Label>Product Category</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Product Category"
                                                        value={productCategoryId}
                                                        onChange={(e) => {
                                                            const newCategoryId = parseInt(e.target.value, 10);
                                                            if (!isNaN(newCategoryId) && newCategoryId >= 1) {
                                                                setProductCategoryId(newCategoryId);
                                                            }
                                                        }}
                                                    />
                                                </Form.Group>


                                                <div>
                                                    <label>Image Files:</label>
                                                    <input type="file" multiple onChange={handleImageChange} />
                                                </div>




                                                <div className="d-grid mt-3">
                                                    <Button variant="primary" type="submit">
                                                        Update Product
                                                    </Button>
                                                </div>
                                            </Form>

                                        

                                            <div className="mt-3">
                                                {imageFiles.map((file, index) => (
                                                    <img
                                                        key={index}
                                                        src={file.preview}
                                                        alt={`Image ${index}`}
                                                        style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
                                                    />
                                                ))}
                                            </div>

                              
                                            
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>

                            {responseText && (
                                <div className="mt-3 text-center text-success">
                                    Category '{createdCategoryName}' has been successfully updated!
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

export default ProductUpdate;
