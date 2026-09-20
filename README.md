Text-to-Speech Conversion

A full-stack Text-to-Speech web application built with React, Node.js, Express, and the ElevenLabs Text-to-Speech API.

Overview

This application allows users to:

Enter text for speech generation

Select a supported language

Select a voice that matches the selected language

Generate natural-sounding speech

Play the generated audio in the browser

Download the generated MP3 audio

Clear the current input/audio

Receive validation and API error messages

The application uses a React frontend deployed on Vercel and a Node.js/Express backend deployed on Render. The backend communicates with ElevenLabs so the API key is never exposed to the frontend.

Technology Stack

Frontend

React

Vite

JavaScript

Bootstrap

Font Awesome

Fetch API

Backend

Node.js

Express.js

CORS

express-rate-limit

ElevenLabs JavaScript SDK

External Service

ElevenLabs Text-to-Speech API

Deployment

Frontend: Vercel

Backend: Render

Project Structure

Text_to_Speech/
├── frontend/
│   ├── public/
│   └── src/
│       ├── landing_page/
│       │   ├── Header.jsx
│       │   ├── TextInput.jsx
│       │   ├── LanguageSelector.jsx
│       │   ├── VoiceSelector.jsx
│       │   ├── ActionButtons.jsx
│       │   ├── AudioPlayer.jsx
│       │   └── ErrorMessage.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md

Supported Languages and Voices

The current application supports:

Language

Voices

English (en-IN)

English Female, English Male

Hindi (hi-IN)

Hindi Female, Hindi Male

The backend verifies that the selected voice belongs to the selected language.

Application Flow

User enters text
       ↓
React Frontend
       ↓
POST /api/tts
       ↓
Node.js + Express Backend
       ↓
Input validation
       ↓
ElevenLabs Text-to-Speech API
       ↓
Generated MP3 audio
       ↓
Backend returns audio
       ↓
React Audio Player
       ↓
Play / Download

Validation and Error Handling

The application validates:

Empty text

Text longer than 5000 characters

Unsupported language

Invalid voice

Voice/language mismatch

API/server errors

Too many speech-generation requests

The /api/tts endpoint is protected with rate limiting.

Environment Variables

Backend

Create backend/.env:

ELEVENLABS_API_KEY=your_elevenlabs_api_key
FRONTEND_URL=https://text-to-speech-rose-alpha.vercel.app

For production, FRONTEND_URL should contain the deployed frontend URL.

Frontend

Create frontend/.env:

VITE_API_URL=https://text-to-speech-4yuo.onrender.com

For production, VITE_API_URL should contain the deployed backend URL.

Never commit .env files or API keys to GitHub.

Local Setup

1. Clone the repository

git clone https://github.com/rohankaushik05/Text_to_Speech.git
cd Text_to_Speech

2. Install frontend dependencies

cd frontend
npm install

3. Configure frontend environment variables

Create frontend/.env:

VITE_API_URL=https://text-to-speech-4yuo.onrender.com

4. Install backend dependencies

Open another terminal:

cd Text_to_Speech/backend
npm install

5. Configure backend environment variables

Create backend/.env:

ELEVENLABS_API_KEY=your_elevenlabs_api_key
FRONTEND_URL=https://text-to-speech-rose-alpha.vercel.app

6. Start the backend

From the backend folder:

node server.js

The backend runs on:

https://text-to-speech-4yuo.onrender.com

7. Start the frontend

From the frontend folder:

npm run dev

The Vite development server normally runs on:

https://text-to-speech-rose-alpha.vercel.app

API Endpoints

Method

Endpoint

Purpose

GET

/

Basic server check

GET

/api/health

Backend health check

POST

/api/tts

Generate speech

GET

/api/voices

Retrieve ElevenLabs voices

Detailed API information is available in API_DOCUMENTATION.md.

Deployment

The application is deployed as two services:

Frontend: Vercel

Backend: Render

GitHub Repository

https://github.com/rohankaushik05/Text_to_Speech

Live Application

Add your final Vercel deployment URL here.

Backend API

Add your final Render deployment URL here.

Security

ElevenLabs API credentials are stored only on the backend.

.env files are excluded from Git.

CORS restricts backend access to the configured frontend origin.

Speech generation requests are rate-limited.

User input is validated on the backend before calling ElevenLabs.

Testing

The application was tested for:

Normal speech generation

Empty input

Text exceeding 5000 characters

Invalid language

Invalid voice

Voice/language mismatch

Backend health endpoint

Audio playback

Audio download

Backend/frontend communication

API testing through Postman

Production deployment

Project Level

This implementation corresponds to the project's Level 1 – Basic version:

React
  +
Node.js / Express
  +
TTS API

The project does not use a database or authentication.

License

This project was created as an educational full-stack development project.