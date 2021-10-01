import React from 'react';

import './ArrayChart.css'
import { useGlobalContext } from './context';
import {createRandomArray} from './array';

const ArrayChart = () => {
  const { array, swaps, comparisons } = useGlobalContext();

  return (
    <>
      <div className='array-box'>
        {array.map((element, index) => {
            return (
              <div key={index} id={`div-${index}`} className='array-bar' style={{height: `${element}px`}}>
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
