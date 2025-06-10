import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaUserTie,
  FaRegClock,
  FaMoneyBillWave,
  FaHeart
} from "react-icons/fa";
import "../styles/annonceColocChercheur.css";

const AnnonceColocChercheur = () => {
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

        const response = await fetch("http://localhost:8000/coloc-chercheur-annonces/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        const formattedAnnonces = data.map((annonce) => ({
          ...annonce,
          preferences: Array.isArray(annonce.preferences)
            ? annonce.preferences
            : typeof annonce.preferences === "string"
              ? annonce.preferences.replace(/[{}\[\]"']+/g, "").split(",").map(p => p.trim()).filter(Boolean)
              : [],
        }));

        setAnnonces(formattedAnnonces);
      } catch (err) {
        alert("Erreur lors du chargement des annonces: " + err.message);
        console.error(err);
      }
    };

    fetchAnnonces();
  }, []);

  const handleFavori = async (annonce) => {
    const token = localStorage.getItem('access_token');
    const url = 'http://localhost:8000/favoris/';
    const body = {
      object_id: annonce.id,
      model_name: 'annoncecolcchercheur'
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

    <div className="annonces-container">
      {annonces.map((annonce, index) => (
        <div key={index} className="annonce-card-horizontal">
          <div className="annonce-left">
            <div
              className="annonce-image"
              style={{ backgroundImage: `url(${annonce.user?.avatar || '/placeholder.jpg'})` }}
            >
              <div className="image-overlay"></div>
              <div className="image-text-bottom">
                {annonce.user?.nom} {annonce.user?.prenom}, {annonce.age} ans
              </div>
              <button className="favori-btn" onClick={() => handleFavori(annonce)} style={{position:'absolute',top:10,right:10,background:'none',border:'none',cursor:'pointer'}}>
                <FaHeart color={favoris[annonce.id] ? 'red' : 'grey'} size={28} />
              </button>
            </div>
          </div>

          <div className="annonce-right">
            <div className="annonce-details">
              <div className="detail-item">
                <FaUserTie className="icon" />
                <span>{annonce.occupation || 'Non spécifié'}</span>
              </div>
              <div className="detail-item">
                <FaMapMarkerAlt className="icon" />
                <span>{annonce.gouvernorat || 'Non spécifié'} - {annonce.delegation || 'Non spécifié'}</span>
              </div>
              <div className="detail-item">
                <FaMoneyBillWave className="icon" />
                <span>{annonce.budget_max || '0'} DT</span>
              </div>
              <div className="detail-item">
                <strong>Date d'emménagement:</strong>{" "}
                {annonce.date_habite || 'Non spécifiée'}
              </div>
            </div>

            <div className="about-section">
              <strong>Description:</strong>
              <p>{annonce.description || 'Aucune description fournie'}</p>
            </div>

            <div className="preferences-section">
              <h3>Préférences</h3>
              <div className="preferences-list">
                {annonce.preferences?.length > 0 ? (
                  annonce.preferences.map((pref, idx) => (
                    <div key={idx} className="preference-tag">{pref}</div>
                  ))
                ) : (
                  <div className="no-preferences">Aucune préférence spécifiée</div>
                )}
              </div>
            </div>

            <div className="contact-info">
              <FaPhone className="icon" /> {annonce.phone || 'Non spécifié'}
            </div>

            <div className="annonce-bottom-row">
              <div className="annonce-date">
                <FaRegClock className="icon" /> Publiée le {annonce.date_pub_annonce || 'Non spécifiée'}
              </div>
              <button className="contact-btn" onClick={() => {
                window.location.href = `/Messagerie?userId=${annonce.user?.id || ''}&userName=${encodeURIComponent(annonce.user?.nom || '')}`;
              }}>
                <FaPhone className="icon" /> Contacter
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
     
  );
};

export default AnnonceColocChercheur;
