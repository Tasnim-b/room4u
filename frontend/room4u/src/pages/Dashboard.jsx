import React from 'react';
import NavbarDash from '../components/NavbarDash';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <NavbarDash />
      
      <div className="dashboard-content">
        <Sidebar />
        
        <main className="main-content">
          {/* Votre contenu principal ici */}
          <h1>Bienvenue sur votre Tableau de Bord</h1>
          <div className="content-grid">
            {/* Ajoutez vos cartes/statistiques ici */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;