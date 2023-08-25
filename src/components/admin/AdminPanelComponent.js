import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const AdminPanelComponent = () => {
  const navigate = useNavigate();

  const handleDropdownItemClick = (path) => {
    navigate(path);
  };

  const dropdownMenus = [
    {
      title: 'Category',
      items: [
        { title: 'Create Category', path: '/create-category' },
        { title: 'Update Category', path: '/update-category' },
        //{ title: 'Delete Category', path: '/delete-category' },

      ],
    },
    {
      title: 'Product',
      items: [
        { title: 'Create Product', path: '/create-product' },
        { title: 'Update Product', path: '/update-product' },
      ],
    },
    {
      title: 'Admin',
      items: [
        { title: 'Admin Create', path: '/admin-create' },
        { title: 'Admin Update', path: '/admin-update' },
      ],
    },
  ];

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {dropdownMenus?.map((menu, index) => (
            <NavDropdown key={index} title={menu.title} id={`dropdown-menu-${index}`}>
              {menu.items.map((item, itemIndex) => (
                <NavDropdown.Item
                  key={itemIndex}
                  onClick={() => handleDropdownItemClick(item.path)}
                >
                  {item.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );


  
};

export default AdminPanelComponent;
