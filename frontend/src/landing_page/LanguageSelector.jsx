function LanguageSelector({ language, setLanguage }) {
  return (
    <section className="selector-card card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        <div className="section-heading mb-4">
          <div className="section-icon">
            <i className="fa-solid fa-language"></i>
          </div>

          <div>
            <h2 className="h5 fw-bold mb-1">Language</h2>

            <p className="text-muted small mb-0">
              Choose the language of your text.
            </p>
          </div>
        </div>

        <label htmlFor="language" className="form-label fw-semibold">
          Select Language
        </label>

        <select
          id="language"
          className="form-select"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option value="en-IN">English</option>
          <option value="hi-IN">Hindi</option>
        </select>
      </div>
    </section>
  );
}

export default LanguageSelector;
