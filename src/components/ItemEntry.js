import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

export default function ItemEntry(props) {
  const [userInput, updateInput] = useState("");

  const handleClick = () => {
    if (userInput !== "") props.addItem(userInput);
    updateInput("");
  };

  return (
    <div className="item-entry-container">
      <TextField
        label="Enter Keyword Here"
        variant="filled"
        value={userInput}
        onChange={e => updateInput(e.target.value)}
        onKeyDown={e => (e.keyCode === 13 ? handleClick() : null)}
        style={{
          width: "25%",
          minWidth: "200px",
          marginLeft: "30%",
          fontFamily:
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
        }}
        InputLabelProps={{
          style: {
            color: "#66b"
          }
        }}
        InputProps={{
          style: {
            color: "#888",
            backgroundColor: "#252525"
          }
        }}
      />
      <Button
        variant="outlined"
        color="primary"
        id="entry-button"
        onClick={() => handleClick()}
      >
        Enter
      </Button>
    </div>
  );
}
