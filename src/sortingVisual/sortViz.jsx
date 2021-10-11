import React from "react";
import './sortViz.css';
import {Slider} from "@material-ui/core";

export default class SortingVisualizer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            dummyArray: [],

            arraySet: [],
            currentStep: 0,
            colorCmp: [],

            count: 40,
            delay: 50,

            comparisons: 0,
            swapping: 0,
            greener: 0,

            description: '',
            animeInterval: 0,
            playing: false,

            toggleNext: true,
            togglePrev: true,
            togglePP: true,
            toggleSort: false,
            toggleNewArr: false,

            toggleSliderCount: false,
            toggleSliderDelay: false,
            toggleSliderPlayback: true,

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
        clearInterval(this.state.animeInterval);
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

            toggleNext: true,
            togglePrev: true,
            togglePP: true,
            toggleSort: false,
            toggleNewArr: false,

            toggleSliderCount: false,
            toggleSliderDelay: false,
        });
        let arrayBars = document.getElementsByClassName('array-bar');
        for (let m = 0; m < arrayBars.length; m++) {
            arrayBars[m].style.backgroundColor = 'red';
        }


    }

    Merge() {

        function mergeSort(array, startIdx, endIdx, dummyArr) {
            console.log("Splitting: ", array)

            if (array.length > 1) {
                let middle = Math.floor(arr.length/ 2);
                let leftArr = array.slice(0, middle+1);
                let rightArr = array.slice(middle+1, array.length);

                mergeSort(leftArr, startIdx, middle,dummyArr);
                mergeSort(rightArr, middle+1, endIdx, dummyArr);

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
////////////////////////Start of the Merge Sort
        this.setState({
            swapping: 0,
            comparisons: 0,
        });

        let arr = this.state.array.slice();
        let arrayBars = document.getElementsByClassName('array-bar');
        let dummy = arr.slice();

        mergeSort(arr, 0 , arr, dummy);

    }


    Bubble() {
        this.setState({

            currentStep: 0,

            comparisons: 0,
            swapping: 0,
            greener: 0,
            playing: true,

            toggleSort: true,
            toggleNewArr: false,
            toggleNext: true,
            togglePP: false,
            togglePrev: true,

            toggleSliderCount: true,
            toggleSliderDelay: false,
            toggleSliderPlayback: false,

            /* firstPrev: true*/
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
            this.BubbleColor();
            this.setState({currentStep: this.state.currentStep + 1})
        }, this.state.delay);
    }

    BubbleColor() {
        let arrayBars = document.getElementsByClassName('array-bar');
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
            this.setState({
                comparisons: this.state.comparisons + 1,
                toggleNewArr: false,
                toggleSort: false,
                toggleNext: true,
                togglePP: true,
                togglePrev: false,
                toggleSliderDelay: true,
            })
            clearInterval(this.state.animeInterval);
        }
    }

    Next() {
        this.setState({

            currentStep: this.state.currentStep + 1,

            toggleSort: true,
            toggleNewArr: false,
            toggleNext: false,
            togglePP: false,
            togglePrev: false,

            toggleSliderCount: true,
            toggleSliderDelay: true,
        });

        this.BubbleColor();
    }

    playPause() {
        if (this.state.playing) {
            clearInterval(this.state.animeInterval);
            this.setState({
                togglePrev: false,
                toggleNext: false,
                playing: false
            })
            let arrayBars = document.getElementsByClassName('array-bar');
            for (let m = 0; m < arrayBars.length - this.state.greener; m++) {
                arrayBars[m].style.backgroundColor = 'red';
            }
            const [fBar, sBar] = this.state.colorCmp[this.state.currentStep - 1];
            if (this.state.colorCmp[this.state.currentStep].length === 2) {
                arrayBars[fBar].style.backgroundColor = 'yellow';
                arrayBars[sBar].style.backgroundColor = 'yellow';
            }
            for (let m = arrayBars.length - 1; m >= arrayBars.length - this.state.greener; m--) {
                arrayBars[m].style.backgroundColor = 'green';
            }
        }
        else{
            this.state.animeInterval = setInterval(() => {
                this.BubbleColor();
                this.setState({currentStep: this.state.currentStep + 1, playing: true})
            }, this.state.delay);
        }

    }

    Prev() {
        if (this.state.currentStep === 0) {
            this.setState({
                togglePrev: false
            })
        } else {
            /*if (this.state.firstPrev){
                this.setState({
                    currentStep: this.state.currentStep - 1,
                    firstPrev: false
                })

            }*/
            this.setState({
                currentStep: this.state.currentStep - 1
            })
            this.BubbleColor()
        }

    }

    render() {
        const delayer = (e, val) => {
            console.warn(val)
            this.setState({
                delay: val
            })
            clearInterval(this.state.animeInterval);
            this.state.animeInterval = setInterval(() => {
                this.BubbleColor();
                this.setState({currentStep: this.state.currentStep + 1, playing: true})
            }, this.state.delay);
        }
        const sizer = (e, val) => {
            console.warn(val)
            this.setState({
                count: val
            })
            this.resetArray()
        }
        const playback = (e,val) => {
            console.warn(val)
            this.playPause();
            this.setState({
                currentStep: val,
                playing: true
            })
        }
        return (
            <div>

                <div style={{width: 1000 }} className={'upSlider-1'}>
                    <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Number of Elements in the Array:</h3>
                    <h1> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {this.state.count}</h1>
                <Slider
                    aria-label="Number of Elements"
                    defaultValue={this.state.count}
                    max={100}
                    min={10}
                    step={1}
                    onChange={sizer}
                    valueLabelDisplay={true}
                    aria-setsize={10}
                    disabled={this.state.toggleSliderCount}
                />
                </div>
                <div className={'upSlider-2'} style={{width:1000}}>

                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Delay of Transitions:</h3>
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.delay}ms</h1>
                <Slider
                    aria-label="Delay"
                    defaultValue={this.state.delay}
                    max={500}
                    min={0}
                    step={10}
                    onChange={delayer}
                    valueLabelDisplay={true}
                    disabled={this.state.toggleSliderDelay}
                />
                </div>
                <h3> {
                    this.state.array.map((value, index) =>
                        <div className="array-bar" key={index} style={{height: `${value * 3}px`}}>{value}</div>
                    )
                }</h3>
                <div>
                    <Slider
                        value={this.state.currentStep}
                        aria-label="Delay"
                        defaultValue={this.state.currentStep}
                        max={this.state.arraySet.length-1}
                        min={0}
                        step={1}
                        onChange={playback}
                        valueLabelDisplay={true}
                        disabled={this.state.toggleSliderPlayback}
                    />
                </div>
                <button className='multiBtn' onClick={() => this.resetArray()}
                        disabled={this.state.toggleNewArr}>Generate New Array
                </button>
                <button className='multiBtn' onClick={() => this.Bubble()} disabled={this.state.toggleSort}>Bubble
                    Sort
                </button>
                <button className='multiBtn' onClick={() => this.Merge()} disabled={this.state.toggleSort}>Merge Sort
                </button>
                <button className='multiBtn' onClick={() => this.Prev()} id='firstBtn'
                        disabled={this.state.togglePrev}>(Previous) *BUGGY
                </button>
                <button className='multiBtn' onClick={() => this.playPause()} disabled={this.state.togglePP}>PLaY /
                    PAuSe
                </button>
                <button className='multiBtn' onClick={() => this.Next()} disabled={this.state.toggleNext}>(Next)
                </button>
                {/*<button onClick={() => this.checker()}*/}
                <br/>
                <h1>Comparisons: {this.state.comparisons}   </h1>
              {/*  <h1>Swapping: {this.state.swapping}</h1>*/}

            </div>
        );
    }
}

