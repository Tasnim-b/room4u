import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/messagerie.css';
import NavbarDash from '../components/NavbarDash';
import {
  getConversations,
  createOrGetConversation,
  getMessages,
  sendMessage
} from '../services/messaging';

const Messagerie = () => {
  const location = useLocation();
  // On lit uniquement les query params pour le destinataire
  const searchParams = new URLSearchParams(location.search);
  const destinataireId = searchParams.get('userId');
  const destinataireNom = searchParams.get('userName');
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!token) return;
    getConversations(token).then(setConversations);
  }, [token]);

  useEffect(() => {
    if (destinataireId && token) {
      createOrGetConversation(token, destinataireId).then(conv => {
        setSelectedChat(conv);
        setConversations(prev => {
          if (prev.find(c => c.id === conv.id)) return prev;
          return [conv, ...prev];
        });
      });
    }
  }, [destinataireId, token]);

  useEffect(() => {
    if (selectedChat && token) {
      getMessages(token, selectedChat.id).then(setMessages);
    }
  }, [selectedChat, token]);

  // Ajout d’un effet pour réinitialiser la sélection quand le destinataire change
  useEffect(() => {
    setSelectedChat(null);
    setMessages([]);
    setNewMessage('');
  }, [destinataireId]);

  const refreshMessages = () => {
    if (selectedChat && token) {
      getMessages(token, selectedChat.id).then(setMessages);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedChat && token) {
      setErrorMessage('');
      const response = await sendMessage(token, selectedChat.id, newMessage);
      if (response.status !== 201 && response.status !== 200) {
        setErrorMessage(response.data?.detail || JSON.stringify(response.data));
        return;
      }
      setNewMessage('');
      refreshMessages();
    }
  };

  return (
    <div className="messaging-app">
      <NavbarDash />
      <div className="chat-list">
        <div className="chat-list-header">
          <div className="user-profile">
            <h2>Discussions</h2>
          </div>
        </div>
        <div className="chats">
          {conversations.map(chat => {
            const lastMsg = chat.last_message;
            let senderName = '';
            if (lastMsg) {
              // Cherche le nom dans participants_info si sender_name est vide
              if (lastMsg.sender_name && lastMsg.sender_name !== 'Inconnu') {
                senderName = lastMsg.sender_name;
              } else {
                const senderUser = chat.participants_info.find(u => String(u.id) === String(lastMsg.sender));
                senderName = senderUser ? `${senderUser.nom} ${senderUser.prenom}` : 'Inconnu';
              }
            }
            return (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="chat-info">
                  <div className="chat-header2">
                    <h3>
                      {chat.participants_info
                        .filter(u => String(u.id) !== String(userId))
                        .map(u => `${u.nom} ${u.prenom}`)
                        .join(', ')}
                    </h3>
                  </div>
                  <div className="chat-preview">
                    {lastMsg ? (
                      <p style={{ color: '#333', fontWeight: lastMsg.is_read ? 'normal' : 'bold', margin: 0 }}>
                        <span style={{ fontWeight: 'bold' }}>{senderName}:</span> {lastMsg.text}
                      </p>
                    ) : (
                      <p style={{ color: '#aaa', margin: 0 }}><i>Aucun message</i></p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-window">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="contact-info">
                <h2>
                  {selectedChat.participants_info
                    .filter(u => String(u.id) !== String(userId))
                    .map(u => `${u.nom} ${u.prenom}`)
                    .join(', ')}
                </h2>
              </div>
              <button onClick={refreshMessages}>Rafraîchir</button>
            </div>
            <div className="messages-container">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`message ${String(message.sender) === String(userId) ? 'sent' : 'received'}`}
                >
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    <div className="message-footer">
                      <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Écrire un message..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Envoyer</button>
              {errorMessage && (
                <div style={{ color: 'red', marginTop: 4 }}>{errorMessage}</div>
              )}
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Sélectionnez une discussion pour commencer à chatter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messagerie;