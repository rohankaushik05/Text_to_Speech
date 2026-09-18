import { useState } from "react";

function ActionButtons({
  text,
  language,
  voice,
  setAudioUrl,
  setText,
  setError,
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleClear = () => {
    if (setText) setText("");
    if (setAudioUrl) {
      setAudioUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return null;
      });
    }
  };

  const handleGenerateSpeech = async () => {
    // Frontend validation
    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    if (text.length > 5000) {
      setError("Text cannot exceed 5000 characters.");
      return;
    }

    const allowedLanguages = ["en-IN", "hi-IN"];

    if (!allowedLanguages.includes(language)) {
      setError("Invalid language selected.");
      return;
    }

    const allowedVoices = [
      "en-IN-female",
      "en-IN-male",
      "hi-IN-female",
      "hi-IN-male",
    ];

    if (!allowedVoices.includes(voice)) {
      setError("Invalid voice selected.");
      return;
    }

    const validVoiceForLanguage =
      (language === "en-IN" && voice.startsWith("en-IN")) ||
      (language === "hi-IN" && voice.startsWith("hi-IN"));

    if (!validVoiceForLanguage) {
      setError("Selected voice does not match the selected language.");
      return;
    }

    setError("");

    try {
      setIsGenerating(true);

      const response = await fetch(`${API_URL}/api/tts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          language: language,
          voice: voice,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Failed to generate speech.";

        try {
          const errorData = await response.json();

          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // Response was not JSON
        }

        if (response.status === 401 || response.status === 403) {
          errorMessage = "Authentication failed. Please try again later.";
        } else if (response.status === 429) {
          errorMessage = "Too many requests. Please try again later.";
        } else if (response.status === 503) {
          errorMessage = "Speech service is temporarily unavailable.";
        } else if (response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }

        setError(errorMessage);
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      setAudioUrl(audioUrl);
    } catch (error) {
      console.error("Error:", error);

      setError(
        "Unable to connect to the server. Please check your connection and try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="action-section">
      <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
        <button
          type="button"
          className="btn btn-outline-secondary btn-lg px-4"
          onClick={handleClear}
          disabled={isGenerating}
        >
          <i className="fa-solid fa-eraser me-2"></i>
          Clear
        </button>

        <button
          type="button"
          className="btn generate-btn btn-lg px-5"
          onClick={handleGenerateSpeech}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <i className="fa-solid fa-spinner fa-spin me-2"></i>
              Generating...
            </>
          ) : (
            <>
              <i className="fa-solid fa-volume-high me-2"></i>
              Generate Speech
            </>
          )}
        </button>
      </div>
    </section>
  );
}

export default ActionButtons;