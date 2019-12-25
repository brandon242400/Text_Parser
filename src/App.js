import React from "react";
import { Button, withStyles } from "@material-ui/core";
import ItemEntry from "./components/ItemEntry";
import ItemDisplay from "./components/ItemDisplay";
import TextAreaEntry from "./components/TextAreaEntry";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item_list: [],
      item_name_list: [],
      count_multiple_matches: false
    };
    this.updateItemNameList = this.updateItemNameList.bind(this);
    this.clearAllData = this.clearAllData.bind(this);
  }

  componentDidMount() {
    if (loadList()) {
      let loadedList = loadList();
      // let loadedList = this.LONG_TEST_LIST();
      let countMultiples = localStorage.getItem(
        ITEM_LIST_SAVE_FILE + "_multiple"
      )
        ? JSON.parse(localStorage.getItem(ITEM_LIST_SAVE_FILE + "_multiple"))
        : false;
      this.setState({
        item_list: loadedList,
        count_multiple_matches: countMultiples
      });
      this.updateItemNameList(loadedList);
    } else console.log("No saved data found.");
  }

  LONG_TEST_LIST = () => {
    let list = [];
    for (let x = 0; x < 400; x++) {
      list.push({
        name: `name: ${x}`,
        count: 0,
        alternateNames: [],
        transitionClassName: ""
      });
    }
    return list;
  };

  //
  // Adds item to item_list
  addItem(itemName) {
    if (this.state.item_name_list.includes(itemName.toLowerCase())) {
      alert(
        "You already have this item added to your list.\n" +
          "It may be an alternate name for another item."
      );
      return false;
    } else if (itemName.split(" ").length > 1) {
      alert("A keyword can be no longer than a single word.");
      return false;
    } else {
      let updatedList = cloneList(this.state.item_list);
      updatedList.splice(0, 0, {
        name: itemName,
        count: 0,
        alternateNames: [],
        transitionClassName: "newly-added-item-transition"
      });
      updatedList = initializeListTransitions(
        this.sortList(updatedList),
        itemName
      );
      this.setState(() => ({ item_list: updatedList }));
      this.updateItemNameList(updatedList);
      saveList(updatedList);
      // Removes transitionClassNames after 600ms
      setTimeout(() => {
        let tempList = cloneList(this.state.item_list);
        let listWithoutTransitions = removeListTransitions(tempList);
        this.setState(() => ({ item_list: listWithoutTransitions }));
      }, 500);
      return true;
    }
  }

  //
  // Deletes item from list
  deleteItem(itemName) {
    let modifiedList = cloneList(this.state.item_list);
    for (let x = 0; x < modifiedList.length; x++) {
      if (modifiedList[x].name === itemName) {
        modifiedList.splice(x, 1);
        break;
      }
    }
    this.setState({ item_list: modifiedList });
    this.updateItemNameList(modifiedList);
    saveList(modifiedList);
  }

  //
  // Updates item_name_list to avoid duplicate items being added
  // Default argument is the current state's item_list
  updateItemNameList(list = cloneList(this.state.item_list)) {
    let listOfNames = [];
    for (let x = 0; x < list.length; x++) {
      listOfNames.push(list[x].name.toLowerCase());
      for (let i = 0; i < list[x].alternateNames.length; i++) {
        listOfNames.push(list[x].alternateNames[i].toLowerCase());
      }
    }
    this.setState(() => ({ item_name_list: listOfNames }));
  }

  //
  // Sorts the list according to each item's count
  sortList(list) {
    return list.sort((a, b) => {
      return b.count - a.count;
    });
  }

  //
  // Increments the item's count by 1
  incrementItemCount(itemName) {
    let list = cloneList(this.state.item_list);
    for (let x = 0; x < list.length; x++) {
      if (list[x].name === itemName) {
        list[x].count++;
        break;
      }
    }
    list = this.sortList(list);
    saveList(list);
    this.setState({ item_list: list });
  }

  //
  // Decrements the item's count by 1
  decrementItemCount(itemName) {
    let list = cloneList(this.state.item_list);
    for (let x = 0; x < list.length; x++) {
      if (list[x].name === itemName) {
        list[x].count--;
        break;
      }
    }
    list = this.sortList(list);
    saveList(list);
    this.setState({ item_list: list });
  }

  //
  // Adds an alternate name to an item
  addAlternateItemName(itemName, alternateName) {
    if (this.state.item_name_list.includes(alternateName.toLowerCase())) {
      alert(
        "You already have this item added to your list.\n" +
          "It may be an alternate name for another item."
      );
    } else if (alternateName.split(" ").length > 1) {
      alert("A keyword can be no longer than a single word.");
    } else {
      let list = cloneList(this.state.item_list);
      for (let x = 0; x < list.length; x++) {
        if (list[x].name === itemName) {
          list[x].alternateNames.splice(0, 0, alternateName);
          break;
        }
      }
      saveList(list);
      this.updateItemNameList(list);
      this.setState(() => ({ item_list: list }));
    }
  }

  //
  // Removes an alternate name from an item
  removeAlternateItemName(itemName, alternateName) {
    let list = cloneList(this.state.item_list);
    for (let x = 0; x < list.length; x++) {
      if (
        list[x].name === itemName &&
        list[x].alternateNames.includes(alternateName)
      ) {
        list[x].alternateNames.splice(
          list[x].alternateNames.indexOf(alternateName),
          1
        );
        break;
      }
    }
    saveList(list);
    this.updateItemNameList(list);
    this.setState({ item_list: list });
  }

  //
  // Sets item_list to the list passed to the function
  setItemList(newList) {
    newList = this.sortList(newList);
    saveList(newList);
    this.updateItemNameList(newList);
    this.setState({ item_list: newList });
  }

  //
  // Sets whether or not the app will count multiple matches as one or not
  setCountMultipleMatches(countMultiples) {
    this.setState({ count_multiple_matches: countMultiples });
    localStorage.setItem(ITEM_LIST_SAVE_FILE + "_multiple", countMultiples);
  }

  //
  // Clears all the saved data from localStorage
  clearAllData() {
    let confirmation = window.confirm(
      `Are you sure you want to reset all your entered data?`
    );
    if (confirmation) {
      this.setState(() => ({
        item_list: [],
        item_name_list: [],
        count_multiple_matches: false
      }));
      localStorage.clear();
      sessionStorage.clear();
    }
  }

  //
  //
  render() {
    return (
      <div className="App">
        <div className="clear-all-data-button">
          <StyledButton variant="outlined" onClick={() => this.clearAllData()}>
            Clear all
          </StyledButton>
        </div>
        {/* Container for the entry and item display. Basically the entire left side of the aplication */}
        <div className="display-and-entry-container">
          <ItemEntry addItem={this.addItem.bind(this)} />
          <ItemDisplay
            item_list={this.state.item_list}
            setItemList={this.setItemList.bind(this)}
            deleteItem={this.deleteItem.bind(this)}
            incrementItemCount={this.incrementItemCount.bind(this)}
            decrementItemCount={this.decrementItemCount.bind(this)}
            addAlternateItemName={this.addAlternateItemName.bind(this)}
            removeAlternateItemName={this.removeAlternateItemName.bind(this)}
          />
        </div>
        {/* The right side of the application with the exception of the 'Clear All' button */}
        <TextAreaEntry
          list={cloneList(this.state.item_list)}
          nameList={cloneList(this.state.item_name_list)}
          setItemList={this.setItemList.bind(this)}
          countMultiples={this.state.count_multiple_matches}
          setCountMultipleMatches={this.setCountMultipleMatches.bind(this)}
          countingMultiples={this.state.count_multiple_matches}
        />
      </div>
    );
  }
}

