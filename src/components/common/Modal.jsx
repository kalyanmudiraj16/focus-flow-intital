import React, { useEffect } from "react";

const Modal = ({
  open,
  title,
  children,
  onClose,
  size = "medium",
}) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ff-modal-overlay" onMouseDown={onClose}>
      <div
        className={`ff-modal ff-modal-${size}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="ff-modal-header">
          <h3>{title}</h3>

          <button
            type="button"
            className="ff-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="ff-modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;