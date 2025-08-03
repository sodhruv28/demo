import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ login: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/user/login', form, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      localStorage.setItem('token', res.data.token); // Optional
    } catch (err) {
      console.error(err);
      setMessage('Invalid login or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="login"
          placeholder="Username or Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <a href="/register">Don't have an account? Register</a>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
