import React from "react";

const Input = (props) => {
  return (
    <input
      style={{
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid gray",
        borderRadius: "5px",
      }}
      onChange={(event) => props.setValue(event.target.value)}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
