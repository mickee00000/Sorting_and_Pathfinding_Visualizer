import React from 'react';
import { useEffect } from "react";

import './ArrayChart.css'
import { ArrayHandler } from './ArrayHandler';
import { useGlobalContext } from './context';
import {createRandomArray} from './array';

const ArrayChart = () => {
  const { array, arraySize, changeArray } = useGlobalContext();
  
  useEffect(() => {
    changeArray(arraySize);
  }, [])

  return (
      <>
      <div className='array-box'>
        {array.map((element, index) => {
            return (
              <div key={index} className='array-bar' style={{height: `${element}px`}}>
                {element}
              </div>
            );
        })}
      </div>
      <div className='array-btns'>
        <ArrayHandler/>
      </div>
      </>
    );
};

export { ArrayChart, createRandomArray };