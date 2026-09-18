function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div
      className="alert alert-danger d-flex align-items-center shadow-sm"
      role="alert"
    >
      <i className="fa-solid fa-circle-exclamation me-3"></i>

      <div>
        {message}
      </div>
    </div>
  );
}

export default ErrorMessage;