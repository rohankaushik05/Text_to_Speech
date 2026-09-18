function VoiceSelector({ voice, setVoice }) {
  return (
    <section className="selector-card card border-0 shadow-sm h-100">
      <div className="card-body p-4">

        <div className="section-heading mb-4">
          <div className="section-icon">
            <i className="fa-solid fa-microphone"></i>
          </div>

          <div>
            <h2 className="h5 fw-bold mb-1">
              Voice
            </h2>

            <p className="text-muted small mb-0">
              Choose the voice for your speech.
            </p>
          </div>
        </div>

        <label htmlFor="voice" className="form-label fw-semibold">
          Select Voice
        </label>

        <select
          id="voice"
          className="form-select form-select-lg"
          value={voice}
          onChange={(event) => setVoice(event.target.value)}
        >
          <option value="" disabled>
            Select a voice
          </option>

          <option value="en-IN-female">
            English Female
          </option>

          <option value="en-IN-male">
            English Male
          </option>

          <option value="hi-IN-female">
            Hindi Female
          </option>

          <option value="hi-IN-male">
            Hindi Male
          </option>
        </select>

      </div>
    </section>
  );
}

export default VoiceSelector;