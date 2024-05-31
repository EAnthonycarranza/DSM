// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage, { Username, Password, Submit, Title, Logo, Footer  } from '@react-login-page/page11';

const containerStyles = {
  display: 'flex',
  height: '100vh',
  width: '100vw',
};

const formContainerStyles = {
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#2c3338',
};

const formStyles = {
  width: '100%',
  maxWidth: '400px',
  background: 'rgba(255, 255, 255, 0.8)',
};

const imageContainerStyles = {
  flex: '1',
  backgroundImage: 'url(https://storage.googleapis.com/carpublic/bannerIMG.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const LoginComponent = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', data);
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      console.log('Token saved to localStorage:', response.data.token);
      navigate('/personalinfo');
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div style={containerStyles}>
      <div style={formContainerStyles}>
        <div style={formStyles}>
          <form onSubmit={handle}>
            <LoginPage>
              <Username label="Email" name="email" required />
              <Password label="Password" name="password" required />
              <Submit>Submit</Submit>
              <Title visible={false} />
              <Logo>
                DSM Login
              </Logo>
              <Footer>
      Not a member? <a href="/register">Sign up now</a>
    </Footer>
            </LoginPage>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </form>
        </div>
      </div>
      <div style={imageContainerStyles}></div>
    </div>
  );
};

export default LoginComponent;
