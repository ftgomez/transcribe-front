import React, { useState } from "react";
import Dropzone from "./components/Dropzone";
import "./App.css"; 

const App = () => {
  const [transcript, setTranscript] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);


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
          console.log("File uploaded successfully");
        } else {
          console.error("Error uploading the file");
        }
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
  
      // Process the audio file and send it to the Google Speech-to-Text API
      // ...
      // Get the transcript and update the component state
      // ...
    } else {
      console.error("Please upload an MP3 file");
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    addMessage("user", userQuestion);
    addMessage("bot", "This is a generic answer.");
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

