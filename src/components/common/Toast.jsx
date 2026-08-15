import React from "react";

const Toast = ({
  message,
  type = "success",
  onClose,
}) => {
  if (!message) return null;

  return (
    <div className={`ff-toast ff-toast-${type}`}>
      <span>{message}</span>

      {onClose && (
        <button type="button" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
};

export default Toast;