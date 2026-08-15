import React from "react";
import Button from "./Button";

const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="ff-modal-overlay">
      <div className="ff-modal">
        <h3>{title}</h3>

        <p>{message}</p>

        <div className="ff-modal-actions">
          <Button variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>

          <Button variant="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;