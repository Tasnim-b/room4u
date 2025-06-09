import React, { useState, useEffect } from 'react';
import '../styles/FormulaireProprietaire.css';
import NavbarDash from '../components/NavbarDash';
// Liste des gouvernorats et leurs délégations
const gouvernoratsDelegations = {
  "Ariana": ["Ariana Ville", "Ettadhamen", "Mnihla", "Raoued", "Kalaat Landalous", "Sidi Thabet", "La Soukra"],
  "Béja": ["Béja Nord", "Béja Sud", "El Maâgoula", "Medjez el-Bab", "Nefza", "Téboursouk", "Testour", "Thibar"],
  "Ben Arous": ["Ben Arous", "Bou Mhel el-Bassatine", "El Mourouj", "Ezzahra", "Fouchana", "Hammam Chott", "Hammam Lif", "Mohamedia", "Mornag", "Radès"],
  "Bizerte": ["Bizerte Nord", "Bizerte Sud", "El Alia", "Ghar El Melh", "Mateur", "Menzel Bourguiba", "Menzel Jemil", "Ras Jebel", "Sejenane", "Tinja", "Utique", "Zarzouna"],
  "Gabès": ["Gabès Médina", "Gabès Ouest", "Gabès Sud", "Ghannouch", "El Hamma", "Matmata", "Mareth", "Menzel El Habib", "Métouia", "Nouvelle Matmata"],
  "Gafsa": ["Belkhir", "El Guettar", "El Ksar", "Gafsa Nord", "Gafsa Sud", "Mdhilla", "Métlaoui", "Moularès", "Redeyef", "Sened", "Sidi Aïch"],
  "Jendouba": ["Aïn Draham", "Balta Bouaouene", "Bou Salem", "Fernana", "Ghardimaou", "Jendouba", "Jendouba Nord", "Oued Mliz", "Tabarka"],
  "Kairouan": ["Bou Hajla", "Chebika", "Echrarda", "Haffouz", "Hajeb El Ayoun", "Kairouan Nord", "Kairouan Sud", "Nasrallah", "Oueslatia", "Sbikha"],
  "Kasserine": ["El Ayoun", "Ezzouhour", "Fériana", "Foussana", "Haïdra", "Hassi El Frid", "Jedelienne", "Kasserine Nord", "Kasserine Sud", "Majel Bel Abbès", "Sbeitla", "Sbiba", "Thala"],
  "Kébili": ["Douz Nord", "Douz Sud", "Faouar", "Kébili Nord", "Kébili Sud", "Souk El Ahad"],
  "Kef": ["Dahmani", "Jérissa", "El Ksour", "Kalaat Senan", "Kef Est", "Kef Ouest", "Nebeur", "Sakiet Sidi Youssef", "Sers", "Tajerouine"],
  "Mahdia": ["Bou Merdes", "Chebba", "Chorbane", "El Bradâa", "El Jem", "Essouassi", "Hebira", "Ksour Essef", "Mahdia", "Melloulèche", "Ouled Chamekh", "Rejiche", "Sidi Alouane"],
  "Manouba": ["Borj El Amri", "Den Den", "Djedeida", "Douar Hicher", "El Battan", "Mornaguia", "Oued Ellil", "Tebourba"],
  "Médenine": ["Ben Gardane", "Beni Khedache", "Djerba - Ajim", "Djerba - Houmt Souk", "Djerba - Midoun", "Médenine Nord", "Médenine Sud", "Sidi Makhlouf", "Zarzis"],
  "Monastir": ["Bekalta", "Bembla", "Beni Hassen", "Jemmal", "Ksar Hellal", "Ksibet el-Médiouni", "Moknine", "Monastir", "Ouerdanine", "Sahline", "Sayada-Lamta-Bou Hajar", "Téboulba"],
  "Nabeul": ["Béni Khalled", "Béni Khiar", "Bou Argoub", "Dar Chaâbane El Fehri", "El Haouaria", "Hammam Ghezèze", "Hammamet", "Kélibia", "Korba", "Menzel Bouzelfa", "Menzel Temime", "Nabeul", "Soliman", "Takelsa"],
  "Sfax": ["Agareb", "Bir Ali Ben Khalifa", "El Amra", "El Hencha", "Graïba", "Jebiniana", "Kerkennah", "Mahrès", "Menzel Chaker", "Sakiet Eddaïer", "Sakiet Ezzit", "Sfax Ouest", "Sfax Sud", "Sfax Ville", "Skhira", "Thyna"],
  "Sidi Bouzid": ["Bir El Hafey", "Cebbala Ouled Asker", "Jilma", "Meknassy", "Menzel Bouzaiane", "Mezzouna", "Ouled Haffouz", "Regueb", "Sidi Ali Ben Aoun", "Sidi Bouzid Est", "Sidi Bouzid Ouest", "Souk Jedid"],
  "Siliana": ["Bargou", "Bou Arada", "El Aroussa", "El Krib", "Gaâfour", "Kesra", "Makthar", "Rouhia", "Sidi Bou Rouis", "Siliana Nord", "Siliana Sud"],
  "Sousse": ["Akouda", "Bouficha", "Enfida", "Hammam Sousse", "Hergla", "Kalâa Kebira", "Kalâa Seghira", "Kondar", "Msaken", "Sidi Bou Ali", "Sidi El Hani", "Sousse Jawhara", "Sousse Médina", "Sousse Riadh", "Sousse Sidi Abdelhamid"],
  "Tataouine": ["Bir Lahmar", "Dehiba", "Ghomrassen", "Remada", "Smâr", "Tataouine Nord", "Tataouine Sud"],
  "Tozeur": ["Degache", "Hazoua", "Nefta", "Tameghza", "Tozeur"],
  "Tunis": ["Bab El Bhar", "Bab Souika", "Carthage", "Cité El Khadra", "Djebel Jelloud", "El Kabaria", "El Menzah", "El Omrane", "El Omrane supérieur", "El Ouardia", "Ettahrir", "Ezzouhour", "Hraïria", "La Goulette", "La Marsa", "Le Bardo", "Le Kram", "Médina", "Séjoumi", "Sidi El Béchir", "Sidi Hassine"],
  "Zaghouan": ["Bir Mcherga", "El Fahs", "Nadhour", "Saouaf", "Zaghouan", "Zriba"]
};

