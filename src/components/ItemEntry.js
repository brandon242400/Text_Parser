import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  FilledInput,
  Button,
  withStyles
} from "@material-ui/core";

export default function ItemEntry(props) {
  const [userInput, updateInput] = useState("");

  const handleClick = () => {
    if (userInput !== "") props.addItem(userInput);
    updateInput("");
  };

  return (
    <div className="item-entry-container">
      <StyledForm variant="filled">
        <StyledLabel htmlFor="component-filled-entry">Name</StyledLabel>
        <StyledInput
          id="component-filled-entry"
          value={userInput}
          onChange={e => updateInput(e.target.value)}
          onKeyDown={e => (e.keyCode === 13 ? handleClick() : null)}
        />
      </StyledForm>
      <StyledButton variant="outlined" onClick={() => handleClick()}>
        Enter
      </StyledButton>
      <br />
    </div>
  );
}

const StyledForm = withStyles({
  root: {
    width: "25%",
    minWidth: "200px",
    marginLeft: "25%"
  }
})(FormControl);

const StyledLabel = withStyles({
  root: {
    color: "#777"
  },
  focused: {
    color: "#777 !important"
  }
})(InputLabel);

const StyledInput = withStyles({
  root: {
    color: "#888",
    backgroundColor: "#252525",
    "&:hover": {
      backgroundColor: "#282828"
    }
  },
  focused: {
    backgroundColor: "#252525 !important"
  },
  underline: {
    "&:after": {
      borderBottomColor: "rgb(255, 165, 0, 1) !important"
    },
    "&:before": {
      borderBottomColor: "rgb(125,125,125,0.6)"
    },
    "&:hover:before": {
      borderBottomColor: "rgba(145,145,145,1)"
    }
  }
})(FilledInput);

const StyledButton = withStyles({
  root: {
    color: "rgb(255, 165, 0, .8) !important",
    margin: "auto auto auto 5%",
    height: "fit-content",
    borderColor: "rgb(255, 165, 0, 0.3) !important",
    "&:hover": {
      borderColor: "rgb(255, 165, 0, .6) !important"
    }
  }
})(Button);
