import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupPopup.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const SignupPopup = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="modal-backdrop">
      <div className="signup-modal">
        <button className="close-button" onClick={() => onClose?.()}>×</button>
        <Link to="/" className="logo-container">
          <img src={logo} alt="Logo Room4U" className="logo" />
        </Link>
        <h2>Rejoignez-nous dès maintenant et profitez pleinement de toutes nos fonctionnalités</h2>
        <div className="choice-buttons">
          <button 
            className="choice-btn landlord" 
            onClick={() => {
              onClose?.();
              navigate('/FormulaireColocProposeur');
            }}
          >
            <span className="text">🏠 Je propose une chambre</span>
          </button>

          <button 
            className="choice-btn tenant" 
            onClick={() => {
              onClose?.();
              navigate('/FormulaireColocataire');
            }}
          >
            <span className="text">🔍 Je cherche une chambre</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPopup;
