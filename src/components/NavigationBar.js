import React from 'react';
import { FaBars } from 'react-icons/fa';
// import { createRandomArray } from './ArrayChart';

import './ArrayChart';

function NavigationBar() {
  
  return (
    <nav>
      <div className='nav-center'>
        <button className='nav-toggle'>
          <FaBars/>
        </button>
      </div>
      <div className='btn-container'>
        <ul className='sort-btns'>
          <li className='items'>
            <button className='btn'>Selection Sort</button>
            </li>
          <li className='items'>
            <button className='btn'>Bubble Sort</button>
          </li>
          <li className='items'>
            <button className='btn'>Merge Sort</button>
          </li>
          <li className='items'>
            <button className='btn'>Quick Sort</button>
          </li>
          <li className='items'>
            <button className='btn'>Heap Sort</button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export { NavigationBar }
