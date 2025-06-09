import React, { useState } from 'react'; 
import {
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaArrowLeft,
  FaArrowRight,
  FaRulerCombined,
  FaDoorOpen,
  FaEuroSign,
  FaCalendarAlt,
  FaCouch,
  FaInfoCircle,
  FaWifi,
  FaBan,
  FaMoneyBillWave,
  FaUsers,
  FaRegClock,
} from 'react-icons/fa';
import '../styles/AnnoncePro.css';

const AnnonceProprietaire = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const annonce = {
    photos: [
      'https://www.depreux-construction.com/wp-content/uploads/2024/07/APS02-MOUILLESSE-LT_Page_1.jpg',
      'https://www.depreux-construction.com/wp-content/uploads/2024/07/APS02-MOUILLESSE-LT_Page_2.jpg',
      'https://www.depreux-construction.com/wp-content/uploads/2024/07/APS02-MOUILLESSE-LT_Page_3.jpg',
    ],
    type_de_logement: 'Appartement',
    superficie: 80,
    nombre_pieces: 3,
    loyer: 900,
    date_de_disponibilite: '2025-06-01',
    meuble: 'Oui',
    description: 'Appartement moderne et lumineux.',
    commodites: 'WiFi, Chauffage, Parking',
    regles: 'Non-fumeur, Pas d’animaux',
    caution: 1200,
    colocataire_déjà_existant: 1,
    date_pub_annonce: '2025-05-24',
    user: {
      nom: 'Karim',
      prenom: 'OZ',
      age:'30',
      avatar:
        'https://www.depreux-construction.com/wp-content/uploads/2024/07/APS02-MOUILLESSE-LT_Page_1.jpg',
      gouvernorat: 'Tunis',
      delegation: 'La Marsa',
      phone: '+216 123 456 789',
    },
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setCarouselIndex(0);
  };

  const prevPhoto = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? annonce.photos.length - 1 : prev - 1
    );
  };

  const nextPhoto = () => {
    setCarouselIndex((prev) =>
      prev === annonce.photos.length - 1 ? 0 : prev + 1
    );
  };

  const handleContact = () => {
    alert(`Contactez ${annonce.user.nom} au ${annonce.user.phone}`);
  };

  return (
    <>
      <div className="annonce-card">
        <div
          className="annonce-left"
          style={{ backgroundImage: `url(${annonce.user.avatar})` }}
        >
          <button className="voir-maison-btn" onClick={togglePopup}>
            <FaHome className="icon-grey" /> Voir Maison
          </button>
        </div>

        <div className="annonce-info">
          <h2 className="owner-name">
            <FaUser className="icon-grey" /> {annonce.user.nom} {annonce.user.prenom}, {annonce.user.age}
          </h2>
          <p>
            <FaMapMarkerAlt className="icon-grey" /> {annonce.user.gouvernorat} - {annonce.user.delegation}
          </p>
    <p><FaRegClock className="icon-grey" />Publiée le: {annonce.date_pub_annonce}</p>
          <div className="actions">
            <button className="contact-btn" onClick={handleContact}>
              <FaPhone className="icon-grey" /> Contact
            </button>
          </div>
      
        </div>
      </div>

      {showPopup && (
        <div className="popup" onClick={togglePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={togglePopup}>
              &times;
            </button>

            <div className="popup-carousel">
              <div className="popup-gallery">
                <img
                  src={annonce.photos[carouselIndex]}
                  alt={`Maison ${carouselIndex + 1}`}
                />
              </div>

              <div className="carousel-nav">
                <button onClick={prevPhoto}>
                  <FaArrowLeft className="icon-grey" />
                </button>
                <button onClick={nextPhoto}>
                  <FaArrowRight className="icon-grey" />
                </button>
              </div>
            </div>

            <div className="popup-details">
              <h3><FaInfoCircle className="icon-grey" /> Détails du logement</h3>
              <p><FaDoorOpen className="icon-grey" /> <strong>Type:</strong> {annonce.type_de_logement}</p>
              <p><FaRulerCombined className="icon-grey" /> <strong>Superficie:</strong> {annonce.superficie} m²</p>
              <p><FaDoorOpen className="icon-grey" /> <strong>Pièces:</strong> {annonce.nombre_pieces}</p>
              <p><FaEuroSign className="icon-grey" /> <strong>Loyer:</strong> {annonce.loyer} €</p>
              <p><FaCalendarAlt className="icon-grey" /> <strong>Disponible:</strong> {annonce.date_de_disponibilite}</p>
              <p><FaCouch className="icon-grey" /> <strong>Meublé:</strong> {annonce.meuble}</p>
              <p><FaInfoCircle className="icon-grey" /> <strong>Description:</strong> {annonce.description}</p>
              <p><FaWifi className="icon-grey" /> <strong>Commodités:</strong> {annonce.commodites}</p>
              <p><FaBan className="icon-grey" /> <strong>Règles:</strong> {annonce.regles}</p>
              <p><FaMoneyBillWave className="icon-grey" /> <strong>Caution:</strong> {annonce.caution} €</p>
              <p><FaUsers className="icon-grey" /> <strong>Colocataires:</strong> {annonce.colocataire_déjà_existant}</p>
            
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnonceProprietaire;
