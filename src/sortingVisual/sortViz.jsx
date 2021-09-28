import React from "react";
import './sortViz.css';

export default class SortingVisualizer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            dummyArray: [],

            arraySet: [],
            currentStep: 0,
            colorCmp: [],

            count: 15,
            delay: 5,

            comparisons: 0,
            swapping: 0,
            greener: 0,

            description: '',
            animeInterval: 0,

            toggleNext: true,
            togglePrev: true,
            toggleState: false,
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
        clearInterval(this.animeTimeout);
        let array = [];
        for (let i = 0; i < this.state.count; i++) {
            array.push(Math.floor(Math.random() * (200 - 50) + 5));
        }
        let arrayBars1 = document.getElementsByClassName('array-bar');
        for (let m = 0; m < arrayBars1.length; m++) {
            arrayBars1[m].style.backgroundColor = 'red';
        }


        this.setState({
            array: array,

            arraySet: [],
            colorCmp: [],
            currentStep: 0,

            comparisons: 0,
            swapping: 0,
            greener: 0,

            toggleState: true
        });
        let arrayBars = document.getElementsByClassName('array-bar');
        for (let m = 0; m < arrayBars.length; m++) {
            arrayBars[m].style.backgroundColor = 'red';
        }


    }

    Merge() {

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

        this.setState({
            swapping: 0,
            comparisons: 0,
        });

        let arr = this.state.array;
        let arrayBars = document.getElementsByClassName('array-bar');

        mergeSort(arr);

    }


    Bubble() {
        this.setState({

            currentStep: 0,


            comparisons: 0,
            swapping: 0,
            greener: 0,
        });

        let temp = 0;
        const arr = this.state.array.slice();
        const arraySet = [], colorCmp = [];
        let arrayBars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {

                if (arr[j] > arr[j + 1]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    this.setState({swapping: this.state.swapping + 1});
                }
                arraySet.push(arr.slice());
                colorCmp.push([j, j + 1].slice());
            }
            arraySet.push(arrayBars.length - 1 - i);
            colorCmp.push([0].slice());
        }

        this.setState({
            arraySet: arraySet,
            colorCmp: colorCmp
        })

        this.state.animeInterval = setInterval(() => {
            for (let m = 0; m < arrayBars.length - this.state.greener; m++) {
                arrayBars[m].style.backgroundColor = 'red';
            }
            const [fBar, sBar] = this.state.colorCmp[this.state.currentStep];
            if (this.state.colorCmp[this.state.currentStep].length === 2) {
                arrayBars[fBar].style.backgroundColor = 'yellow';
                arrayBars[sBar].style.backgroundColor = 'yellow';
            }

            if (this.state.arraySet[this.state.currentStep].length === this.state.count) {
                this.setState({
                    array: this.state.arraySet[this.state.currentStep],
                    comparisons: this.state.comparisons + 1
                });
            } else {
                arrayBars[this.state.arraySet[this.state.currentStep]].style.backgroundColor = 'green';
                this.setState({greener: this.state.greener + 1});
            }
            if (this.state.currentStep === this.state.arraySet.length - 1) {
                arrayBars[0].style.backgroundColor = 'green';
                clearInterval(this.state.animeInterval);
            }
            this.setState({currentStep: this.state.currentStep + 1})
        }, this.state.delay);


    }

    Next() {

    }

    playPause() {
        if (this.state.pp) {
            this.setState({pp: false});
        } else {
            this.setState({pp: true})
        }
    }

    Prev() {

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
                <button className='multiBtn' id='firstBtn' disabled={this.state.togglePrev}>(Previous)</button>
                <button className='multiBtn' onClick={() => this.playPause()} disabled={this.state.toggleState}>PLaY /
                    PAuSe
                </button>
                <button className='multiBtn' disabled={this.state.toggleNext}>(Next)</button>

                {/*<button onClick={() => this.checker()}*/}
                <h1>Comparisons: {this.state.comparisons}   </h1>
                <h1>Swapping: {this.state.swapping}</h1>

            </div>
        );
    }
}

