function Header() {
  return (
    <header className="tts-header">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 text-center">

            <div className="header-icon mb-3">
              <i className="fa-solid fa-microphone-lines"></i>
            </div>

            <h1 className="display-4 fw-bold mb-3">
              Text to Speech
            </h1>

            <p className="lead mb-0">
              Transform your written words into natural-sounding speech
              with just a few clicks.
            </p>

          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;