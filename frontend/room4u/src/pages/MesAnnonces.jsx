import React, { useState, useEffect } from 'react';
import { 
  FaHome, FaEdit, FaTrash, FaPlus, FaSearch, FaMapMarkerAlt, FaDoorOpen, FaRulerCombined, FaWifi,FaCalendarAlt, FaCouch, 
  FaPhone, FaUser, FaArrowLeft, FaArrowRight, FaEuroSign, FaInfoCircle, FaBan, FaMoneyBillWave, FaUsers, FaRegClock 
} from 'react-icons/fa';
import '../styles/MesAnnonces.css';
import '../styles/AnnoncePro.css';
import NavbarDash from '../components/NavbarDash';
import { useNavigate } from 'react-router-dom';

const MesAnnonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);
  const navigate = useNavigate();

  // Récupérer les annonces de l'utilisateur
  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('http://localhost:8000/mes-annonces-proprietaire/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des annonces');
        }

        const data = await response.json();
        setAnnonces(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, []);

  // Filtrer les annonces par recherche
  const filteredAnnonces = annonces.filter(annonce => 
    annonce.type_de_logement.toLowerCase().includes(searchTerm.toLowerCase()) ||
    annonce.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePopup = (annonce) => {
    setShowPopup(!showPopup);
    setCarouselIndex(0);
    setSelectedAnnonce(annonce || null);
  };

  const prevPhoto = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? (selectedAnnonce.photos?.length || 1) - 1 : prev - 1
    );
  };

  const nextPhoto = () => {
    setCarouselIndex((prev) =>
      prev === (selectedAnnonce.photos?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleContact = (annonce) => {
    alert(`Contactez ${annonce.user?.nom || ''} au ${annonce.user?.phone || ''}`);
  };

  // Handler pour la modification d'annonce
  const handleEdit = (annonce) => {
    // Action désactivée : aucune action sur le bouton Modifier
  };

  // Handler pour la suppression d'annonce
  const handleDelete = async (annonce) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`http://localhost:8000/annonces-proprietaire/${annonce.id}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setAnnonces(prev => prev.filter(a => a.id !== annonce.id));
        } else {
          alert('Erreur lors de la suppression.');
        }
      } catch (err) {
        alert('Erreur réseau.');
      }
    }
  };

  // Gestion universelle des images pour la popup
  const getAnnonceImages = (annonce) => {
    if (annonce.photos && annonce.photos.length > 0) {
      return annonce.photos;
    }
    if (annonce.additional_photos && annonce.additional_photos.length > 0) {
      return annonce.additional_photos;
    }
    if (annonce.photo_de_maison) {
      return [annonce.photo_de_maison];
    }
    return [];
  };

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <>
      <NavbarDash />
      <div className="mes-annonces-container">
        <div className="header-section">
          <h1><FaHome className="header-icon" /> Mes Annonces </h1>
          
          <div className="controls">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher par type ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button className="new-annonce-btn" onClick={() => navigate('/FormulaireProprietaire')}>
              <FaPlus className="btn-icon" />
              Nouvelle Annonce
            </button>
          </div>
        </div>
        {filteredAnnonces.length === 0 ? (
          <div className="empty-state">
            <img src="/empty-state.svg" alt="Aucune annonce" />
            <h3>Vous n'avez publié aucune annonce</h3>
            <p>Commencez par créer votre première annonce pour la louer</p>
            <button className="cta-button">Créer une annonce</button>
          </div>
        ) : (
          <div className="annonces-grid">
            {filteredAnnonces.map(annonce => {
              // Récupérer la photo principale (logique identique à la popup)
              let mainPhoto = null;
              const images = getAnnonceImages(annonce);
              if (images.length > 0) {
                mainPhoto = images[0].startsWith('http') ? images[0] : `http://localhost:8000${images[0]}`;
              } else {
                mainPhoto = '/default-house.jpg';
              }
              return (
                <div key={annonce.id} className="annonce-card">
                  <div
                    className="annonce-left"
                    style={{ backgroundImage: `url(${mainPhoto})` }}
                  >
                    <button className="voir-maison-btn" onClick={() => togglePopup(annonce)}>
                      <FaHome className="icon-grey" /> Voir Maison
                    </button>
                  </div>
                  <div className="annonce-info">
                    <h2 className="owner-name">
                      <FaUser className="icon-grey" /> {annonce.user?.nom} {annonce.user?.prenom}
                    </h2>
                    <p><FaMapMarkerAlt className="icon-grey" /> {annonce.gouvernorat} - {annonce.delegation}</p>
                    <p><FaRegClock className="icon-grey" />Publiée le: {annonce.date_pub_annonce}</p>
                    <div className="actions">
                      <button className="contact-btn" onClick={() => handleContact(annonce)}>
                        <FaPhone className="icon-grey" /> Contact
                      </button>
                      {/* Boutons Modifier et Supprimer visibles seulement pour l'utilisateur propriétaire */}
                      <button className="edit-btn" onClick={() => handleEdit(annonce)}>
                        <FaEdit className="icon-grey" /> Modifier
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(annonce)}>
                        <FaTrash className="icon-grey" /> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* Popup galerie et détails */}
        {showPopup && selectedAnnonce && (
          <div className="popup" onClick={togglePopup}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
              <button className="close-button" onClick={togglePopup}>&times;</button>
              <div className="popup-carousel">
                <div className="popup-gallery">
                  {(() => {
                    const images = getAnnonceImages(selectedAnnonce);
                    const imgSrc = images[carouselIndex]
                      ? (images[carouselIndex].startsWith('http')
                          ? images[carouselIndex]
                          : `http://localhost:8000${images[carouselIndex]}`)
                      : '/default-house.jpg';
                    return (
                      <img
                        src={imgSrc}
                        alt={`Maison ${carouselIndex + 1}`}
                      />
                    );
                  })()}
                </div>
                {getAnnonceImages(selectedAnnonce).length > 1 && (
                  <div className="carousel-nav">
                    <button onClick={prevPhoto}><FaArrowLeft className="icon-grey" /></button>
                    <button onClick={nextPhoto}><FaArrowRight className="icon-grey" /></button>
                  </div>
                )}
              </div>
              <div className="popup-details">
                <h3><FaInfoCircle className="icon-grey" /> Détails du logement</h3>
                <p><FaDoorOpen className="icon-grey" /> <strong>Type:</strong> {selectedAnnonce.type_de_logement}</p>
                <p><FaRulerCombined className="icon-grey" /> <strong>Superficie:</strong> {selectedAnnonce.superficie} m²</p>
                <p><FaDoorOpen className="icon-grey" /> <strong>Pièces:</strong> {selectedAnnonce.nombre_pieces}</p>
                <p><FaEuroSign className="icon-grey" /> <strong>Loyer:</strong> {selectedAnnonce.loyer} DT</p>
                <p><FaCalendarAlt className="icon-grey" /> <strong>Disponible:</strong> {selectedAnnonce.date_de_disponibilite}</p>
                <p><FaCouch className="icon-grey" /> <strong>Meublé:</strong> {selectedAnnonce.meuble}</p>
                <p><FaInfoCircle className="icon-grey" /> <strong>Description:</strong> {selectedAnnonce.description}</p>
                <p><FaWifi className="icon-grey" /> <strong>Commodités:</strong> {selectedAnnonce.commodites}</p>
                <p><FaBan className="icon-grey" /> <strong>Règles:</strong> {selectedAnnonce.regles}</p>
                <p><FaMoneyBillWave className="icon-grey" /> <strong>Caution:</strong> {selectedAnnonce.caution} DT</p>
                <p><FaUsers className="icon-grey" /> <strong>Colocataires:</strong> {selectedAnnonce.colocataire_déjà_existant}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MesAnnonces;