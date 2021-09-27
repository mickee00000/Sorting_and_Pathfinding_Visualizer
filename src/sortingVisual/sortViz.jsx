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

            count: 15,
            delay: 5,

            pp: true,
            comparisons: 0,
            swapping: 0,
            description: '',

            toggleState: true
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
            steps: [array],
            currentStep: 0,
            swapping: 0,
            comparisons: 0,
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
            swapping: 0,
            comparisons: 0,
            currentStep: 0,
            dummyArray: this.state.array,
            steps: [],
            toggleState: false
        });


        let temp = 0;
        let a = 0;
        const arr = this.state.array.slice();
        const arraySet = [];
        const colorCmp = []


        let arrayBars = document.getElementsByClassName('array-bar');


        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                a = a + 1;
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

        a = 0
        let b = 0, greener = 0;
        for (let i = 0; i < arraySet.length; i++) {
            a++;
            setTimeout(() => {
                for (let m = 0; m < arrayBars.length - greener; m++) {
                    arrayBars[m].style.backgroundColor = 'red';
                }
                const [fBar, sBar] = colorCmp[b];
                if (colorCmp[b].length === 2) {
                    arrayBars[fBar].style.backgroundColor = 'yellow';
                    arrayBars[sBar].style.backgroundColor = 'yellow';
                }

                if (arraySet[b].length === this.state.count) {
                    this.setState({array: arraySet[b], comparisons: this.state.comparisons + 1});
                } else {
                    arrayBars[arraySet[b]].style.backgroundColor = 'green';
                    greener++;
                }
                b++;
                if (i === arraySet.length - 1) {
                    arrayBars[0].style.backgroundColor = 'green';
                }


                /*for(let n = arrayBars.length-1; n > arrayBars.length - 1 - i; n--){
                    arrayBars[n].style.backgroundColor = 'green';
                }*/
            }, a * this.state.delay);


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
                <button className='multiBtn' id='firstBtn' disabled={this.state.toggleState}>(Previous)</button>
                <button className='multiBtn' onClick={() => this.playPause()} disabled={this.state.toggleState}>PLaY /
                    PAuSe
                </button>
                <button className='multiBtn' disabled={this.state.toggleState}>(Next)</button>

                {/*<button onClick={() => this.checker()}*/}
                <h1>Comparisons: {this.state.comparisons}   </h1>
                <h1>Swapping: {this.state.swapping}</h1>

            </div>
        );
    }
}

