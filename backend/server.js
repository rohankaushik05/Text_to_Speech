require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { ElevenLabsClient } = require("@elevenlabs/elevenlabs-js");
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY
});

app.use(
  cors({
    origin: allowedOrigin
  })
);
app.use(express.json());

const ttsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    message: "Too many speech generation requests. Please try again later."
  }
});

app.get("/", (req, res) => {
  res.send("yes, working...");
});

app.get("/api/health", (req, res) => {
  res.json({
    message: "Backend Connection Successful",
  });
});

const voiceMap = {
  "en-IN-female": "hpp4J3VqNfWAUOO0d1Us",
  "en-IN-male": "JBFqnCBsd6RMkjVDRZzb",
  "hi-IN-female": "EXAVITQu4vr4xnSDxMaL",
  "hi-IN-male": "N2lVS1w4EtoT3dr4eOWO"
};

app.post("/api/tts", ttsLimiter , async (req, res) => {
  try {
    const { text, language, voice } = req.body;

    // 1. Validate text
    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        message: "Text is required"
      });
    }

    // 2. Validate text length
    if (text.length > 5000) {
      return res.status(400).json({
        message: "Text cannot exceed 5000 characters"
      });
    }

    // 3. Validate language
    const allowedLanguages = ["en-IN", "hi-IN"];

    if (!allowedLanguages.includes(language)) {
      return res.status(400).json({
        message: "Invalid language"
      });
    }

    // 4. Validate voice
    const voiceId = voiceMap[voice];

    if (!voiceId) {
      return res.status(400).json({
        message: "Invalid voice"
      });
    }

    // 5. Validate voice belongs to selected language
    const validVoiceForLanguage =
      (language === "en-IN" && voice.startsWith("en-IN")) ||
      (language === "hi-IN" && voice.startsWith("hi-IN"));

    if (!validVoiceForLanguage) {
      return res.status(400).json({
        message: "Selected voice does not match the selected language"
      });
    }

    console.log(
      "Generating speech for:",
      text,
      "| Language:",
      language,
      "| Voice ID:",
      voiceId
    );

    const audio = await elevenlabs.textToSpeech.convert(
      voiceId,
      {
        text: text,
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128"
      }
    );

    const chunks = [];

    for await (const chunk of audio) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);

    console.log("Audio generated successfully");

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.length
    });

    res.send(audioBuffer);

  } catch (error) {
    console.error("ElevenLabs error:", error);

    res.status(500).json({
      message: "Failed to generate speech"
    });
  }
});

app.get("/api/voices", async (req, res) => {
  try {
    const response = await fetch("https://api.elevenlabs.io/v2/voices", {
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY
      }
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching voices:", error);

    res.status(500).json({
      message: "Failed to fetch voices"
    });
  }
});

app.listen(port, () => {
  console.log("Server started workinnn........");
});
