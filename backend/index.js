const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("Gemini AI Server Running 🚀");
});

app.post("/api/chat", async (req, res) => {

  try {

    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest"
    });

    const result = await model.generateContent(message);

    const response = result.response.text();

    res.json({
      success: true,
      reply: response
    });

  } catch (error) {

    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      error: "AI request failed"
    });

  }

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});