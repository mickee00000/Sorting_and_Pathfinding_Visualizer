import React from 'react';
import { Slider } from "@material-ui/core";


import './ArrayChart.css'
import { useGlobalContext } from './context';
import {createRandomArray} from './array';

const ArrayChart = () => {
  const { 
    array,
    width,
    arrayStates,
    comparisons,
    setIndex 
  } = useGlobalContext();

  // changes the delay according to slider value
  const changeIndex = (e, i) => {
    setIndex(i);
  };
  
  return (
    <>
      <main className='upper-nav'>
        <h3>Sorting Visualizer</h3>
      </main>
      <div className='slider-container'>
        <Slider
          className='slider'
          defaultValue={0}
          color='secondary'
          step={1}
          max={arrayStates.length-1}
          valueLabelDisplay='auto'
          onChange={changeIndex}
        ></Slider>
      </div>
      <div className='array-box'>
        {array.map((element, index) => {
            return (
              <div key={index} id={`div-${index}`} className='array-bar' style={{height: `${element}px`, width:`${width}px`}}>
                {element}
              </div>
            );
        })}
      </div>

      <div>
      comparisons: {comparisons}
      </div>

    </>
    );
};

export { ArrayChart, createRandomArray };