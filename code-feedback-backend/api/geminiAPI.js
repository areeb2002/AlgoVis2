const axios = require('axios');
const { GoogleGenerativeAI, GoogleAIFileManager } = require('@google/generative-ai'); // Adjust the path as necessary
require('dotenv').config();

async function fetchFeedbackFromGeminiAPI(code, language) {
  // ... existing code ...

  // // Replace the existing API key retrieval
  // const genAI = new GoogleGenerativeAI(AIzaSyDzBdun-CFlwxRaqsAqK4WvOo4taOheZ3Y);
  // const fileManager = new GoogleAIFileManager(AIzaSyDzBdun-CFlwxRaqsAqK4WvOo4taOheZ3Y);
  const apiKey = AIzaSyDzBdun-CFlwxRaqsAqK4WvOo4taOheZ3Y; // Ensure you have this in your .env file
  const genAI = new GoogleGenerativeAI(apiKey);
  const fileManager = new GoogleAIFileManager(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  // Upload the file and specify a display name.
  const uploadResponse = await fileManager.uploadFile("media/gemini.pdf", {
    mimeType: "application/pdf",
    displayName: "Gemini 1.5 PDF",
  });

  // View the response.
  console.log(
    `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`,
  );

  // Generate content using text and the URI reference for the uploaded file.
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
    { text: "Can you summarize this document as a bulleted list?" },
  ]);

  // Output the generated text to the console
  console.log(result.response.text());
} 

module.exports = { fetchFeedbackFromGeminiAPI };