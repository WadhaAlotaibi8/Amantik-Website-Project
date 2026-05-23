import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

function Chat() {
  const navigate = useNavigate();

  // ✅ EMPTY chat at first
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  function sendMessage() {
    if (!newMessage.trim()) return;

    setMessages(prev => [
      ...prev,
      { sender: "me", text: newMessage }
    ]);

    setNewMessage("");
  }

  return (
    <div className="chat-page">

      {/* HEADER */}
      <header className="chat-header">
      <button className="back-btn" onClick={() => navigate("/user")}>
        ← Back
      </button>
        <h2>Chat</h2>
      </header>

      {/* CHAT BODY */}
      <div className="chat-container">
        {messages.length === 0 ? (
          <p className="empty-chat">
            Start the conversation 👋
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === "me" ? "my-msg" : "other-msg"
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
}

export default Chat;
