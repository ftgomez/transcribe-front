// src/App.js
import React, { useState } from "react";
import Dropzone from "./components/Dropzone";

const App = () => {
  const [transcript, setTranscript] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [botAnswer, setBotAnswer] = useState("");

  const handleFileUpload = async (files) => {
    // Process the audio file and send it to the Google Speech-to-Text API
    // ...
    // Get the transcript and update the component state
    // ...
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    // Send the user's question and the transcript to Dialogflow API
    // ...
    // Get the bot's answer and update the component state
    // ...
  };

  return (
    <div className="App">
      <h1>Audio Transcript Chatbot</h1>
      <Dropzone onDrop={handleFileUpload} />
      <div>
        <h2>Transcript</h2>
        <pre>{transcript}</pre>
      </div>
      <form onSubmit={handleQuestionSubmit}>
        <label htmlFor="question">Ask a question:</label>
        <input
          type="text"
          id="question"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Bot Answer</h2>
        <p>{botAnswer}</p>
      </div>
    </div>
  );
};

export default App;

