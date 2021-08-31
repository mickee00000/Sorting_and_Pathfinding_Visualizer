import React from "react";
import "./ArrayChart.css";

import { genrateRandomArray } from "./sortAlgorithms/array";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array: [] }; // So, whenever our react app starts, this array get initialized.
  }

  resetArray() {
    const array = genrateRandomArray();
    this.setState({ array });
  }

  componentDidMount() {
    // This method is called during the mounting phase i.e after the components are rendered.
    this.resetArray(); // Everytime we reload, we get a new Array
  }

  render() {
    const { array } = this.state;
    return (
      <>
        <div className="array-box">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              id={`div-${idx}`}
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <div className="array-controller">
          <button className="try" onClick={() => this.resetArray()}>
            Generate New Array
          </button>
          <button>Change Size</button>
          <button>Change Speed</button>
          <button>Old Array</button>
        </div>
      </>
    );
  }
}
