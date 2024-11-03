import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../createClient'; // Ensure supabase is imported correctly.
import '../SCPPage.css';

const SCPPage = ({ fetchSCPItems }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the SCP ID from the URL parameters
  const [scpItem, setSCPItem] = useState(null); // State to store the SCP item
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    if (id) {
      fetchSCP(); // Call function to fetch SCP item data when component mounts
    } else {
      console.error('No ID provided for fetching SCP'); // Log error message if ID is undefined
      alert('Invalid SCP ID. Please try again.'); // Alert user
      navigate('/'); // Navigate back to HomePage if no ID is found
    }
  }, [id]); // Only rerun effect if ID changes

  const fetchSCP = async () => {
    try {
      // Log the ID to ensure it's being retrieved correctly
      console.log('Fetching SCP with ID:', id); // Debugging log

      const { data, error } = await supabase
        .from('scp')
        .select('*')
        .eq('id', id)
        .single(); // Fetch a single item by ID

      if (error) throw error; // Handle any error that occurs
      
      setSCPItem(data); // Set the SCP item data
    } catch (error) {
      console.error('Error fetching SCP:', error.message);
      setError(error); // Set error state
      alert('Error fetching SCP. Please try again.'); // Alert user on error
    } finally {
      setLoading(false); // Update loading state after data fetch
    }
  };

  const deleteSCP = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this SCP?');
    if (confirmDelete) {
      try {
        const { error } = await supabase
          .from('scp')
          .delete()
          .eq('id', id); // Delete the SCP item by ID

        if (error) throw error; // Handle any error that occurs

        fetchSCPItems(); // Refresh the list after deletion
        alert('SCP deleted successfully.');
        navigate('/'); // Navigate back to the home page
      } catch (error) {
        console.error('Error deleting SCP:', error.message);
        alert('Error deleting SCP. Please try again.'); // Alert user on error
      }
    }
  };

  // Render a loading state if the SCP item is not yet available
  if (loading) {
    return <p>Loading...</p>; // Show loading message
  }

  // Handle case when there is an error fetching the SCP
  if (error) {
    return <p>Error loading SCP item. Please try refreshing the page.</p>; // Display error message
  }

  // Render the SCP details
  return (
    <div className="scp-detail">
      <h2>{scpItem.item}</h2>
      <div className="scp-info">
        <p><strong>Class:</strong> {scpItem.class}</p>
        <p><strong>Description:</strong> {scpItem.description}</p>
        <p><strong>Containment:</strong> {scpItem.containment}</p>
      </div>
      <div className="scp-actions">
        <button className="edit-button" onClick={() => navigate(`/scp/update/${scpItem.id}`)}>Edit</button>
        <button className="delete-button" onClick={deleteSCP}>Delete</button>
        <button className="back-button" onClick={() => navigate('/')}>Back to List</button>
      </div>
    </div>
  );
};

export default SCPPage;
