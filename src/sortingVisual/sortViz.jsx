import React from 'react';
import './sortViz.css';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {unsortedArray: []}; // So, whenever our react app starts, this array get initialized.
    }

    resetArray() {
        const unsortedArray = []; 
        for (let i = 0; i < 60; i++){ // Literally iterate through 100 random values and store them in the array intialized in the array.
            unsortedArray.push(Math.floor(Math.random()*(650  + 1) + 60));
        }
        this.setState({unsortedArray})
    }

    componentDidMount(){ // This method is called during the mounting phase i.e after the components are rendered.
        this.resetArray(); // Everytime we reload, we get a new Array
    }

    render() {
        const {unsortedArray} = this.state;
        return (
            <div className="array-box">
            {
                unsortedArray.map(
                    (value, idx) => (<div className="array-bar" key = {idx} style={{height: `${value}px`}}></div>)
                )
            }
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            </div>
        );
    }
};


