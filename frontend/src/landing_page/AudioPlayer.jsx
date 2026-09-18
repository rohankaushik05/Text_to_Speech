function AudioPlayer({ audioUrl }) {
  const handleDownload = () => {
    if (!audioUrl) return;

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "generated-speech.mp3";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="audio-card card border-0 shadow-sm">
      <div className="card-body p-4 p-md-5">
        <div className="section-heading mb-4">
          <div className="section-icon">
            <i className="fa-solid fa-headphones"></i>
          </div>

          <div>
            <h2 className="h4 fw-bold mb-1">Generated Audio</h2>
            <p className="text-muted mb-0">
              Your generated speech will appear here.
            </p>
          </div>
        </div>

        <div className="audio-placeholder text-center">
          {audioUrl ? (
            <div className="mb-3">
              <audio controls key={audioUrl} className="w-100 mb-3">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            <>
              <div className="audio-placeholder-icon mb-3">
                <i className="fa-solid fa-wave-square"></i>
              </div>

              <h3 className="h5 fw-semibold">No audio generated yet</h3>

              <p className="text-muted mb-4">
                Enter your text and click "Generate Speech" to create audio.
              </p>
            </>
          )}

          <div className="mt-4">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!audioUrl}
              className={`btn btn-outline-primary px-4 ${!audioUrl ? "disabled" : ""}`}
            >
              <i className="fa-solid fa-download me-2"></i>
              Download Audio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AudioPlayer;