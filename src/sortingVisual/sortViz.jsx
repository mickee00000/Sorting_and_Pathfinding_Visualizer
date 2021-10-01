import React from "react";
import './sortViz.css';
import {Slider} from "@material-ui/core";

export default class SortingVisualizer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            dummyArray:[],
            arraySet: [],
            compIndexes: [],
            currentStep: 0,
            sort: false,

            size: 5,
            delay: 50,

        };
    }


    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        let arr = [];
        for (let i = 0; i < this.state.size; i++) {
            arr.push(Math.floor(Math.random() * (200 - 50) + 5));
        }
        console.log('called')
        this.setState({
            array: arr,
            dummyArray: arr,
        })
        console.log(this.state.array)

    }



    render() {
        const changeSize = (e, s) => {
            this.setState({
                size: s,
            })
            this.resetArray();
        }
        const changeDelay = (e, s) => {
            this.setState({
                delay: s,
            })
        }

        return (
            <div>

                    {
                        this.state.array.map((value, index)=>{
                            return(<div className={"array-bar"} key={index} style={{height: `${value*3}px`}}>{value}</div>)
                            }
                        )
                    }

                <Slider
                    defaultValue = {this.state.size}
                    color = 'secondary'
                    max = {100}
                    min={5}
                    step ={1}
                    valueLabelDisplay = 'auto'
                    onChange={changeSize}
                />
                <Slider
                    defaultValue={this.state.delay}
                    max = {750}
                    min = {0}
                    step = {10}
                    valueLabelDisplay={true}
                    onChange={changeDelay}
                    />
                <button onClick={() => this.resetArray()}> Generate New Array</button>
                <button onClick={()=>{insertionSort({array:this.state.array, arraySet:this.state.arraySet})}}>Insertion Sort</button>
            </div>
        );
    }
}

