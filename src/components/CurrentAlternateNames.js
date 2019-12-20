import React from "react";
import styled from "styled-components";

export default function CurrentAlternateNames(props) {
  let names = props.nameList.map(name => {
    return (
      <div
        key={name}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignContent: "center",
          padding: "0",
          height: "fit-content"
        }}
      >
        <button
          onClick={() => props.removeAlternateItemName(props.itemName, name)}
          className="alternate-name-remove-button"
          style={{
            border: "1px solid #292929",
            backgroundColor: "#292929",
            color: "red",
            fontFamily: "'Roboto Slab', serif",
            fontSize: "125%",
            height: "fit-content"
          }}
        >
          -
        </button>
        <P>{name + " "}</P>
      </div>
    );
  });

  return (
    <div className="current-alternate-names-container">
      {names.length > 0 ? (
        names
      ) : (
        <P style={{ padding: "5px" }}>No alternate names to display</P>
      )}
    </div>
  );
}

const P = styled.p`
  font-family: "Roboto Slab", serif;
  font-size: 85%;
  color: #999;
  padding: 0;
  margin: auto auto auto 0;
`;
