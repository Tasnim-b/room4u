import React, { useState, useEffect } from 'react';
import { FaHeart, FaTimes, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Favoris.css';
import NavbarDash from '../components/NavbarDash';
import AnnonceProprietaire from './AnnoncePro';
import AnnonceColocProposeur from './AnnonceColocProposeur';
import AnnonceColocChercheur from './AnnonceColocChercheur';

const Favoris = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const res = await fetch('http://localhost:8000/favoris-user/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Erreur lors du chargement des favoris');
        const data = await res.json();
        setFavorites(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (housingId) => {
    try {
      // Suppression locale simulée
      setFavorites(favorites.filter(fav => fav.housing.id !== housingId));
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
    }
  };

  const filteredFavorites = favorites.filter(fav => {
    const title = fav.housing.title || '';
    const city = fav.housing.city || '';
    return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           city.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === 'price-asc') {
      return a.housing.price - b.housing.price;
    } else {
      return b.housing.price - a.housing.price;
    }
  });

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Chargement de vos favoris...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <p>Erreur: {error}</p>
      <button onClick={() => window.location.reload()}>Réessayer</button>
    </div>
  );

  return (
    <div className="favoris-page">
        <NavbarDash/>
      <header className="favoris-header">
        <h1><FaHeart /> Mes Favoris</h1>
      </header>

      <div className="favoris-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher dans vos favoris..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sort-options">
          <label>Trier par :</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="recent">Plus récent</option>
            <option value="price-asc">Prix (croissant)</option>
            <option value="price-desc">Prix (décroissant)</option>
          </select>
        </div>
      </div>

      <div className="favoris-container">
        {sortedFavorites.length === 0 ? (
          <div className="empty-favorites">
            {searchTerm ? (
              <>
                <p>Aucun résultat pour "{searchTerm}"</p>
                <button onClick={() => setSearchTerm('')}>Réinitialiser la recherche</button>
              </>
            ) : (
              <>
                <p>Vous n'avez aucun favori pour le moment</p>
                <Link to="/annonces" className="browse-button">
                  Parcourir les annonces
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="favorites-grid">
            {sortedFavorites.map((favorite) => {
              const annonce = favorite.housing;
              const type = favorite.annonce_type;
              return (
                <React.Fragment key={favorite.id}>
                  {type === 'proprietaire' && (
                    <AnnonceProprietaire annonce={annonce} isFavoriPage />
                  )}
                  {type === 'coloc_proposeur' && (
                    <AnnonceColocProposeur annonce={annonce} isFavoriPage />
                  )}
                  {type === 'coloc_chercheur' && (
                    <AnnonceColocChercheur annonce={annonce} isFavoriPage />
                  )}
                  <button
                    onClick={() => removeFavorite(annonce.id)}
                    className="remove-btn"
                    aria-label="Supprimer des favoris"
                    style={{position:'absolute',top:10,right:10,zIndex:10}}
                  >
                    <FaTimes />
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoris;