import React, { useState, useEffect, useRef } from "react";
import Dropzone from "./components/Dropzone";
import "./App.css"; 

const App = () => {
  const [transcript, setTranscript] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      content: 'Hola! Bienvenido a AudioGPT. Carga un archivo MP3 y hazme preguntas sobre su contenido.',
    },
  ]);
  const [chatId, setChatId] = useState("");
  const [showTranscript, setShowTranscript] = useState(false);
  const chatContainerRef = useRef(null);

  const toggleTranscript = () => {
    setShowTranscript(!showTranscript);
  };
  
  const handleFileUpload = async (files) => {
    const file = files[0];
  
    if (file.type === "audio/mpeg") {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch("http://localhost:3001/upload", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          console.log("Archivo movido exitosamente");
        } else {
          console.error("Error moviendo el archivo");
        }
      } catch (error) {
        console.error("Error moviendo el archivo:", error);
      }

      addMessage("bot", "Cargando transcripción...")

      const query = {path: `data/${file.path}`, query: ""}

      const audio = await fetch("http://localhost:8000/create_chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query)
      }
    )

    if (audio.ok) {
      const result = await audio.json();
      console.log("Chat ID:", result.chat_id);
      setTranscript(result.transcript)
      setChatId(result.chat_id)
      addMessage("bot", "Audio listo. Hazme una pregunta")

    } else {
      console.error("Error:", audio.statusText);
    }
  
    } else {
      console.error("Por favor subir un archivo MP3");
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    addMessage("user", userQuestion);
    setUserQuestion("");
    const query = {query: userQuestion}

      const audio = await fetch(`http://localhost:8000/chat/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query)
      }
    )

    if (audio.ok) {
      const result = await audio.json();
      console.log(result.response);
      addMessage("bot", result.response);

    } else {
      console.error("Error:", audio.statusText);
    }

  };

  const addMessage = (sender, content) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: sender,
        content: content,
      },
    ]);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <div className="App">
      <h1>AudioGPT</h1>
      <Dropzone onDrop={handleFileUpload} />
      <div>
      <button type="submit" onClick={toggleTranscript} style={{ marginTop: '20px' }}>
        {showTranscript ? "Ocultar Transcripción" : "Mostrar Transcripción"}
      </button>
      {showTranscript && (
        <div className="transcript-container">{transcript}</div>
      )}
    </div>
      <div className="chat-container" ref={chatContainerRef}>
        <ul className="chat-messages">
          {messages.map((message, index) => (
            <li key={index} className={message.sender === "user" ? "user-message" : "bot-message"}>
              <span className="message-content">{message.content}</span>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleQuestionSubmit}>
        <label htmlFor="question">Pregunta:&nbsp;&nbsp;</label>
        <input
          type="text"
          id="question"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
        />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
};

export default App;

