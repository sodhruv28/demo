import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/user/register', form);
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="cpassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit">Register</button>
        <a href="/login">Already have an account? Login</a>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
