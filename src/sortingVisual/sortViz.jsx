import React from "react";
import './sortViz.css';

export default class SortingVisualizer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            steps: [],
            colorKey: [],
            colors: [],
            timeouts: [],
            currentStep: 0,
            count: 30,
            delay: 10,
            algorithm: '',
            pp: true,
            comparisons: 0,
            swappings: 0,
            description: ''
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    /*
        checker(){
            const checkHelper = document.getElementsByClassName('array-bar');
            checkHelper[4].style.backgroundColor = 'yellow';
        }
    */

    resetArray() {
        const array = [];
        for (let i = 0; i < this.state.count; i++) {
            array.push(Math.floor(Math.random() * (200 - 50) + 5));
        }
        this.setState({
            array: array,
            steps: [array],
            currentStep: 0,
            swappings: 0,
            comparisons: 0,
        });
        let arrayBars = document.getElementsByClassName('array-bar');
        for (let m = 0; m < arrayBars.length; m++) {
            arrayBars[m].style.backgroundColor = 'red';
        }


    }

    Merge() {
        this.setState({
            swappings: 0,
            comparisons: 0,
        });

        let arr = this.state.array;
        let arrayBars = document.getElementsByClassName('array-bar');

    }


    Bubble() {

        this.setState({
            swappings: 0,
            comparisons: 0,
        });

        let temp = 0;
        let a = 0;
        let arr = this.state.array;
        let arrayBars = document.getElementsByClassName('array-bar');
        arrayBars[0].style.backgroundColor = 'yellow';
        arrayBars[1].style.backgroundColor = 'orange';

        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                a = a + 1;

                setTimeout(() => {
                    for (let m = 0; m < arrayBars.length; m++) {
                        arrayBars[m].style.backgroundColor = 'red';
                    }
                    if (j < arr.length - 1 - i) {
                        arrayBars[j + 1].style.backgroundColor = 'yellow';
                    }
                    if (j < arr.length - 1 - i - 1) {
                        arrayBars[j + 2].style.backgroundColor = 'orange';
                    }
                    this.setState({comparisons: this.state.comparisons + 1})

                    if (arr[j] > arr[j + 1]) {
                        temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                        this.setState({array: arr, swappings: this.state.swappings + 1});

                    }
                    for (let n = arrayBars.length - 1; n > arrayBars.length - i - 1; n--) {
                        arrayBars[n].style.backgroundColor = 'green';
                    }
                    if (i === arrayBars.length - 2 && j === 0) {
                        arrayBars[0].style.backgroundColor = 'green';
                        arrayBars[1].style.backgroundColor = 'green';
                    }
                }, this.state.delay * a);
                /*arrayBars[j+1].style.backgroundColor = 'cyan';*/
            }
        }
    }
    render() {
        return (
            <div>
                <h3> {
                    this.state.array.map((value, index) =>
                        <div className="array-bar" key={index} style={{height: `${value * 3}px`}}>{value}</div>
                    )
                }</h3>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.Bubble()}>Bubble Sort</button>
                <button onClick={() => this.Merge()}>Bubble Sort</button>
                {/*<button onClick={() => this.checker()}*/}
                <h1>Comparisons: {this.state.comparisons}   </h1>
                <h1>Swapping: {this.state.swappings}</h1>

            </div>
        );
    }
}



{/*
<br/>
<button onClick={() => this.playPause()}>Pause / Play</button>

playPause(){
        if (this.state.pp) {
            this.setState({pp: false});
        }
        else{
            this.setState({pp:true})
        }
    }

if (this.state.pp) {
}
*/}