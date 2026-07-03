import React, { useReducer } from "react";
import { Button } from "react-bootstrap";

const Home = () => {
  let divStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "spaceAround",
    alignItems: "center",
    gap: "20px",
  };

  let reducer = (state, counterAction) => {
    switch (counterAction.type) {
      case "increment":
        return { ...state, count: state.count + 1 };
      case "decrement":
        return { ...state, count: state.count - 1 };
      case "reset":
        return { ...state, count: 0 };
      default:
        return state;
    }
  };

  let [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <h1>Home</h1>
      <div style={divStyle}>
        <h2>useReducer</h2>
        <h3>Counter - {state.count}</h3>
        <Button
          variant="secondary"
          onClick={() => {
            dispatch({ type: "increment" });
          }}
        >
          Increment
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            dispatch({ type: "reset" });
          }}
        >
          Reset
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            dispatch({ type: "decrement" });
          }}
        >
          Decrement
        </Button>
      </div>
    </>
  );
};

export default Home;
