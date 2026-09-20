Text-to-Speech API Documentation

Base URLs

Production

https://text-to-speech-4yuo.onrender.com

1. Health Check

Endpoint

GET /api/health

Purpose

Checks whether the backend server is running and reachable.

Request

No request body is required.

Example

GET https://text-to-speech-4yuo.onrender.com/api/health

Successful Response

Status: 200 OK

{
  "message": "Backend Connection Successful"
}

2. Generate Speech

Endpoint

POST /api/tts

Purpose

Accepts text, language, and voice information and returns generated MP3 audio from ElevenLabs.

Headers

Content-Type: application/json

Request Body

{
  "text": "Hello, welcome to the Text-to-Speech application.",
  "language": "en-IN",
  "voice": "en-IN-female"
}

Supported Languages

Value | Language
--- | ---
en-IN | English
hi-IN | Hindi

Supported Voices

Value | Voice
--- | ---
en-IN-female | English Female
en-IN-male | English Male
hi-IN-female | Hindi Female
hi-IN-male | Hindi Male

Successful Response

Status: 200 OK

The response body contains MP3 audio data.

Response headers include:

Content-Type: audio/mpeg
Content-Length: <audio size>

Validation Errors

Empty or missing text

Status: 400 Bad Request

{
  "message": "Text is required"
}

Text longer than 5000 characters

Status: 400 Bad Request

{
  "message": "Text cannot exceed 5000 characters"
}

Invalid language

Status: 400 Bad Request

{
  "message": "Invalid language"
}

Invalid voice

Status: 400 Bad Request

{
  "message": "Invalid voice"
}

Voice does not match language

Status: 400 Bad Request

{
  "message": "Selected voice does not match the selected language"
}

Rate Limiting

Speech generation is rate-limited to:

20 requests per 15 minutes

When the limit is exceeded, the API returns:

Status: 429 Too Many Requests

{
  "message": "Too many speech generation requests. Please try again later."
}

Server/TTS Failure

If speech generation fails because of a server or external TTS problem:

Status: 500 Internal Server Error

{
  "message": "Failed to generate speech"
}

3. Get Voices

Endpoint

GET /api/voices

Purpose

Retrieves available voices from the ElevenLabs API through the backend.

Request

No request body is required.

Example

GET https://text-to-speech-4yuo.onrender.com/api/voices

Successful Response

Status: 200 OK

The response contains the voice data returned by ElevenLabs.

Failure Response

Status: 500 Internal Server Error

{
  "message": "Failed to fetch voices"
}

4. Root Endpoint

Endpoint

GET /

Purpose

Basic backend/server availability check.

Successful Response

Status: 200 OK

yes, working...

API Testing with Postman

The following endpoints should be included in the Postman collection:

GET https://text-to-speech-4yuo.onrender.com/
GET https://text-to-speech-4yuo.onrender.com/api/health
POST https://text-to-speech-4yuo.onrender.com/api/tts
GET https://text-to-speech-4yuo.onrender.com/api/voices

For /api/tts, use:

{
  "text": "Hello, welcome to my Text-to-Speech application.",
  "language": "en-IN",
  "voice": "en-IN-female"
}

Set the request header:

Content-Type: application/json

The /api/tts response is binary MP3 audio rather than JSON.

API Architecture

React Frontend
      |
      | POST /api/tts
      v
Express Backend
      |
      | Validate request
      v
ElevenLabs API
      |
      | Generated audio
      v
Express Backend
      |
      | audio/mpeg
      v
React Frontend

Security Notes

The ElevenLabs API key is stored in the backend environment variables.

The API key is not sent to the React frontend.

Backend validation is performed before sending requests to ElevenLabs.

CORS is configured using the frontend origin.

/api/tts uses rate limiting to reduce excessive speech-generation requests.