//
//
//
//
export default App;

// Save file name used for localStorage
const ITEM_LIST_SAVE_FILE = "text_parser_app_storage_54616252";

const saveList = list => {
  list = removeListTransitions(cloneList(list));
  localStorage.setItem(ITEM_LIST_SAVE_FILE, JSON.stringify(list));
};

const loadList = () => {
  return JSON.parse(localStorage.getItem(ITEM_LIST_SAVE_FILE));
};

const cloneList = list => {
  return JSON.parse(JSON.stringify(list));
};

const initializeListTransitions = (list, newItemName) => {
  let passedNewItem = false;
  return list.map(item => {
    if (item.name === newItemName) {
      passedNewItem = true;
      return item;
    } else if (passedNewItem) {
      return {
        name: item.name,
        count: item.count,
        alternateNames: item.alternateNames,
        transitionClassName: "old-item-shift-down-transition"
      };
    } else
      return {
        name: item.name,
        count: item.count,
        alternateNames: item.alternateNames,
        transitionClassName: ""
      };
  });
};

const removeListTransitions = itemList => {
  let result = itemList.map(list => ({
    name: list.name,
    count: list.count,
    alternateNames: list.alternateNames,
    transitionClassName: ""
  }));
  return result;
};

const StyledButton = withStyles({
  root: {
    margin: "2vh 1vw 0 auto",
    color: "rgb(255, 165, 0, .8) !important",
    height: "fit-content",
    borderColor: "rgb(255, 165, 0, 0.3) !important",
    "&:hover": {
      borderColor: "rgb(255, 165, 0, .6) !important"
    }
  }
})(Button);
