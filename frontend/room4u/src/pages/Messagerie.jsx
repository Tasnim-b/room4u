import React, { useState } from 'react';
import '../styles/messagerie.css';
import NavbarDash from '../components/NavbarDash';

const Messagerie = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Salut ça va ?', sender: 'them', timestamp: '09:30' },
    { id: 2, text: 'Oui et toi ?', sender: 'me', timestamp: '09:31', status: 'read' },
    { id: 3, text: 'Très bien merci !', sender: 'them', timestamp: '09:32' },
  ]);

  const chats = [
    { id: 1, name: 'Amine', lastMessage: 'Très bien merci !', timestamp: '09:32', unread: 0, online: true },
    { id: 2, name: 'Sarah', lastMessage: 'À demain !', timestamp: '08:45', unread: 2, online: false },
    { id: 3, name: 'Karim', lastMessage: 'Ok compris', timestamp: '07:15', unread: 0, online: true },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
     
    <div className="messaging-app">
    <NavbarDash /> 
      {/* Left Panel */}
      <div className="chat-list">
        <div className="chat-list-header">
          <div className="user-profile">
            {/* <div className="profile-pic online"></div> */}
            <h2>Discussions</h2>
          </div>
        </div>

        <div className="chats">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="profile-pic-container">
                <div className={`profile-pic ${chat.online ? 'online' : ''}`}></div>
              </div>
              <div className="chat-info">
                <div className="chat-header2">
                  <h3>{chat.name}</h3>
                  <span className="timestamp">{chat.timestamp}</span>
                </div>
                <div className="chat-preview">
                  <p>{chat.lastMessage}</p>
                  {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="chat-window">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="back-button" onClick={() => setSelectedChat(null)}>‹</div>
              <div className="profile-pic-container">
                <div className={`profile-pic ${selectedChat.online ? 'online' : ''}`}></div>
              </div>
              <div className="contact-info">
                <h2>{selectedChat.name}</h2>
                <p>{selectedChat.online ? 'En ligne' : 'Hors ligne'}</p>
              </div>
            </div>

            <div className="messages-container">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                >
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    <div className="message-footer">
                      <span className="timestamp">{message.timestamp}</span>
                      {message.sender === 'me' && (
                        <span className="status-icon">
                          {message.status === 'read' ? '✓✓' : '✓'}
                        </span>
                      )}
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
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
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