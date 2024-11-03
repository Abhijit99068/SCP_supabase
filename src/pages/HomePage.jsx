import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../createClient'; // Ensure supabase is imported correctly.

const HomePage = ({ scpItems, fetchSCPItems }) => {
  const deleteSCP = async (id) => {
    // Confirm deletion
    const confirmDelete = window.confirm('Are you sure you want to delete this SCP?');
    if (confirmDelete) {
      try {
        const { error } = await supabase.from('scp').delete().eq('id', id);
        if (error) throw error; // Throw the error so we can catch it.

        fetchSCPItems(); // Refresh the list after deletion
        alert('SCP deleted successfully.'); // Provide feedback to user
      } catch (error) {
        console.error('Error deleting SCP:', error);
        alert('Error deleting SCP. Please try again.');
      }
    }
  };

  return (
    <div className="home">
      <div className="scp-list">
        <h3>Current SCPs</h3>
        {scpItems && scpItems.length > 0 ? (
          scpItems.map(item => (
            <div key={item.id} className="scp-item">
              <h3>{item.item}</h3>
              <p><strong>Class:</strong> {item.class}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Containment:</strong> {item.containment}</p>
              <Link to={`/scp/update/${item.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => deleteSCP(item.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No SCPs available. Please create one.</p> // Handle cases where there are no SCPs
        )}
      </div>
    </div>
  );
};

export default HomePage;
