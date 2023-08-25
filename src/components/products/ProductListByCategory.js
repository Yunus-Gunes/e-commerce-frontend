import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Accordion, Button } from "react-bootstrap";

const ProductsByCategoryComponent = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedCategoryButton, setSelectedCategoryButton] = useState("");

    const token = localStorage.getItem("token");


    /*
        useEffect(() => {
            console.log(token); // Token değerini kontrol etmek için konsola yazdırın
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/category/categories',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    
                    "Content-Type": "application/json"
                }
            };
    
     
    
    
            axios.request(config)
                .then((response) => {
                    //console.log(JSON.stringify(response.data));
                    setCategories(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
    
        }, []);
    
        */


    useEffect(() => {
        axios.get("http://localhost:8080/category/categories", {

            headers: {

                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token]);




    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0].categoryId); // İlk kategoriye varsayılan olarak seçili
        }
    }, [categories]);



    useEffect(() => {
        if (!selectedCategory) { // Eğer kategori seçilmemişse tüm ürünleri getir
            axios.get("http://localhost:8080/product/products", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        } else {
            axios.get("http://localhost:8080/product/byCategory/" + selectedCategory, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching products by category:', error);
                });
        }


    }, [selectedCategory, token]);




    const handleCategoryChange = (event, categoryId) => {
        setSelectedCategoryButton(categoryId);
        setSelectedCategory(categoryId);
    };

    return (
        <Container>
            <h1>Ürün Listesi</h1>
            <div>
                <h2>Kategori Seçin:</h2>
                <div>
                    <Button
                        variant={selectedCategoryButton === "" ? "primary" : "outline-primary"}
                        style={{ marginRight: '10px' }}
                        onClick={event => handleCategoryChange(event, "")}
                    >
                        Hepsi
                    </Button>
                    {categories.map(category => (
                        <Button
                            key={category.categoryId}
                            variant={selectedCategoryButton === category.categoryId ? "primary" : "outline-primary"}
                            style={{ marginRight: '10px' }}
                            onClick={event => handleCategoryChange(event, category.categoryId)}
                        >
                            {category.categoryName}
                        </Button>
                    ))}

                </div>
            </div>
            <div>
                <h2>Ürünler</h2>
                <Row>
                    {products.map(product => (
                        <Col key={product.productId} xs={6} sm={4} md={3} lg={3}>
                            <Link to={`/product/${product.productId}`} style={{ textDecoration: 'none' }}>
                                <Card style={{ width: '100%', cursor: 'pointer', marginBottom: '15px' }}>
                                    <Card.Img
                                        variant="top"
                                        src={`http://localhost:8080/product/take/${product.productId}`}
                                        alt="Görsel"
                                        style={{ objectFit: 'cover', height: '150px' }} // Adjust styling as needed
                                    />
                                    <Card.Body>
                                        <Card.Title>{product.productName}</Card.Title>
                                        <Card.Text>Price: {product.productPrice}TL</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>


        </Container>
    );
}

export default ProductsByCategoryComponent;

