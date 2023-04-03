import React from "react";

const Button = (
  {text = "",
  type = "info",
  onClick = () => {},
  style = {},
  className = "",}
) => {
  return (
    <button
      className={`btn btn-${type} ${className}`}
      style={style}
      onClick={onClick} >
      {text}
    </button>
  );
};

export default Button;
