import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AlternateDisplay from "./CurrentAlternateNames";
import {
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  ClickAwayListener,
  withStyles
} from "@material-ui/core";

function AlternateNames(props) {
  const [userInput, updateInput] = useState("");
  const [buttonStatus, pressButton] = useState(false);
  const [labelWidth, updateLabelWidth] = useState(0);
  const labelRef = React.useRef(null);

  const handleEnter = e => {
    e.preventDefault();
    props.addAlternateItemName(props.item.name, userInput);
    updateInput("");
  };

  const handleClick = () => {
    pressButton(!buttonStatus);
  };

  useEffect(() => {
    updateLabelWidth(labelRef.current.offsetWidth);
  }, []);

  return (
    <ClickAwayListener onClickAway={() => pressButton(false)}>
      <AlternateNameContainer>
        <form noValidate>
          <FormControl
            variant="outlined"
            style={{ width: "100%", paddingTop: "3px" }}
          >
            <InputLabel
              htmlFor={props.inputID}
              ref={labelRef}
              style={{
                color: "#777"
              }}
            >
              Enter Alternate Name
            </InputLabel>
            <InputField
              id={props.inputID}
              labelWidth={labelWidth}
              value={userInput}
              onChange={e => updateInput(e.target.value)}
              onKeyDown={e => (e.keyCode === 13 ? handleEnter(e) : null)}
            />
            <Button
              size="small"
              color="default"
              onClick={() => handleClick()}
              style={{
                width: "fit-content",
                marginLeft: "0"
              }}
            >
              <FormHelperText
                style={{
                  color: "#777",
                  fontSize: "80%",
                  marginLeft: "0"
                }}
              >
                {buttonStatus
                  ? "Hide alternate names"
                  : "Show current alternate names"}
              </FormHelperText>
            </Button>
          </FormControl>
        </form>
        {userInput !== "" ? (
          <Button
            onClick={e => handleEnter(e)}
            variant="outlined"
            color="primary"
            style={{ margin: "5% auto 0 auto", width: "fit-content" }}
          >
            Add Name
          </Button>
        ) : null}

        {buttonStatus ? (
          <AlternateDisplay
            itemName={props.item.name}
            nameList={props.item.alternateNames}
            removeAlternateItemName={props.removeAlternateItemName}
          />
        ) : null}
      </AlternateNameContainer>
    </ClickAwayListener>
  );
}

const AlternateNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  // border: 1px solid #999;
  height: fit-content;
  width: 30%;
  margin: 1% 0;
`;

const InputField = withStyles({
  root: {
    height: "fit-content",
    color: "#888",
    padding: "0px",
    // Handles the hover effect of the input's border
    "&:hover:not($focused) $notchedOutline": {
      borderColor: "rgba(145,145,145,1)"
    }
  },
  notchedOutline: {
    border: "1px solid rgb(125,125,125,0.6)"
  },
  focused: {
    "& $notchedOutline": {
      borderColor: "#559 !important"
    }
  }
})(OutlinedInput);

export default AlternateNames;
