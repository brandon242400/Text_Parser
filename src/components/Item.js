import React from "react";
import { Grid, Button, withStyles } from "@material-ui/core";
import AlternateNames from "./AlternateNames";

export default function Item(props) {
  let myRef = React.createRef();
  const printRef = () => {
    console.log(myRef.current.getBoundingClientRect());
  };
  return (
    <Grid
      container
      ref={myRef}
      direction="row"
      justify="space-between"
      alignItems="center"
      className={props.item.transitionClassName + " item-container"}
    >
      <StyledButton
        onClick={() => props.decrementItemCount(props.item.name)}
        // onClick={() => printRef()}
        // className="button-hover"
        variant="outlined"
      >
        -
      </StyledButton>
      <h2
        style={{
          color: "#888"
        }}
      >
        {props.item.count}
      </h2>
      <StyledButton
        onClick={() => props.incrementItemCount(props.item.name)}
        // className="button-hover"
        variant="outlined"
      >
        +
      </StyledButton>
      <div
        style={{
          width: "20%"
        }}
      >
        <h4
          style={{
            fontSize: "110%",
            width: "fit-content",
            borderBottom: "2px solid #666",
            padding: "5px",
            color: "#888",
            margin: "auto"
          }}
        >
          {props.item.name}
        </h4>
      </div>
      <AlternateNames
        item={props.item}
        addAlternateItemName={props.addAlternateItemName}
        removeAlternateItemName={props.removeAlternateItemName}
        inputID={props.item.name}
      />
      <DeleteButton
        onClick={() => props.deleteItem(props.item.name)}
        variant="outlined"
      >
        Delete
      </DeleteButton>
    </Grid>
  );
}

const StyledButton = withStyles({
  root: {
    color: "rgb(255, 165, 0, .8) !important",
    height: "fit-content",
    fontSize: "110%",
    borderColor: "rgb(255, 165, 0, 0.3) !important",
    "&:hover": {
      borderColor: "rgb(255, 165, 0, .6) !important"
    }
  }
})(Button);

const DeleteButton = withStyles({
  root: {
    color: "rgb(255, 165, 0, .8)",
    height: "fit-content",
    borderColor: "rgb(255, 165, 0, 0.3) !important",
    transition: "all .3s",
    "&:hover": {
      borderColor: "rgb(255, 165, 0, .6) !important",
      color: "red"
    }
  }
})(Button);
