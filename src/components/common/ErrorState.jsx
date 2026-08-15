import React from "react";
import Button from "./Button";

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load this content.",
  onRetry,
}) => {
  return (
    <div className="ff-error-state">
      <div className="ff-error-icon">!</div>

      <h3>{title}</h3>

      <p>{message}</p>

      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;