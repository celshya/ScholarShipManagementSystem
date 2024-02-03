import React, { useState,useEffect } from 'react';
import { fetchStudents } from '../api';
const Form = () => {
    const [formData, setFormData] = useState([]);
    const [formState, setFormState] = useState({});

  useEffect(() => {
    fetchData();
    
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };
  const fetchData = async () => {
    try {
      const data = await fetchStudents();
      setFormData(data);
      console.log(formData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <form>
    {formData.map(field => (
      <div key={field.id}>
        <label htmlFor={field.id}>{field.label}</label>
        <input
          type={field.type}
          id={field.id}
          name={field.name}
          value={formState[field.name] || ''}
          onChange={handleChange}
        />
      </div>
    ))}
    <button type="submit">Submit</button>
  </form>
  )
}

export default Form;