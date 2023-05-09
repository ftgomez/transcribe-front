import React, { useState } from "react";
import Dropzone from "./components/Dropzone";
import "./App.css"; // Import the new CSS file

const App = () => {
  const [transcript, setTranscript] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const handleFileUpload = async (files) => {
    // Process the audio file and send it to the Google Speech-to-Text API
    // ...
    // Get the transcript and update the component state
    // ...
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    // Add the user question and generic answer to the messages array
    addMessage("user", userQuestion);
    addMessage("bot", "This is a generic answer.");
    // Clear the user question input field
    setUserQuestion("");
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

  return (
    <div className="App">
      <h1>AudioGPT</h1>
      <Dropzone onDrop={handleFileUpload} />
      <div>
        <h2>Transcripción</h2>
        <pre>{transcript}</pre>
      </div>
      <div className="chat-container">
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

