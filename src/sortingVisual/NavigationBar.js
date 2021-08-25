import React from 'react';

import './sortViz.css';

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li id='shortpath'>
          <button className='buttons'>Shortest Path</button>
        </li>
        <li className='items'>
          <button className='buttons'>Change Size</button>
        </li>
        <li className='items'>
          <button className='buttons'>Selection Sort</button>
        </li>
        <li className='items'>
          <button className='buttons'>Change Array</button>
        </li>
        <li className='items'>
          <button className='buttons'>Change Array</button>
        </li>
        <li className='items'>
          <button className='buttons'>Change Array</button>
        </li>
        <li className='items'>
          <button className='buttons'>Change Array</button>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar

