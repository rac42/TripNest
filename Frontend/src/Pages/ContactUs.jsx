import React, { useState } from 'react';
import axios from '../utils/axios';

const ContactUs = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = async() => {
    console.log("Submitted Query:", query);
    const token = localStorage.getItem('token');
    const response = await axios.post('/api/users/submitQuery', {query}, { headers: { Authorization: `Bearer ${token}` } } );
    console.log(response.data);
    // localStorage.setItem('query',response.data.newQuery);
    alert(response.data.message);
    // Optionally reset the query input after submission
    setQuery('');
  };

  return (
    <div className="flex flex-col  font-gilroy items-center space-y-4 p-4">
      <div className='font-gilroy text-2xl'>ADD YOUR QUERIES</div>
      
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query..."
        className="border rounded-lg p-2 w-[40vw] h-[40vh] "
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-[#363636] font-gilroy"
      >
        Submit
      </button>
    </div>
  );
}

export default ContactUs;
