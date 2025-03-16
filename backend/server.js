const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("⚠️ Warning: GEMINI_API_KEY is not set. API calls will fail.");
}

// Improved code request detection
const isCodeRequest = (input) => {
  const codePatterns = new RegExp([
    "\\bfunction\\b", "\\bclass\\b", "\\bdef\\b", "\\bimport\\b",
    "\\breturn\\b", "\\bif\\b", "\\bfor\\b", "\\bwhile\\b", "console\\.log\\(",
    "generate\\s+code", "write\\s+a\\s+program", "create\\s+a\\s+script"
  ].join("|"), "i");

  return codePatterns.test(input);
};

app.post("/ask", async (req, res) => {
  try {
    let { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: "Bad Request", message: "Prompt is required" });
    }
    
    // Force AI to return structured code output
  prompt = `${prompt} Provide only the code in a structured format. Ensure it's clean and well-organized. At the end, include a concise explanation inside comments without omitting it. Do not include triple backticks at the end.`;  
 



    // Reject non-code queries
    if (!isCodeRequest(prompt)) {
      return res.status(400).json({
        error: "Invalid Request",
        message: "I only provide code. Please ask something related to programming."
      });
    }
    
    // Call Gemini API
    const response = await axios.post(
      GEMINI_API_URL,
      { contents: [{ role: "user", parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" }, params: { key: API_KEY } }
    );

    let aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Clean markdown (if any)
    aiResponse = aiResponse.replace(/```[\s\S]*?\n/g, "").trim();

    if (!aiResponse) {
      return res.status(204).json({ message: "AI returned an empty response. Try rephrasing your query." });
    }

    res.json({ response: aiResponse });

  } catch (error) {
    console.error("🔥 Error:", error);

    if (error.response) {
      return res.status(error.response.status).json({
        error: "API Error",
        message: error.response.data?.error?.message || "Error from Gemini API",
        details: error.response.data
      });
    } else if (error.request) {
      return res.status(503).json({ error: "Service Unavailable", message: "No response from Gemini API" });
    } else {
      return res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
  }
});

// Health check endpoint
app.get("/", (req, res) => res.send("✅ Server is running"));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
