import React, { useState } from "react";
import "../css/CodeFeedback.css";
import axios from "axios";

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';

const CodeFeedback = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleRunCode = async () => {
    try {
      const response = await fetch('http://localhost:5000/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setOutput(`Error: ${data.details || data.error || 'Unknown error occurred'}`);
        return;
      }

      setOutput(data.output || 'No output');
    } catch (error) {
      setOutput(`Error: ${error.message || 'Failed to execute code'}`);
    }
  };
  

  const handleGetFeedback = async () => {
    try {
      setFeedback("Analyzing code...");
      const response = await axios.post("/get-feedback", { 
        code,
        language 
      });
      setFeedback(response.data.feedback || "No feedback available");
    } catch (error) {
      console.error("Error getting feedback:", error);
      setFeedback(
        "Error analyzing code. Please try again later."
      );
    }
  };

  return (
    <div className="code-feedback">
      <h2>Code Execution & Feedback Generator</h2>
      <div className="code-container">
        <div className="code-input">
          <div className="code-header">
            <h3>Write Your Code:</h3>
            <select
              className="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          </div>
          <textarea
            placeholder="Write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
          <div className="buttons">
            <button onClick={handleRunCode}>Run Code</button>
            <button onClick={handleGetFeedback}>Get Feedback</button>
          </div>
        </div>

        <div className="right-container">
          <div className="output-container">
            <h3>Output:</h3>
            <div>{output}</div>
          </div>

          <div className="feedback-container">
            <h3>Feedback:</h3>
            <div>{feedback}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeFeedback;
