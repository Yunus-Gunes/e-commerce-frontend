import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, } from 'react-bootstrap';

const UserOrdersComponent = () => {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');



  useEffect(() => {
    axios.get("http://localhost:8080/order/user-orders?userId=" + userId, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => {
        setOrders(response.data);
        console.log("1  ",orders)

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Kullanıcının Siparişleri</h1>
      {!orders || orders.length === 0 ? (
        <p>Kullanıcının henüz siparişi bulunmamaktadır.</p>
      ) : (
        <div>
          {orders.map((order) => (
            
            <Card key={order.orderId} style={{ marginBottom: '20px' }}>
              <Card.Body>
                <Card.Title>Sipariş ID: {order.orderId}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Sipariş Tarihi: {order.orderDate[2]+"/"+order.orderDate[1]+"/"+order.orderDate[0]}
                </Card.Subtitle>
                <Card.Text>
                  Toplam Fiyat: {order.orderTotal}, 
                </Card.Text>
                <Card.Text>
                  Sipariş Durumu: {order.orderStatus}
                </Card.Text>
                <Card.Text>
                  <strong>Sipariş Detayları:</strong>
                  <ul>
                    {order.orderDetail.map((detail) => (
                      <li key={detail.orderDetailId}>
                        <Card>
                          <Card.Body>
                            <Card.Text>
                              Ürün ID: {detail.productId}, Ürün Fiyatı: {detail.orderDetailProductPrice},
                              Sipariş Adedi: {detail.numberOfOrderProducts}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
    </div>

  );
};

export default UserOrdersComponent;
