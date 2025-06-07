import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import '../styles/login.css';

const Login = ({ onClose ,onSignupClick}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Connexion réussie !");
        
        // 🔐 Stocker les tokens dans le localStorage
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        if (data.redirect_url) {
          window.location.href = data.redirect_url;
        } else {
          window.location.href = '/'; 
        }
      } else {
        alert("Erreur : " + data.detail || "Erreur inconnue");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
      <button className="close-button" onClick={onClose}>×</button>
      <Link to="/" className="logo-container">
          <img src={logo} alt="Logo Room4U" className="logo" />
        </Link>
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Se connecter</button>
          
          <div className="signup-link">
            Pas encore inscrit ?   <button onClick={onSignupClick} className="signup-button">Créer un compte</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;