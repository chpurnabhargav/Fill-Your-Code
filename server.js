import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(express.json());
app.use(cors());

const api_key = "AIzaSyDiBsiAMyY0Q0JSSYxEzkJmoYsy3Vg7UqE";
const genAI = new GoogleGenerativeAI(api_key);

app.post("/autocomplete", async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ error: "No code provided" });
        }

        // ✅ Use a verified model name
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); 

        const result = await model.generateContent(code); // Fixed call syntax
        const response = await result.response.candidates[0].content;


        res.json({ completion: response });
    } catch (error) {
        console.error("Error fetching completion:", error);
        res.status(500).json({ error: error.message || "Error fetching completion" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
