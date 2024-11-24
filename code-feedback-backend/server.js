const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { executePythonCode } = require('./execution/pythonExec');
const { executeJavaScriptCode } = require('./execution/javascriptExec');
const { executeCCode } = require('./execution/cExec');
const { executeCppCode } = require('./execution/cppExec');
const { executeJavaCode } = require('./execution/javaExec');
const { fetchFeedbackFromGeminiAPI } = require('./api/geminiAPI');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors('http://localhost:4000'));
app.use(bodyParser.json());

// Add this middleware before your routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!', details: err.message });
});

// Your existing routes with improved error handling...
app.post('/execute-code', async (req, res) => {
  const { code, language } = req.body;
  
  if (!code || !language) {
    return res.status(400).json({ 
      error: 'Missing required fields', 
      details: 'Both code and language must be provided' 
    });
  }
  
  try {
    let output = '';
    
    switch(language.toLowerCase()) {
      case 'python':
        output = await executePythonCode(code);
        break;
      case 'javascript':
        output = await executeJavaScriptCode(code);
        break;
      case 'c':
        output = await executeCCode(code);
        break;
      case 'cpp':
        output = await executeCppCode(code);
        break;
      case 'java':
        output = await executeJavaCode(code);
        break;
      default:
        return res.status(400).json({ 
          error: 'Unsupported language',
          details: `Language '${language}' is not supported`
        });
    }

    res.json({ output: output.trim() });
  } catch (err) {
    console.error('Error executing code:', err);
    res.status(500).json({ 
      error: 'Error executing code', 
      details: err.message || 'Unknown error occurred'
    });
  }
});

app.post('/get-feedback', async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({
      error: 'Missing required fields',
      details: 'Both code and language must be provided'
    });
  }

  try {
    const feedback = await fetchFeedbackFromGeminiAPI(code, language);
    res.json({ feedback });
  } catch (err) {
    console.error('Error fetching feedback:', err);
    res.status(500).json({
      error: 'Error fetching feedback',
      details: err.message || 'Unknown error occurred'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
