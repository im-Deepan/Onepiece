import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useUser } from '../context/UserContext'; // ✅ import user context
import { jwtDecode } from 'jwt-decode';
const GoogleSignInButton = ({ onSuccess }) => {
  const clientId = '582895192847-0eqrpt1olsj24kf3710maiojqm5let6p.apps.googleusercontent.com'; // Replace with your actual client ID
  const { setUser } = useUser(); // ✅ use context

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log("🟢 Credential token:", credentialResponse.credential);

          // Send token to backend
          fetch('http://localhost:5000/api/auth/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: credentialResponse.credential })
          })
            .then(res => res.json())
            .then(data => {
              console.log("✅ Backend response:", data);
              setUser(data.user); // ✅ Save to context
              if (onSuccess) onSuccess(data.user);
            })
            .catch(err => console.error("❌ Error saving user:", err));
        }}
        onError={() => {
          console.error('❌ Google login failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignInButton;
