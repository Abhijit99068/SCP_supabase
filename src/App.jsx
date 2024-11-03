import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { supabase } from './createClient'; // Adjust the path if needed
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SCPPage from './pages/SCPPage';
import UpdatePage from './pages/UpdatePage';
import CreatePage from './pages/CreatePage';
import './App.css';

const App = () => {
  const [scpItems, setScpItems] = useState([]);

  useEffect(() => {
    fetchSCPItems(); // Fetch SCP items when the app mounts
  }, []);

  const fetchSCPItems = async () => {
    try {
      const { data, error } = await supabase
        .from('scp')
        .select('id, item, class, description, containment');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setScpItems(data); // Update state with fetched SCP items
      }
    } catch (error) {
      console.error('Error:', error); // Log any fetch errors
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar scpItems={scpItems} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage scpItems={scpItems} fetchSCPItems={fetchSCPItems} />} />
            <Route path="/create" element={<CreatePage fetchSCPItems={fetchSCPItems} />} />
            <Route path="/scp/update/:id" element={<UpdatePage fetchSCPItems={fetchSCPItems} />} />
            <Route path="/scp/:id" element={<SCPPage fetchSCPItems={fetchSCPItems} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
