import React from "react";

const Loader = ({ size = "medium", text = "" }) => {
  return (
    <div className={`ff-loader-wrapper ff-loader-${size}`}>
      <span className="ff-loader" />

      {text && <span className="ff-loader-text">{text}</span>}
    </div>
  );
};

export default Loader;