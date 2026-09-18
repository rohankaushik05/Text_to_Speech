import "./App.css";
import { useState } from "react";

import Header from "./landing_page/Header";
import TextInput from "./landing_page/TextInput";
import LanguageSelector from "./landing_page/LanguageSelector";
import VoiceSelector from "./landing_page/VoiceSelector";
import ActionButtons from "./landing_page/ActionButtons";
import AudioPlayer from "./landing_page/AudioPlayer";
import ErrorMessage from "./landing_page/ErrorMessage";

function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-IN");
  const [voice, setVoice] = useState("en-IN-female");
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="app">
      <Header />

      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <TextInput text={text} setText={setText} />

            <div className="row g-4 my-1">
              <div className="col-12 col-md-6">
                <LanguageSelector
                  language={language}
                  setLanguage={setLanguage}
                />
              </div>

              <div className="col-12 col-md-6">
                <VoiceSelector voice={voice} setVoice={setVoice} />
              </div>
            </div>

            <div className="my-5">
              <ActionButtons
                text={text}
                language={language}
                voice={voice}
                setText={setText}
                setAudioUrl={setAudioUrl}
                setError={setError}
              />
            </div>

            <ErrorMessage message={error} />

            <div className="mt-4">
              <AudioPlayer audioUrl={audioUrl} />
            </div>
          </div>
        </div>
      </main>

      <footer className="tts-footer">
        <div className="container text-center">
          <p className="mb-0">
            <i className="fa-solid fa-microphone-lines me-2"></i>
            Text to Speech Converter
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
