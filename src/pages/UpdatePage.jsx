import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../createClient';

const UpdatePage = ({ fetchSCPItems }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scp, setSCP] = useState({ item: '', class: '', description: '', containment: '' });

  useEffect(() => {
    fetchSCP();
  }, [id]);

  const fetchSCP = async () => {
    const { data, error } = await supabase.from('scp').select('*').eq('id', id).single();
    if (error) {
      console.error('Error fetching SCP:', error);
      return;
    }
    setSCP(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSCP({ ...scp, [name]: value });
  };

  const updateSCP = async () => {
    const { error } = await supabase.from('scp').update(scp).eq('id', id);
    if (error) {
      console.error('Error updating SCP:', error);
      return;
    }
    fetchSCPItems();
    navigate('/');
  };

  return (
    <div className="update-page">
      <h2>Edit SCP</h2>
      <input type="text" name="item" placeholder="SCP Item" value={scp.item} onChange={handleChange} />
      <input type="text" name="class" placeholder="SCP Class" value={scp.class} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={scp.description} onChange={handleChange}></textarea>
      <textarea name="containment" placeholder="Containment" value={scp.containment} onChange={handleChange}></textarea>
      <button onClick={updateSCP}>Save</button>
    </div>
  );
};

export default UpdatePage;
