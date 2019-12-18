import React from "react";
import { Grid, Button } from "@material-ui/core";
import styled from "styled-components";
import AlternateNames from "./AlternateNames";

export default function Item(props) {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      style={{
        border: "2px solid #777",
        padding: "0 5%",
        margin: "1vh 0",
        borderRadius: "10px",
        backgroundColor: "#292929"
      }}
    >
      <Button
        onClick={() => props.decrementItemCount(props.item.name)}
        className="button-hover"
        variant="outlined"
        color="primary"
        style={{
          color: "#777",
          fontSize: "100%"
        }}
      >
        -
      </Button>
      <h2
        style={{
          color: "#777"
        }}
      >
        {props.item.count}
      </h2>
      <Button
        onClick={() => props.incrementItemCount(props.item.name)}
        className="button-hover"
        variant="outlined"
        color="primary"
        style={{
          color: "#777",
          fontSize: "100%"
        }}
      >
        +
      </Button>
      <h4
        style={{
          width: "20%",
          border: "2px solid #666",
          borderRadius: "10px",
          padding: "1%",
          color: "#aaa"
        }}
      >
        {props.item.name}
      </h4>
      <AlternateNames
        item={props.item}
        addAlternateItemName={props.addAlternateItemName}
        removeAlternateItemName={props.removeAlternateItemName}
        inputID={props.item.name}
      />
      <ButtonAnimation>
        <Button
          onClick={() => props.deleteItem(props.item.name)}
          variant="outlined"
          color="primary"
        >
          Delete
        </Button>
      </ButtonAnimation>
    </Grid>
  );
}

const ButtonAnimation = styled.div`
  button {
    color: #66b;
    bordercolor: #44b;
  }

  button:hover {
    border-color: #66b;
  }
`;
