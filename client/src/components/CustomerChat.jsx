import React, { useState } from 'react';

function CustomerChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input.trim() }];
      setMessages(newMessages);
      setInput('');

      // Simulate a bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Thank you for your message. A representative will be with you shortly (this is a dummy chat).' }]);
      }, 1000);
    }
  };

  return (
    <div className="customer-chat">
      <button className="btn btn-info rounded-circle p-3 shadow-lg chat-toggle-btn" onClick={toggleChat}>
        <i className="fas fa-comments"></i>
      </button>

      {isOpen && (
        <div className="chat-window card shadow-lg">
          <div className="card-header d-flex justify-content-between align-items-center">
            <strong>Live Chat Support</strong>
            <button type="button" className="btn-close" aria-label="Close" onClick={toggleChat}></button>
          </div>
          <div className="card-body chat-messages">
            {messages.length === 0 ? (
              <p className="text-muted text-center">Type your message below...</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <span className="badge bg-secondary">{msg.sender === 'user' ? 'You' : 'Support'}:</span> {msg.text}
                </div>
              ))
            )}
          </div>
          <div className="card-footer">
            <form onSubmit={handleSendMessage} className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerChat;
