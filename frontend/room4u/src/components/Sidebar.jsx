import React, { useState } from 'react';
import '../styles/sidebar.css';

const Sidebar = () => {
  const [age, setAge] = useState(30);
  const [budget, setBudget] = useState([100, 1400]);
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [selectedDelegation, setSelectedDelegation] = useState('');

  const governorates = [
    { name: "Ariana", delegations: ["Ariana Ville", "Ettadhamen", "Raoued", "Soukra", "Kalaat El Andalous"] },
    { name: "Béja", delegations: ["Béja Nord", "Béja Sud", "Testour", "Nefza"] },
    { name: "Ben Arous", delegations: ["Ben Arous", "Ezzahra", "Hammam Lif", "Mornag"] },
    { name: "Bizerte", delegations: ["Bizerte Nord", "Bizerte Sud", "Menzel Bourguiba", "Ras Jebel"] },
    { name: "Gabès", delegations: ["Gabès Ville", "Mareth", "El Hamma", "Ghannouch"] },
    { name: "Gafsa", delegations: ["Gafsa Sud", "Gafsa Nord", "Métlaoui", "Redeyef"] },
    { name: "Jendouba", delegations: ["Jendouba Ville", "Ghardimaou", "Fernana", "Bou Salem"] },
    { name: "Kairouan", delegations: ["Kairouan Nord", "Kairouan Sud", "Sbikha", "Nasrallah"] },
    { name: "Kasserine", delegations: ["Kasserine Nord", "Kasserine Sud", "Sbeitla", "Thala"] },
    { name: "Kébili", delegations: ["Kébili Sud", "Kébili Nord", "Douz", "Souk Lahad"] },
    { name: "Le Kef", delegations: ["Le Kef Est", "Le Kef Ouest", "Dahmani", "Tajerouine"] },
    { name: "Mahdia", delegations: ["Mahdia Ville", "Chebba", "El Jem", "Ksour Essef"] },
    { name: "La Manouba", delegations: ["Manouba", "Denden", "Douar Hicher", "Oued Ellil"] },
    { name: "Médenine", delegations: ["Médenine Ville", "Zarzis", "Ben Guerdane", "Djerba Midoun"] },
    { name: "Monastir", delegations: ["Monastir Ville", "Sahline", "Jemmal", "Ksibet El Mediouni"] },
    { name: "Nabeul", delegations: ["Nabeul Ville", "Hammamet", "Dar Chaabane", "Korba"] },
    { name: "Sfax", delegations: ["Sfax Ville", "Sakiet Eddaïer", "Thyna", "El Ain"] },
    { name: "Sidi Bouzid", delegations: ["Sidi Bouzid Est", "Sidi Bouzid Ouest", "Regueb", "Meknassi"] },
    { name: "Siliana", delegations: ["Siliana Ville", "Gaâfour", "Bargou", "Kesra"] },
    { name: "Sousse", delegations: ["Sousse Ville", "Msaken", "Akouda", "Hammam Sousse"] },
    { name: "Tataouine", delegations: ["Tataouine Nord", "Tataouine Sud", "Bir Lahmar", "Ghomrassen"] },
    { name: "Tozeur", delegations: ["Tozeur Ville", "Nefta", "Degache", "Hazoua"] },
    { name: "Tunis", delegations: ["Bab El Bhar", "El Omrane", "El Menzah", "La Marsa", "Carthage"] },
    { name: "Zaghouan", delegations: ["Zaghouan Ville", "El Fahs", "Zriba"] }
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Filtres</h2>

      <div className="filter-section">
        <h3>Âge</h3>
        <div className="age-range">
          <input 
            type="range" 
            min="16" 
            max="56" 
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <div className="range-values">
            <span>16 ans</span>
            <span>{age} ans</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3>Localisation</h3>
        <select 
          className="select-input"
          value={selectedGovernorate}
          onChange={(e) => setSelectedGovernorate(e.target.value)}
        >
          <option value="">Sélectionner un gouvernorat</option>
          {governorates.map((gov, index) => (
            <option key={index} value={gov.name}>{gov.name}</option>
          ))}
        </select>

        {selectedGovernorate && (
          <select
            className="select-input"
            value={selectedDelegation}
            onChange={(e) => setSelectedDelegation(e.target.value)}
          >
            <option value="">Sélectionner une délégation</option>
            {governorates.find(g => g.name === selectedGovernorate)
              ?.delegations.map((del, index) => (
                <option key={index} value={del}>{del}</option>
              ))}
          </select>
        )}
      </div>

      <div className="filter-section">
        <h3>Budget (DT)</h3>
        <div className="budget-range">
          <div className="range-inputs">
            <input 
              type="number" 
              value={budget[0]} 
              onChange={(e) => setBudget([e.target.value, budget[1]])}
            />
            <span>-</span>
            <input 
              type="number" 
              value={budget[1]} 
              onChange={(e) => setBudget([budget[0], e.target.value])}
            />
          </div>
          <input
            type="range"
            min="100"
            max="1400"
            step="100"
            value={budget[1]}
            onChange={(e) => setBudget([budget[0], e.target.value])}
          />
        </div>
      </div>

      <div className="buttons-container">
        <button 
          className="reset-button"
          onClick={() => {
            setAge(30);
            setBudget([100, 1400]);
            setSelectedGovernorate('');
            setSelectedDelegation('');
          }}
        >
          Réinitialiser
        </button>
        <button 
          className="filter-button"
          onClick={() => console.log('Filtrer avec:', { age, budget, selectedGovernorate, selectedDelegation })}
        >
          Filtrer
        </button>
      </div>
    </div>
  );
};

export default Sidebar;