import React, { useState, useEffect } from 'react';
import { FaHeart, FaTimes, FaSearch, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Favoris.css';
import NavbarDash from '../components/NavbarDash';

// ✅ Données mockées placées ici (au début du fichier)
const mockFavorites = [
  {
    id: 1,
    housing: {
      id: 101,
      title: 'Appartement lumineux',
      city: 'Paris',
      country: 'France',
      price: 750,
      main_image: 'https://example.com/image1.jpg'
    },
    created_at: '2023-05-20T10:30:00Z'
  },
  {
    id: 2,
    housing: {
      id: 102,
      title: 'Studio moderne',
      city: 'Lyon',
      country: 'France',
      price: 550,
      main_image: 'https://example.com/image2.jpg'
    },
    created_at: '2023-05-18T14:20:00Z'
  }
];

const Favoris = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Simulation d’appel API avec un délai
        const timer = setTimeout(() => {
          setFavorites(mockFavorites);
          setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
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

  const filteredFavorites = favorites.filter(fav => 
    fav.housing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fav.housing.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Link to="/" className="back-button">
          <FaArrowLeft /> Retour
        </Link>
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
            {sortedFavorites.map((favorite) => (
              <div key={favorite.id} className="favorite-card">
                <Link to={`/annonces/${favorite.housing.id}`} className="favorite-link">
                  <div className="image-container">
                    <img
                      src={favorite.housing.main_image || '/static/default-housing.jpg'}
                      alt={favorite.housing.title}
                      onError={(e) => {
                        e.target.src = '/static/default-housing.jpg';
                      }}
                    />
                  </div>
                  <div className="favorite-info">
                    <h3>{favorite.housing.title}</h3>
                    <p className="location">{favorite.housing.city}, {favorite.housing.country}</p>
                    <p className="price">{favorite.housing.price} €/mois</p>
                    <p className="date">
                      Ajouté le {new Date(favorite.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => removeFavorite(favorite.housing.id)}
                  className="remove-btn"
                  aria-label="Supprimer des favoris"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoris;