import React from "react";
import Item from "./Item";
import { Grid } from "@material-ui/core";

export default function ItemDisplay(props) {
  // Copying list to change later
  let updatedList = JSON.parse(JSON.stringify(props.item_list));
  // Creating list of items
  let items = props.item_list.map(item => {
    return (
      <Item
        item={item}
        key={item.name}
        deleteItem={props.deleteItem}
        incrementItemCount={props.incrementItemCount}
        decrementItemCount={props.decrementItemCount}
        addAlternateItemName={props.addAlternateItemName}
        removeAlternateItemName={props.removeAlternateItemName}
      />
    );
  });
  // Removing every items transitionClassName after 0.8 seconds to avoid
  if (containsNewItem(updatedList)) {
    if (
      parseInt(sessionStorage.getItem("item_display_count"), 10) ===
      parseInt(sessionStorage.getItem("animation_count"), 10)
    ) {
      sessionStorage.setItem(
        "item_display_count",
        parseInt(sessionStorage.getItem("item_display_count"), 10) + 1
      );
      updatedList = removeItemTransitions(updatedList);
      setTimeout(() => props.setItemList(updatedList), 800);
    }
  }

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="stretch"
      spacing={0}
      style={{
        width: "50vw",
        margin: "7vh auto 5vh 5vw"
      }}
    >
      {items}
    </Grid>
  );
}

// Removes item's transition names to avoid awkward animations on page refresh
const removeItemTransitions = list => {
  list = JSON.parse(JSON.stringify(list));
  return list.map(item => ({
    name: item.name,
    count: item.count,
    alternateNames: item.alternateNames,
    transitionClassName: ""
  }));
};

// Returns true if an item in the list needs to complete it's new item transition
const containsNewItem = list => {
  let result = false;
  for (let item of list) {
    if (item.transitionClassName === "newly-added-item-transition") {
      result = true;
      break;
    }
  }
  return result;
};
