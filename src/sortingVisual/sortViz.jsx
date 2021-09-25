import React from "react";
import './sortViz.css';

export default class SortingVisualizer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            dummyArray: [],

            steps: [],
            currentStep: 0,

            count: 10,
            delay: 10,

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
        let array = [];
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

        function mergeSort(array) {
            console.log("Splitting: ", array)

            if (array.length > 1) {
                let middle = Math.ceil(array.length / 2);
                let leftArr = array.slice(0, middle);
                let rightArr = array.slice(middle, array.length);

                mergeSort(leftArr);
                mergeSort(rightArr);

                let l = 0, r = 0, i = 0;

                while (l < leftArr.length && r < rightArr.length) {
                    if (leftArr[l] < rightArr[r]) {
                        array[i] = leftArr[l];
                        i++;
                        l++;
                    } else {
                        array[i] = rightArr[r];
                        i++;
                        r++;
                    }
                }
                while (l < leftArr.length) {
                    array[i] = leftArr[l];
                    i++;
                    l++;
                }
                while (r < rightArr.length) {
                    array[i] = rightArr[r];
                    i++;
                    r++;
                }
                console.log("Merging:   ", array)
            }

        }

        mergeSort(arr);

    }


    Bubble() {

        this.setState({
            swappings: 0,
            comparisons: 0,
            currentStep: 0,
            dummyArray: this.state.array,
            steps: [this.state.array],
        });
        let dummy = this.state.dummyArray;
        let steper = this.state.steps;
        for (let i = 0; i < dummy.length - 1; i++) {
            for (let j = 0; j < dummy.length - 1 - i; j++) {
                if (dummy[j] > dummy[j + 1]) {
                    temp = dummy[j];
                    dummy[j] = dummy[j + 1];
                    dummy[j + 1] = temp;
                    /*this.setState({array: arr, swappings: this.state.swappings + 1});*/
                }
                steper.push(dummy)
                this.setState({
                    currentStep: this.state.currentStep + 1,
                    steps: steper
                })
            }
        }
        let temp = 0;
        let a = 0;
        let arr = this.state.array.slice();
        let arrayBars = document.getElementsByClassName('array-bar');
        arrayBars[0].style.backgroundColor = 'yellow';
        arrayBars[1].style.backgroundColor = 'orange';

        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (this.state.pp) {
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
    }

    playPause() {
        if (this.state.pp) {
            this.setState({pp: false});
        } else {
            this.setState({pp: true})
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
                <button className='multiBtn' onClick={() => this.resetArray()}>Generate New Array</button>
                <button className='multiBtn' onClick={() => this.Bubble()}>Bubble Sort</button>
                <button className='multiBtn' onClick={() => this.Merge()}>Merge Sort</button>
                <button className='multiBtn' id='firstBtn'>(Previous)</button>
                <button className='multiBtn' onClick={() => this.playPause()}>PLaY / PAuSe</button>
                <button className='multiBtn'>(Next)</button>
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