import React from "react";

const Badge = ({ children, variant = "default" }) => {
  return (
    <span className={`ff-badge ff-badge-${variant}`}>
      {children}
    </span>
  );
};

export default Badge;