import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`ff-btn ff-btn-${variant} ff-btn-${size} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;