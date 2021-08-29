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
    // for (let i = 0; i < 20; i++) {
    //   // Literally iterate through 100 random values and store them in the array intialized in the array.
    //   unsortedArray.push(Math.floor(Math.random() * (300 + 1)));
    // }

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
        <button class="try" onClick={() => this.resetArray()}>
          Generate New Array
        </button>
      </>
    );
  }
}