const FormulaireProprietaire = () => {
  const [formData, setFormData] = useState({
    gouvernorat: '',
    delegation: '',
    phone: '',
    description: '',
    date_pub_annonce: '',
    type_annonce: '',
    type_de_logement: '',
    nombre_pieces: '',
    superficie: '',
    photos: [], // Changé pour supporter plusieurs photos
    commodites: '',
    regles: '',
    date_de_disponibilite: '',
    loyer: '',
    caution: '',
    meuble: '',
    colocataire_déjà_existant: ''
  });

  const [previews, setPreviews] = useState([]); // Prévisualisations multiples
  const [delegations, setDelegations] = useState([]);

  // Mettre à jour les délégations quand le gouvernorat change
  useEffect(() => {
    if (formData.gouvernorat && gouvernoratsDelegations[formData.gouvernorat]) {
      setDelegations(gouvernoratsDelegations[formData.gouvernorat]);
      setFormData(prev => ({ ...prev, delegation: '' }));
    } else {
      setDelegations([]);
    }
  }, [formData.gouvernorat]);

  // Pré-remplir le formulaire si une annonce à éditer existe dans le localStorage
  useEffect(() => {
    const annonceToEdit = localStorage.getItem('annonceToEdit');
    if (annonceToEdit) {
      const annonce = JSON.parse(annonceToEdit);
      setFormData({
        gouvernorat: annonce.gouvernorat || '',
        delegation: annonce.delegation || '',
        phone: annonce.phone || '',
        description: annonce.description || '',
        date_pub_annonce: annonce.date_pub_annonce || '',
        type_annonce: annonce.type_annonce || '',
        type_de_logement: annonce.type_de_logement || '',
        nombre_pieces: annonce.nombre_pieces || '',
        superficie: annonce.superficie || '',
        photos: [], // On ne pré-remplit pas les fichiers, l'utilisateur doit re-uploader
        commodites: annonce.commodites || '',
        regles: annonce.regles || '',
        date_de_disponibilite: annonce.date_de_disponibilite || '',
        loyer: annonce.loyer || '',
        caution: annonce.caution || '',
        meuble: annonce.meuble || '',
        colocataire_déjà_existant: annonce.colocataire_déjà_existant || ''
      });
      // Nettoyer après usage
      localStorage.removeItem('annonceToEdit');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      // Gestion des fichiers multiples
      const filesArray = Array.from(files);
      
      // Mise à jour des prévisualisations
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
      
      // Mise à jour de l'état des fichiers
      setFormData({ ...formData, [name]: filesArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Prépare les données
  const data = new FormData();
  for (let key in formData) {
    if (key === "photos") {
      // Envoie la première photo comme photo_de_maison (champ requis côté backend)
      if (formData.photos && formData.photos.length > 0) {
        data.append("photo_de_maison", formData.photos[0]);
        // Si tu veux gérer les autres photos plus tard, tu peux les traiter ici
        // Exemple :
        // const additional = formData.photos.slice(1).map(f => f.name); // ou autre logique
        // data.append('additional_photos', JSON.stringify(additional));
      }
    } else {
      data.append(key, formData[key]);
    }
  }

  try {
    // 2. Envoie vers l'API
    const res = await fetch('http://localhost:8000/annonces-proprietaire/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: data,
    });

    // 3. Traitement de la réponse
    if (res.ok) {
      const newAnnonce = await res.json();
      // Redirige vers la page de détail de l'annonce
      window.location.href = `/AnnoncePro/${newAnnonce.id}`;
    } else {
      alert('Erreur lors de la publication !');
    }
  } catch (err) {
    alert('Impossible de contacter le serveur.');
  }
};


  // Nettoyer les URLs d'aperçu lorsque le composant est démonté
  useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  // Supprimer une photo sélectionnée
  const removePhoto = (index) => {
    const newPhotos = [...formData.photos];
    const newPreviews = [...previews];
    
    // Révoquer l'URL de l'aperçu
    URL.revokeObjectURL(newPreviews[index]);
    
    // Supprimer la photo et l'aperçu
    newPhotos.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFormData({ ...formData, photos: newPhotos });
    setPreviews(newPreviews);
  };

  return (
   <div>
    <NavbarDash />
  
    <div className="form-container-wrapper">
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="form-title">
          <span className="form-title-icon">🏠</span>
          Publier une annonce immobilière
        </h1>
        
        <div className="form-section">
          <h2 className="section-title">
            <span className="input-icon">📍</span>
            Localisation
          </h2>
          
          <div className="grid-3">
            <div className="form-group">
              <label htmlFor="gouvernorat" className="form-label">
                <span className="input-icon">🏛️</span>
                Gouvernorat
              </label>
              <select 
                id="gouvernorat" 
                name="gouvernorat" 
                value={formData.gouvernorat}
                onChange={handleChange} 
                className="form-input" 
                required
              >
                <option value="">Sélectionnez un gouvernorat</option>
                {Object.keys(gouvernoratsDelegations).map(gouv => (
                  <option key={gouv} value={gouv}>{gouv}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="delegation" className="form-label">
                <span className="input-icon">🏘️</span>
                Délégation
              </label>
              <select 
                id="delegation" 
                name="delegation" 
                value={formData.delegation}
                onChange={handleChange} 
                className="form-input" 
                required
                disabled={!formData.gouvernorat}
              >
                <option value="">Sélectionnez une délégation</option>
                {delegations.map(del => (
                  <option key={del} value={del}>{del}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                <span className="input-icon">📱</span>
                Téléphone
              </label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange} 
                className="form-input" 
                required 
                pattern="[0-9]{8}"
                title="8 chiffres sans espaces"
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h2 className="section-title">
            <span className="input-icon">📝</span>
            Détails de l'annonce
          </h2>
          
          <div className="grid-3">
            <div className="form-group">
              <label htmlFor="date_pub_annonce" className="form-label">
                <span className="input-icon">📅</span>
                Date de publication
              </label>
              <input 
                type="date" 
                id="date_pub_annonce" 
                name="date_pub_annonce" 
                value={formData.date_pub_annonce}
                onChange={handleChange} 
                className="form-input" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="type_annonce" className="form-label">
                <span className="input-icon">📢</span>
                Type d'annonce
              </label>
              <select 
                id="type_annonce" 
                name="type_annonce" 
                value={formData.type_annonce}
                onChange={handleChange} 
                className="form-input" 
                required
              >
                <option value="">Sélectionnez...</option>
                <option value="Annonce Propriétaire">Annonce Propriétaire</option>
                <option value="Annonce Chercheur Chambre">Annonce Chercheur Chambre</option>
                <option value="Annonce Proposeur Chambre">Annonce Proposeur Chambre</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="type_de_logement" className="form-label">
                <span className="input-icon">🏠</span>
                Type de logement
              </label>
              <select 
                id="type_de_logement" 
                name="type_de_logement" 
                value={formData.type_de_logement}
                onChange={handleChange} 
                className="form-input" 
                required
              >
                <option value="">Sélectionnez...</option>
                <option value="Studio">Studio</option>
                <option value="Appartement">Appartement</option>
                <option value="Coliving">Coliving</option>
                <option value="Chambre individuelle">Chambre individuelle</option>
                <option value="Etage de villa">Etage de villa</option>
                <option value="Résidence">Résidence</option>
              </select>
            </div>
          </div>
          
          <div className="grid-3">
            <div className="form-group">
              <label htmlFor="nombre_pieces" className="form-label">
                <span className="input-icon">🚪</span>
                Nombre de pièces
              </label>
              <input 
                type="number" 
                id="nombre_pieces" 
                name="nombre_pieces" 
                value={formData.nombre_pieces}
                onChange={handleChange} 
                className="form-input" 
                min="1" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="superficie" className="form-label">
                <span className="input-icon">📏</span>
                Superficie (m²)
              </label>
              <input 
                type="number" 
                id="superficie" 
                name="superficie" 
                value={formData.superficie}
                onChange={handleChange} 
                className="form-input" 
                min="1" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="meuble" className="form-label">
                <span className="input-icon">🛋️</span>
                Meublé ?
              </label>
              <select 
                id="meuble" 
                name="meuble" 
                value={formData.meuble}
                onChange={handleChange} 
                className="form-input" 
                required
              >
                <option value="">Sélectionnez...</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              <span className="input-icon">📝</span>
              Description
            </label>
            <textarea 
              id="description" 
              name="description" 
              value={formData.description}
              onChange={handleChange} 
              className="form-input" 
              rows="4"
              placeholder="Décrivez votre propriété en détail..."
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="photos" className="form-label">
              <span className="input-icon">🖼️</span>
              Photos de la propriété (max 5)
            </label>
            <input 
              type="file" 
              id="photos" 
              name="photos" 
              onChange={handleChange} 
              accept="image/*" 
              className="form-input" 
              multiple
              required 
            />
            
            {previews.length > 0 && (
              <div className="photo-preview-container">
                <div className="photo-preview-grid">
                  {previews.map((preview, index) => (
                    <div key={index} className="photo-preview-item">
                      <img 
                        src={preview} 
                        alt={`Aperçu ${index}`} 
                        className="photo-thumb" 
                      />
                      <button 
                        type="button" 
                        className="remove-photo-btn"
                        onClick={() => removePhoto(index)}
                        aria-label="Supprimer la photo"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="photo-count">
                  {previews.length} photo{previews.length > 1 ? 's' : ''} sélectionnée{previews.length > 1 ? 's' : ''}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="form-section">
          <h2 className="section-title">
            <span className="input-icon">✅</span>
            Équipements et règles
          </h2>
          
          <div className="grid-3">
            <div className="form-group">
              <label htmlFor="commodites" className="form-label">
                <span className="input-icon">🛠️</span>
                Commodités
              </label>
              <select 
                id="commodites" 
                name="commodites" 
                value={formData.commodites}
                onChange={handleChange} 
                className="form-input" 
                required
              >
                <option value="">Sélectionnez...</option>
                <option value="Wifi">Wifi</option>
                <option value="Parking">Parking</option>
                <option value="Climatisation">Climatisation</option>
                <option value="Ascenseur">Ascenseur</option>
                <option value="Jardin">Jardin</option>
                <option value="Garage">Garage</option>
                <option value="Machine à laver">Machine à laver</option>
                <option value="Accessibilité handicapé">Accessibilité handicapé</option>
                <option value="Balcon">Balcon</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="regles" className="form-label">
                <span className="input-icon">📜</span>
                Règles
              </label>
              <select 
                id="regles" 
                name="regles" 
                value={formData.regles}
                onChange={handleChange} 
                className="form-input" 
                required
              >
                <option value="">Sélectionnez...</option>
                <option value="Fille uniquement">Fille uniquement</option>
                <option value="Garçon uniquement">Garçon uniquement</option>
                <option value="Fumeur accepté">Fumeur accepté</option>
                <option value="Non fumeur accepté">Non fumeur accepté</option>
                <option value="Animaux acceptés">Animaux acceptés</option>
                <option value="Animaux non acceptés">Animaux non acceptés</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="colocataire_déjà_existant" className="form-label">
                <span className="input-icon">👥</span>
                Colocataires existants
              </label>
              <input 
                type="number" 
                id="colocataire_déjà_existant" 
                name="colocataire_déjà_existant" 
                value={formData.colocataire_déjà_existant}
                onChange={handleChange} 
                className="form-input" 
                min="0" 
                required 
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h2 className="section-title">
            <span className="input-icon">💰</span>
            Conditions financières
          </h2>
          
          <div className="grid-3">
            <div className="form-group">
              <label htmlFor="date_de_disponibilite" className="form-label">
                <span className="input-icon">🗓️</span>
                Date de disponibilité
              </label>
              <input 
                type="date" 
                id="date_de_disponibilite" 
                name="date_de_disponibilite" 
                value={formData.date_de_disponibilite}
                onChange={handleChange} 
                className="form-input" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="loyer" className="form-label">
                <span className="input-icon">💵</span>
                Loyer (DT)
              </label>
              <input 
                type="number" 
                id="loyer" 
                name="loyer" 
                value={formData.loyer}
                onChange={handleChange} 
                className="form-input" 
                min="0" 
                step="10" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="caution" className="form-label">
                <span className="input-icon">💳</span>
                Caution (DT)
              </label>
              <input 
                type="number" 
                id="caution" 
                name="caution" 
                value={formData.caution}
                onChange={handleChange} 
                className="form-input" 
                min="0" 
                step="10" 
                required 
              />
            </div>
          </div>
        </div>
        
        <button type="submit" className="submit-button">
          <span className="button-icon">📤</span>
          Publier l'annonce
        </button>
      </form>
    </div>
  </div>
  );
};

export default FormulaireProprietaire;