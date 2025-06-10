import  { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaRegClock,
  FaHeart
} from "react-icons/fa";
import "../styles/annonceColocProposeur.css";

const AnnonceColocProposeur = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentAnnonceIndex, setCurrentAnnonceIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [annonces, setAnnonces] = useState([]);
  const [favoris, setFavoris] = useState({});

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("Utilisateur non authentifié");
          return;
        }

        const response = await fetch(
          "http://localhost:8000/coloc-proposeur-annonces/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erreur serveur: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        setAnnonces(data);
      } catch (error) {
        alert(`Échec du chargement des annonces: ${error.message}`);
      }
    };

    fetchAnnonces();
  }, []);

  const openPopup = (annonceIndex) => {
    setCurrentAnnonceIndex(annonceIndex);
    setCurrentImageIndex(0);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  const currentAnnonce = annonces[currentAnnonceIndex];
  const images =
    currentAnnonce?.photos?.length > 0
      ? currentAnnonce.photos
      : [currentAnnonce?.photo_url || "/placeholder.jpg"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const calculateAge = (birthDateStr) => {
    const birthDate = new Date(birthDateStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleFavori = async (annonce) => {
    const token = localStorage.getItem('access_token');
    const url = 'http://localhost:8000/favoris/';
    const body = {
      object_id: annonce.id,
      model_name: 'annoncecolocproposeur'
    };
    if (!favoris[annonce.id]) {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      setFavoris(prev => ({ ...prev, [annonce.id]: true }));
    } else {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      setFavoris(prev => ({ ...prev, [annonce.id]: false }));
    }
  };

  return (
    <>
      {annonces.map((annonce, index) => (
        <div key={index} className="annonce-card">
          <div
            className="annonce-left"
            style={{
              backgroundImage: `url(${
                annonce.photo_url || "/placeholder.jpg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <button
              className="voir-maison-btn"
              onClick={() => openPopup(index)}
            >
              Voir chambre
            </button>
            <button className="favori-btn" onClick={() => handleFavori(annonce)} style={{position:'absolute',top:10,right:10,background:'none',border:'none',cursor:'pointer'}}>
              <FaHeart color={favoris[annonce.id] ? 'red' : 'grey'} size={28} />
            </button>
          </div>

          <div className="annonce-info">
            <h2 className="owner-name">
              <FaUser className="icon-grey" /> {annonce.user.nom}{" "}
              {annonce.user.prenom},{" "}
              {calculateAge(annonce.user.date_de_naissance)} ans
            </h2>
            <p>
              <FaMapMarkerAlt className="icon-grey" /> {annonce.delegation},{" "}
              {annonce.gouvernorat}
            </p>
            <p>
              <FaRegClock className="icon-grey" /> Publiée le:{" "}
              {annonce.date_pub_annonce}
            </p>
            <div className="actions">
              <button
                className="contact-btn"
                onClick={() => {
                  // Redirige vers la messagerie avec l'ID et le nom du propriétaire
                  window.location.href = `/Messagerie?userId=${annonce.user.id}&userName=${encodeURIComponent(annonce.user.nom)}`;
                }}
              >
                Contacter
              </button>
            </div>
          </div>
        </div>
      ))}

      {showPopup && (
        <div className="popup" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>

            <div className="popup-carousel">
              <div className="popup-gallery">
                <img
                  src={images[currentImageIndex]}
                  alt="Chambre"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.jpg";
                  }}
                />
              </div>

              <div className="carousel-nav">
                <button onClick={prevImage}>
                  <FaArrowLeft className="icon-grey" />
                </button>
                <button onClick={nextImage}>
                  <FaArrowRight className="icon-grey" />
                </button>
              </div>
            </div>

            <div className="popup-details">
              <h3>Détails de la chambre</h3>
              <p>
                <FaMoneyBillWave className="icon-grey" />{" "}
                <strong>Loyer :</strong> {currentAnnonce.loyer} DT
              </p>
              <p>
                <FaMoneyBillWave className="icon-grey" />{" "}
                <strong>Caution :</strong> {currentAnnonce.caution} DT
              </p>
              <p>
                <FaMapMarkerAlt className="icon-grey" />{" "}
                <strong>Adresse :</strong> {currentAnnonce.delegation},{" "}
                {currentAnnonce.gouvernorat}
              </p>
              <p>
                <strong>Description :</strong>{" "}
                {currentAnnonce.description || "Aucune description fournie."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnonceColocProposeur;