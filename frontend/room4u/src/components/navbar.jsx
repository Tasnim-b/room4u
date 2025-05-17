import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../assets/logo.png';

const Navbar = ({ onSignupClick, onLoginClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Fermer le menu lors du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo-container">
          <img src={logo} alt="Logo Room4U" className="logo" />
        </Link>

        <button 
          className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu mobile"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/FAQ" 
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            FAQ
          </Link>
          
          <button 
            className="nav-link sign-up" 
            onClick={() => {
              onSignupClick();
              setIsMobileMenuOpen(false);
            }}
          >
            S'inscrire
          </button>
          
          <button 
            className="nav-link login" 
            onClick={() => {
              onLoginClick();
              setIsMobileMenuOpen(false);
            }}
          >
            Se connecter
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;