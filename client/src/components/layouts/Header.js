import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/add">Add Order</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/list">List Orders</Link>
      </li>
    </ul>
  );
}

export default Header;
