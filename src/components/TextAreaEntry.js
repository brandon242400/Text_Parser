import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  withStyles,
  Button
} from "@material-ui/core";

export default function TextAreaEntry(props) {
  const [userInput, updateInput] = React.useState("");
  const [labelWidth, updateLabelWidth] = React.useState(0);
  const labelRef = React.useRef(null);
  const LIST = JSON.parse(JSON.stringify(props.list));
  const NAME_LIST = props.nameList;
  const COUNT_MULTIPLE_MATCHES = props.countMultiples;

  const handleEnter = () => {
    let matchList = getListOfMatches(
      LIST,
      NAME_LIST,
      userInput,
      COUNT_MULTIPLE_MATCHES
    );
    updateInput("");

    if (matchList) {
      getUpdatedList(props.list, matchList);
      props.setItemList(props.list);
    } else {
      alert("No keywords found in the text");
    }
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleEnter();
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
      <div style={{}}>
        <StyledButton variant="outlined">Enter</StyledButton>
        <StyledButton
          variant="outlined"
          onClick={() =>
            props.setCountMultipleMatches(!props.countingMultiples)
          }
        >
          {props.countingMultiples
            ? "Don't count multiples"
            : "Count multiples"}
        </StyledButton>
      </div>
    </div>
  );
}

//
// Returns false if no matches or a list of every match
function getListOfMatches(list, nameList, text, multipleMatches) {
  text = splitText(text);
  list = listToLowerCase(list);
  let alreadyIncremented = [];
  let itemsToIncrement = [];

  for (let word of text) {
    if (nameList.includes(word))
      for (let item of list) {
        if (
          item.alternateNames.includes(word) &&
          !alreadyIncremented.includes(item.name)
        ) {
          itemsToIncrement.push(item.name);
          alreadyIncremented.push(item.name);
          break;
        } else if (
          word === item.name &&
          !alreadyIncremented.includes(item.name)
        ) {
          itemsToIncrement.push(item.name);
          alreadyIncremented.push(item.name);
          break;
        }
      }
    if (multipleMatches) alreadyIncremented = [];
  }

  return itemsToIncrement.length > 0 ? itemsToIncrement : false;
}

const getUpdatedList = (list, itemsToIncrement) => {
  for (let itemName of itemsToIncrement)
    for (let x = 0; x < list.length; x++) {
      if (list[x].name.toLowerCase() === itemName) {
        list[x].count++;
        break;
      }
    }
};

// Splits text up into array and makes all words lowercase
const splitText = text => {
  let punctuationToRemove = [/(\.\.\.)/g, /,/g, /\. /g, /!/g, /\?/g, /'s/g];
  let splitText = text.toLowerCase();
  for (let x = 0; x < punctuationToRemove.length; x++) {
    splitText = splitText.replace(punctuationToRemove[x], " ");
  }
  splitText = splitText.split(" ");
  return splitText;
};

// Makes all the names in the list lower case to make comparison easier
const listToLowerCase = list => {
  list = list.map(item => {
    let alternates = item.alternateNames.map(name => name.toLowerCase());
    return {
      name: item.name.toLowerCase(),
      count: item.count,
      alternateNames: alternates
    };
  });
  return list;
};

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
    fontSize: "60%",
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
    margin: "auto",
    height: "fit-content",
    borderColor: "rgb(255, 165, 0, 0.3) !important",
    "&:hover": {
      borderColor: "rgb(255, 165, 0, .6) !important"
    }
  }
})(Button);
