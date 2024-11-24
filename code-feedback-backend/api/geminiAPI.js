const axios = require('axios');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyBdRliutqzanqmtA4B3bkL6PS8piaMOmrk";
async function fetchFeedbackFromGeminiAPI(code, language) {
  console.log("Code:", code, "Language:", language);
  const genAI = new GoogleGenerativeAI({ apiKey });  
  const prompt = `Analyze this ${language} code and provide feedback on:
  1. Time complexity
  2. Space complexity
  3. Code quality and best practices
  4. Potential improvements
  
  Code:
  ${code}`;
  try {
    // Make sure to adjust the method to generate content based on the API documentation
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    // Check the response structure to access the text correctly
    console.log("result",result)
    // console.log("Feedback:", result.response ? result.response.text : result);
    return result.response ? result.response.text : result;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    throw new Error('Failed to get code feedback');
  }
}

module.exports = { fetchFeedbackFromGeminiAPI };
