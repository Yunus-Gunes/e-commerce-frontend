import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import CreateUserComponent from './components/user/CreateUserComponent.jsx';
import LoginComponent from './components/user/LoginComponent';
import ProductListByCategory from './components/products/ProductListByCategory';
import ProductDetail from './components/products/ProductDetail';
import BasketComponent from './components/basket/UserBasketComponent.js';
import UserOrdersComponent from './components/order/UserOrdersComponent';

import AdminPanelComponent from './components/admin/AdminPanelComponent';

import CreateCategory from './components/admin/category/CreateCategory.js';
import UpdateCategory from './components/admin/category/UpdateCategory.js';
import DeleteCategory from './components/admin/category/DeleteCategory.js';

import ProductCreate from './components/admin/product/ProductCreate.js';
import ProductUpdate from './components/admin/product/ProductUpdate.js';

import AdminCreate from './components/admin/admin/AdminCreate.js';
import AdminUpdate from './components/admin/admin/AdminUpdate.js';
function App() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/product/byCategory">Ana Sayfa</Link>
            </li>
            <li>
              <Link to="/create-user">Kullanici Oluştur</Link>
            </li>
            <li>
              <Link to="/basket">Sepet</Link>
            </li>
            <li>
              <Link to="/login-user">Login</Link>
            </li>
            <li>
              <Link to="/create-product">create</Link>
            </li>
            <li>
              <Link to="/order">order</Link>
            </li>
            <li>
              <Link to="/adminpanel">adminpanel</Link>
            </li>
          </ul>
        </nav>
      </header>



      <Routes>

        <Route path="/create-user" element={<CreateUserComponent />} />
        <Route path="/login-user" element={<LoginComponent />} />

        <Route path="/product/byCategory" element={<ProductListByCategory />} />
        <Route path="/product/:productId" element={<ProductDetail />} />


        <Route path="/basket" element={<BasketComponent />} />
        <Route path="/order" element={<UserOrdersComponent />} />



        <Route path="/adminpanel" element={<AdminPanelComponent />} />

        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/update-category" element={<UpdateCategory />} />
        <Route path="/delete-category" element={<DeleteCategory />} />


        <Route path="/create-product" element={<ProductCreate />} />
        <Route path="/update-product" element={<ProductUpdate />} />

        <Route path="/admin-create" element={<AdminCreate />} />
        <Route path="/admin-update" element={<AdminUpdate />} />

        
        
        <Route path="/" element={<LoginComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
