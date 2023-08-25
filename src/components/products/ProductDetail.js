import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const [notification, setNotification] = useState(null);
  const [baskets, setBaskets] = useState([]);
  const [basketInfo, setBasketInfo] = useState([]);

  const [responseText, setResponseText] = useState('');



  useEffect(() => {
    axios.get(`http://localhost:8080/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [productId]);

  const handleAddToBasket = async () => {
    try {
      await axios.post('http://localhost:8080/basket/create', {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'application/json'
        },

        userId: userId,
        productId: productId,
        numberOfProducts: 1

      });


      setResponseText("res"); // Set the response from the API



      setTimeout(() => {
        setResponseText('');
      }, 2000);



      console.log('Product added to basket.');
      showNotification("ürün ekledndi")
    } catch (error) {
      console.error('Error adding product to basket:', error);
    }
  };

  /*
    useEffect(() => {
      axios.get("http://localhost:8080/basket/user-baskets?userId=" + userId, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
        .then((response) => {
          setBaskets(response.data.basketProduct);
          setBasketInfo(response.data.totalBasketPrice);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const createOrder = async () => {
      try {
        await axios.post("http://localhost:8080/order/create?userId=" + userId, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
          }
        });
        setBaskets([]);
        setBasketInfo(0);
        console.log('Order created successfully.');
      } catch (error) {
        console.error('Error creating order:', error);
      }
    };
    */

  const showNotification = message => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card style={{ width: '70%' }}>
          <Row>
            <Col xs={6} style={{ padding: '20px' }}>
              <Card.Img
                variant="top"
                src={`http://localhost:8080/product/take/${product.productId}`}
                alt="Product"
                style={{ maxWidth: '500px', width: '100%' }}
              />
            </Col>
            <Col xs={6} style={{ padding: '20px' }}>
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>{product.productDesc}</Card.Text>
                <Card.Text> {product.productPrice} TL</Card.Text>
                <Button variant="primary" onClick={handleAddToBasket}>Add to Basket</Button>
              </Card.Body>
            </Col>
          </Row>
          <Button
            variant="primary"
            style={{ position: 'absolute', bottom: '10px', right: '10px' }}
            onClick={() => window.location.href = "/product/byCategory"}
          >
            Back
          </Button>
        </Card>

        {responseText && (
          <div className="mt-3 text-center text-success" style={{ alignSelf: 'center' }}>
            Product has been successfully created!
          </div>
        )}
      </div>
    </div>
  );

}

export default ProductDetail;




/*

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get(`http://localhost:8080/product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                setLoading(false);
            });
    }, [productId]);

    const handleAddToBasket = async () => {
        try {
            await axios.post('http://localhost:8080/basket/create', {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },

                userId: userId, 
                productId: productId,
                numberOfProducts: 1
                
            });
            console.log('Product added to basket.');
        } catch (error) {
            console.error('Error adding product to basket:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Row>
                    <Col xs={6} style={{ padding: '20px' }}>
                        <Card.Img
                            variant="top"
                            src={`http://localhost:8080/product/take/${product.productId}`}
                            alt="Product"
                            style={{ maxWidth: '500px', width: '100%' }}
                        />
                    </Col>
                    <Col xs={6} style={{ padding: '20px' }}>
                        <Card.Body>
                            <Card.Title>{product.productName}</Card.Title>
                            <Card.Text>{product.productDesc}</Card.Text>
                            <Card.Text>Price: {product.productPrice}</Card.Text>
                            <Button variant="primary" onClick={handleAddToBasket}>Add to Basket</Button>
                        </Card.Body>
                    </Col>
                </Row>
                <Button
    variant="primary"
    style={{ position: 'absolute', bottom: '10px', right: '10px' }}
    onClick={() => window.location.href = "/product/byCategory"}
>
    Back
</Button>
*/