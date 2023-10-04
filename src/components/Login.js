import React, { useState } from 'react';
import * as userApi from '../api/userApi'

//Login Form
const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
          const response = await userApi.fetchUser({ email: username, password: password });
          if (response.token) {
            setError('');
            console.log('token', response.token);
            localStorage.setItem('token',response.token);
            onLogin();
          } else {
            setError('Invalid username or password.');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred while logging in.');
        }
      };
      

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
