import React from "react";
import styled from "styled-components";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  withStyles
} from "@material-ui/core";

export default function TextAreaEntry(props) {
  const [userInput, updateInput] = React.useState("");
  const [labelWidth, updateLabelWidth] = React.useState(0);
  const labelRef = React.useRef(null);

  const handleEnter = () => {
    updateInput("");
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleEnter();
      updateInput("");
    }
  };

  React.useEffect(() => {
    updateLabelWidth(labelRef.current.offsetWidth);
  }, []);

  return (
    <div className="textarea-entry-container">
      <StyledForm variant="outlined">
        <InputLabel
          ref={labelRef}
          htmlFor="text-area-entry-input"
          style={{
            color: "#777"
          }}
        >
          Paste text to be parsed
        </InputLabel>
        <InputField
          multiline={true}
          value={userInput}
          id="text-area-entry-input"
          onChange={e => updateInput(e.target.value)}
          onKeyDown={handleKeyPress}
          labelWidth={labelWidth}
          rows="8"
          rowsMax="60"
        />
      </StyledForm>
    </div>
  );
}

const StyledForm = withStyles({
  root: {
    borderRadius: "5px",
    width: "80%",
    height: "fit-content",
    backgroundColor: "#333"
  }
})(FormControl);

const InputField = withStyles({
  root: {
    height: "fit-content",
    color: "#888",
    // fontFamily: "'Roboto Slab', serif",
    fontSize: "60%",
    // Handles the hover effect of the input's border
    "&:hover:not($focused) $notchedOutline": {
      borderColor: "rgba(125,125,125,1)"
    }
  },
  notchedOutline: {
    border: "1px solid rgb(0, 0, 0, 0.4)"
  },
  focused: {
    "& $notchedOutline": {
      borderColor: "#559 !important"
    }
  }
})(OutlinedInput);
