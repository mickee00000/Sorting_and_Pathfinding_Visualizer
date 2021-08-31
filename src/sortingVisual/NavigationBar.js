import React from 'react';

import "./ArrayChart.css";
import {insertionSort} from './sortAlgorithms/insertion';

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li id='shortpath' className='items'>
          <button className='buttons'>Shortest Path</button>
        </li>
        <li className='items'>
          <button className='buttons'>Merge sort</button>
        </li>
        <li className='items'>
          <button className='buttons'>Selection Sort</button>
        </li>
        <li className='items'>
          <button className='buttons' onClick={insertionSort}>Insertion Sort</button>
        </li>
        <li className='items'>
          <button className='buttons'>Bubble Sort</button>
        </li>
        <li className='items'>
          <button className='buttons'>Quick sort</button>
        </li>
        <li className='items'>
          <button className='buttons'>Shell sort</button>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar

