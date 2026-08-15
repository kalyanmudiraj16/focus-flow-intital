import React from "react";

const Card = ({
  children,
  title,
  subtitle,
  actions,
  className = "",
}) => {
  return (
    <section className={`ff-card ${className}`}>
      {(title || subtitle || actions) && (
        <div className="ff-card-header">
          <div>
            {title && <h3 className="ff-card-title">{title}</h3>}
            {subtitle && (
              <p className="ff-card-subtitle">{subtitle}</p>
            )}
          </div>

          {actions && <div className="ff-card-actions">{actions}</div>}
        </div>
      )}

      <div className="ff-card-body">{children}</div>
    </section>
  );
};

export default Card;