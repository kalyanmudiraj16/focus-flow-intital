import React from "react";

const Input = ({
  label,
  error,
  id,
  className = "",
  ...props
}) => {
  return (
    <div className={`ff-field ${className}`}>
      {label && (
        <label htmlFor={id} className="ff-label">
          {label}
        </label>
      )}

      <input
        id={id}
        className={`ff-input ${error ? "ff-input-error" : ""}`}
        {...props}
      />

      {error && <p className="ff-error">{error}</p>}
    </div>
  );
};

export default Input;