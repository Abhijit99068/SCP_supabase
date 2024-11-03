import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ scpItems }) => (
  <header className="navbar">
    <h1>SCP Foundation</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/create">Create SCP</Link>
      <div className="dropdown">
        <button className="dropbtn">SCP List</button>
        <div className="dropdown-content">
          {scpItems.map(item => (
            <Link key={item.id} to={`/scp/${item.id}`}>
              {item.item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  </header>
);

export default Navbar;
