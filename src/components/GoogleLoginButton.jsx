// components/GoogleLoginButton.jsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleLoginButton() {
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:5000/api/google-login', {
        token: credentialResponse.credential,
      });

      console.log('✅ User info saved:', res.data);
      alert('Signed in successfully!');
    } catch (err) {
      console.error('❌ Google Sign-In failed:', err);
    }
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={() => console.error("Login Failed")} />
    </div>
  );
}

export default GoogleLoginButton;
