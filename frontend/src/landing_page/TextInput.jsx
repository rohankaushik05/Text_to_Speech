// import { useState } from "react";

function TextInput({ text, setText }) {
  const maxCharacters = 5000;

  const characterCount = text.length;

  const wordCount =
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const handleTextChange = (event) => {
    const value = event.target.value;

    if (value.length <= maxCharacters) {
      setText(value);
    }
  };

  return (
    <section className="text-input-card card border-0 shadow-sm">
      <div className="card-body p-4 p-md-5">
        <div className="section-heading mb-4">
          <div className="section-icon">
            <i className="fa-solid fa-pen-to-square"></i>
          </div>

          <div>
            <h2 className="h4 fw-bold mb-1">Enter Your Text</h2>
            <p className="text-muted mb-0">
              Type or paste the text you want to convert into speech.
            </p>
          </div>
        </div>

        <div className="mb-3">
          <textarea
            className="form-control text-area"
            rows="10"
            value={text}
            onChange={handleTextChange}
            placeholder="Start typing your text here..."
            maxLength={maxCharacters}
          ></textarea>
        </div>

        <div className="input-information">
          <div className="d-flex flex-wrap gap-3">
            <span className="count-badge">
              <i className="fa-regular fa-file-lines me-2"></i>
              Characters: {characterCount}
            </span>

            <span className="count-badge">
              <i className="fa-solid fa-font me-2"></i>
              Words: {wordCount}
            </span>
          </div>

          <span className="character-limit">
            {characterCount} / {maxCharacters}
          </span>
        </div>
      </div>
    </section>
  );
}

export default TextInput;