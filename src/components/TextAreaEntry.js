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
  const [matchedItems, updateMatchedItems] = React.useState(null);
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
      updateMatchedItems(matchList);
      let updatedList = getUpdatedList(props.list, matchList);
      props.setItemList(updatedList);
      getMatchedItemJSX(matchList);
    } else {
      updateMatchedItems("Nothing matched any of your keywords");
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
          Paste text to be parsed here
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
      <div>
        <div
          style={{
            width: "100%",
            marginTop: "5%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <StyledButton
            variant="outlined"
            onClick={() => handleEnter()}
            style={{
              marginRight: "15%"
            }}
          >
            Enter
          </StyledButton>
          <StyledButton variant="outlined" onClick={() => updateInput("")}>
            Clear
          </StyledButton>
        </div>
        <div style={{ width: "100%" }}>
          <StyledButton
            variant="outlined"
            onClick={() =>
              props.setCountMultipleMatches(!props.countingMultiples)
            }
            style={{ marginTop: "5%" }}
          >
            {props.countingMultiples
              ? "Don't count multiples"
              : "Count multiples"}
          </StyledButton>
        </div>
      </div>
      {matchedItems ? (
        <div className="textarea-entry-display">
          <h4>Matched Items</h4>
          {getMatchedItemJSX(matchedItems)}
        </div>
      ) : null}
    </div>
  );
}

//
// Returns a list of items to put into the components return statement
const getMatchedItemJSX = matchedList => {
  if (typeof matchedList === "string") return <p>{matchedList}</p>;
  let list = [];
  for (let name of matchedList) {
    let nameInList = false;
    for (let item of list) {
      if (item.name === name) {
        list.splice(list.indexOf(item), 1, {
          name: item.name,
          count: item.count + 1
        });
        nameInList = true;
      }
    }
    if (!nameInList) {
      list.push({
        name: name,
        count: 1
      });
    }
  }
  // Putting the items from list in order
  list.sort((a, b) => {
    return b.count - a.count;
  });
  return list.map(item => {
    return (
      <p key={item.name}>
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}: {item.count}
      </p>
    );
  });
};

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

//
// Takes the list given from props and changes the values of count to reflect the updates made
const getUpdatedList = (oldList, itemsToIncrement) => {
  let list = JSON.parse(JSON.stringify(oldList));
  for (let itemName of itemsToIncrement)
    for (let x = 0; x < list.length; x++) {
      if (list[x].name.toLowerCase() === itemName) {
        list[x].count++;
        break;
      }
    }
  return JSON.parse(JSON.stringify(list));
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

// Makes all the names in the list lower case to help with comparisons
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
    height: "fit-content",
    borderColor: "rgb(255, 165, 0, 0.3) !important",
    "&:hover": {
      borderColor: "rgb(255, 165, 0, .6) !important"
    }
  }
})(Button);
