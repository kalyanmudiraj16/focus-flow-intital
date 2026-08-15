import React from "react";
import Button from "./Button";

const EmptyState = ({
  title = "Nothing here yet",
  description = "",
  action,
  actionLabel = "Get Started",
}) => {
  return (
    <div className="ff-empty-state">
      <div className="ff-empty-icon">○</div>

      <h3>{title}</h3>

      {description && <p>{description}</p>}

      {action && (
        <Button onClick={action}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;