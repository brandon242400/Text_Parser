import React from "react";
import Item from "./Item";
import { Grid } from "@material-ui/core";

export default function ItemDisplay(props) {
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
