import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ scpItems, setActiveScp }) => (
  <aside className="sidebar">
    <h2>SCP Directory</h2>
    <ul>
      {scpItems.map(item => (
        <li key={item.id}>
          <Link to={`/scp/${item.id}`} onClick={() => setActiveScp(item.item)}>
            {item.item}
          </Link>
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;
