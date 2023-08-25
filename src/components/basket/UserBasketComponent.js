import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';

const BasketComponent = () => {
  const [baskets, setBaskets] = useState([]);
  const [basketInfo, setBasketInfo] = useState([]);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

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



  return (
    <div>
      <h1>E-Ticaret Sepetleri</h1>
      {!baskets || baskets.length === 0 ? (
        <p>Henüz sepet bulunmamaktadır.</p>
      ) : (
        <div>
          {baskets.map((basket) => (
            <Card key={basket.basketId} style={{ marginBottom: '20px' }}>
              <Row>
                <Col xs={4}>
                  <Card.Img variant="top" src={`http://localhost:8080/product/take/${basket.product.productId}`} alt="Product" />
                </Col>
                <Col xs={8}>
                  <Card.Body>
                    <Card.Title>Name: {basket.product.productName}</Card.Title>
                    <Card.Text>Price: {basket.product.productPrice}</Card.Text>
                    <Card.Text>Total Price: { basket.totalProductPrice} TL</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
          <h1>Toplam: {basketInfo}</h1>
          <Button onClick={createOrder}>Siparişi Tamamla</Button>
        </div>
      )}
    </div>
  );
};

export default BasketComponent;
