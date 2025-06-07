import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaCheck, FaTrash, FaHome, FaEnvelope, FaUserFriends } from 'react-icons/fa';
import '../styles/Notification.css';
import NavbarColoc from '../components/NavbarColoc';

// ✅ Données mockées
const mockNotifications = [
  {
    id: 1,
    message: "Un nouveau logement correspondant à vos critères est disponible.",
    notification_type: "NEW_HOUSING",
    created_at: "2025-05-18T14:35:00Z",
    read: false,
    link: "/annonces/101"
  },
  {
    id: 2,
    message: "Vous avez un nouveau message de Clara.",
    notification_type: "MESSAGE",
    created_at: "2025-05-17T09:15:00Z",
    read: true,
    link: "/messages/2"
  },
  {
    id: 3,
    message: "Nouveau match trouvé avec un colocataire !",
    notification_type: "NEW_MATCH",
    created_at: "2025-05-16T18:20:00Z",
    read: false,
    link: "/profils/partenaire"
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // ✅ Simulation d’un appel API avec délai
        const timer = setTimeout(() => {
          setNotifications(mockNotifications);
          setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
      } catch (err) {
        setError("Erreur lors du chargement");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = async (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = async () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'NEW_HOUSING':
        return <FaHome className="notification-icon housing" />;
      case 'NEW_MATCH':
        return <FaUserFriends className="notification-icon match" />;
      case 'MESSAGE':
        return <FaEnvelope className="notification-icon message" />;
      default:
        return <FaBell className="notification-icon default" />;
    }
  };

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="notifications-container">
    <NavbarColoc/>
      <header className="notifications-header">
        <h1><FaBell /> Notifications</h1>
        <button onClick={markAllAsRead} className="mark-all-read">
          <FaCheck /> Tout marquer comme lu
        </button>
      </header>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="empty-notifications">
            <p>Aucune notification pour le moment</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-icon-container">
                {getNotificationIcon(notification.notification_type)}
              </div>

              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                <small className="notification-time">
                  {new Date(notification.created_at).toLocaleString('fr-FR')}
                </small>
              </div>

              <div className="notification-actions">
                {notification.link && (
                  <Link
                    to={notification.link}
                    className="view-link"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Voir
                  </Link>
                )}
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="mark-read"
                  title="Marquer comme lu"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="delete"
                  title="Supprimer"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
