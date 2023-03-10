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
      onClick={onclick} >
      {text}
    </button>
  );
};

export default Button;
