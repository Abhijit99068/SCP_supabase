import React, { useState } from 'react';
import { supabase } from '../createClient';

const CreatePage = ({ fetchSCPItems }) => {
  const [newSCP, setNewSCP] = useState({
    item: '',
    class: '',
    description: '',
    containment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSCP({ ...newSCP, [name]: value });
  };

  const createSCP = async () => {
    await supabase.from('scp').insert([newSCP]);
    fetchSCPItems();
    setNewSCP({ item: '', class: '', description: '', containment: '' });
    alert('SCP Created Successfully');
  };

  return (
    <div className="create-page">
      <h2>Create New SCP</h2>
      <input type="text" name="item" placeholder="SCP Item" value={newSCP.item} onChange={handleChange} />
      <input type="text" name="class" placeholder="SCP Class" value={newSCP.class} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={newSCP.description} onChange={handleChange}></textarea>
      <textarea name="containment" placeholder="Containment" value={newSCP.containment} onChange={handleChange}></textarea>
      <button onClick={createSCP}>Create</button>
    </div>
  );
};

export default CreatePage;
