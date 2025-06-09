import React, {useEffect, useRef } from 'react';
import '../styles/home.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

// Hook pour détecter la visibilité d'un élément au scroll
function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref]);

  return isIntersecting;
}

const Home = () => {
  const infoRef = useRef();
  const servicesRef = useRef();
  const ownersRef = useRef();

  const isInfoVisible = useOnScreen(infoRef);
  const isServicesVisible = useOnScreen(servicesRef);
  const isOwnersVisible = useOnScreen(ownersRef);

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Room4U</h1>
          <p>Votre colocataire idéal, simplifié.</p>
        </div>
      </section>

      {/* Qu'est-ce que Room4U ? */}
      <section
        className={`info-section ${isInfoVisible ? 'visible-on-scroll animate-fadeSlideUp' : 'hidden-before-scroll'}`}
        ref={infoRef}
      >
        <div className="text-side">
          <h2>Qu'est-ce que Room4U ?</h2>
          <p>
            Room4U est votre plateforme de référence pour trouver des colocataires compatibles, 
            un logement partagé, et une expérience de vie simplifiée et sans tracas.
          </p>
        </div>
        <div className="image-side">
          <img 
            src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80" 
            alt="Jeunes colocataires discutant" />
        </div>
      </section>

      {/* Nos Services */}
      <section
        className={`services-section ${isServicesVisible ? 'visible-on-scroll animate-fadeSlideUp' : 'hidden-before-scroll'}`}
        ref={servicesRef}
      >
        <div className="image-side">
          <img 
            src="https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=800&q=80" 
            alt="Collocation conviviale" />
        </div>
        <div className="text-side">
          <h2>Nos Services</h2>
          <ul>
            <li>Tests de compatibilité avancés entre colocataires</li>
            <li>Messagerie instantanée sécurisée pour échanger facilement</li>
            <li>Annonces vérifiées pour garantir des logements fiables</li>
            <li>Filtres personnalisés pour une recherche ciblée</li>
            <li>Support client disponible pour accompagner chaque étape</li>
          </ul>
        </div>
      </section>

      {/* Rencontrez nos propriétaires */}
      <section
        className={`owners-section ${isOwnersVisible ? 'visible-on-scroll animate-fadeSlideUp' : 'hidden-before-scroll'}`}
        ref={ownersRef}
      >
        <h2>Rencontrez nos propriétaires</h2>
        <div className="owners-cards">
          <div className="owner-card">
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Tasnim Ben Mabrouk" />
            <h3>Tasnim Ben Mabrouk</h3>
          </div>
          <div className="owner-card">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Chaima Youssef" />
            <h3>Chaima Youssef</h3>
          </div>
          <div className="owner-card">
            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Chaima Saidani" />
            <h3>Chaima Saidani</h3>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="contact-info">
          <h3>Contactez-nous</h3>
          <p>Email : contact@room4u.com</p>
          <p>Téléphone : +216 123 456 789</p>
          <p>Adresse : 123 Rue Principale, Tunis, Tunisie</p>
        </div>
        <div className="social-media">
          <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
        </div>
        <p className="copyright">© 2025 Room4U. Tous droits réservés.</p>
      </footer>

    </div>
  );
};

export default Home;
