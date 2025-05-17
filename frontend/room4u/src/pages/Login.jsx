import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import '../styles/login.css';

const Login = ({ onClose ,onSignupClick}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique de connexion////////////////////////////////////////////////
    console.log({ email, password });
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