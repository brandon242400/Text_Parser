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
  const [altDisplayName, changeAltName] = useState("");
  const [firstRender, setFirstRender] = useState(true);
  const labelRef = React.useRef(null);

  const handleEnter = e => {
    e.preventDefault();
    props.addAlternateItemName(props.item.name, userInput);
    updateInput("");
  };

  const handleClickAway = () => {
    changeAltName("current-alternate-names-fade-away");
    setTimeout(() => {
      pressButton(false);
    }, 200);
  };

  const handleClick = () => {
    if (buttonStatus) {
      handleClickAway();
    } else {
      changeAltName(false);
      pressButton(true);
    }
  };

  const handleChange = e => {
    updateInput(e.target.value);
    setFirstRender(false);
  };

  const getEnterButton = () => {
    if (userInput) {
      return (
        <div className="alt-names-enter-button-show">
          <StyledButton onClick={e => handleEnter(e)} variant="outlined">
            Add Name
          </StyledButton>
        </div>
      );
    } else if (!firstRender && !userInput) {
      return (
        <div className="alt-names-enter-button-remove">
          <StyledButton onClick={e => handleEnter(e)} variant="outlined">
            Add Name
          </StyledButton>
        </div>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    updateLabelWidth(labelRef.current.offsetWidth);
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
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
              onChange={handleChange}
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
                  : "Show current alternate names (" +
                    props.item.alternateNames.length +
                    ")"}
              </FormHelperText>
            </Button>
          </FormControl>
        </form>
        {getEnterButton()}
        {buttonStatus ? (
          <AlternateDisplay
            itemName={props.item.name}
            nameList={props.item.alternateNames}
            removeAlternateItemName={props.removeAlternateItemName}
            transitionName={altDisplayName}
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
      borderColor: "rgb(255, 165, 0, 1) !important"
    }
  }
})(OutlinedInput);

const StyledButton = withStyles({
  root: {
    color: "rgb(255, 165, 0, .8) !important",
    margin: "5% auto 0 auto",
    height: "fit-content",
    width: "fit-content",
    borderColor: "rgb(255, 165, 0, 0.3) !important",
    "&:hover": {
      borderColor: "rgb(255, 165, 0, .6) !important"
    }
  }
})(Button);

export default AlternateNames;
