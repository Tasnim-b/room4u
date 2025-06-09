import React from 'react';
import NavbarColoc from '../components/NavbarColoc';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';
import '../styles/MesAnnonces.css';
import AnnonceColocProposeur from '../pages/AnnonceColocProposeur';
import AnnonceProprietaire from './AnnoncePro';
import AnnonceColocChercheur from '../pages/AnnonceColocChercheur';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <NavbarColoc />
      
      <div className="dashboard-content">
        <Sidebar />
        
        <main className="main-content">
          {/* Votre contenu principal ici */}
          <h1>Bienvenue sur votre Tableau de Bord</h1>
          <div className="annonces-grid">
            <AnnonceColocProposeur />
            <AnnonceProprietaire />
            <AnnonceColocChercheur />
          </div>
          {/* Ajoutez vos cartes/statistiques ici */}
          <div className="content-grid">
            {/* Ajoutez vos cartes/statistiques ici */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;