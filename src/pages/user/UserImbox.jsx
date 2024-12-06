import { useEffect, useState } from 'react';
import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import { Client } from '@stomp/stompjs';

import "./StyleChat.css";

export const UserImbox = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('Unknown');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8089/websocket',
      onConnect: () => {
        console.log('Conexión WebSocket establecida');
        setConnected(true);
        client.subscribe('/tema/messages', (message) => {
          console.log('Mensaje recibido:', message);
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      onError: (error) => {
        console.error('Error en STOMP:', error);
        setConnected(false);
      }
    });

    client.activate();
    setStompClient(client);
    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && name && message) {
      stompClient.publish({
        destination: '/app/send',
        body: JSON.stringify({
          name,
          content: message
        })
      });
      setMessage('');
    } else {
      alert('Por favor, ingrese un nombre y un mensaje.');
    }
  };

  return (
    <>
      <div className="container chat-container">
        <div className="row">
          <div className="col-md-4">
            <div className="user-list">
              <h5>Tus mensajes</h5>
              <div className="user-item">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                  alt="User"
                  className="user-logo"
                />
                <span>Diegogo</span>
              </div>
            </div>
          </div>
          <div className="col-md-8 chat-box">
            <h5>Chat</h5>
            <h6 className="text-start text-secondary">

            </h6>
            <div className="chat-messages">
              {(messages || []).map((msg, i) => (
                <div
                  key={i}
                  className={`message-item ${msg.name === name ? 'message-sent' : 'message-received'
                    }`}
                >
                  <span>
                    <b>{msg.name}</b>: {msg.content}
                  </span>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="txtName"
                type="text"
                className="form-control"
                placeholder="Tu nombre(prov)"
              />

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="form-control"
              />
              <button className="btn btn-primary" onClick={sendMessage}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};