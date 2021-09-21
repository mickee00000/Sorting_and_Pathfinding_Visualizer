import React from 'react';
import { Slider } from "@material-ui/core";
import { useGlobalContext } from './context';
import './ArrayChart.css'

const ArrayHandler = () => {
  const { arraySize, changeArray, changeSize, changeSpeed } = useGlobalContext();

  const changeArraySize = (e) => {
    e.preventDefault();
    let size = parseInt(arraySize);
    if(size < 5){
      size = 5;
    }
    if(size > 100){
      size = 100;
    }
    changeSize(size);
    // createRandomArray(size); no need of this as useeffect is already there
  }

  return (
    <div>
      <button className='btn' onClick={() => changeArray(arraySize)}>change Array</button>
      <form onSubmit={changeArraySize}>
        <label htmlFor='size'>size</label>
        <input 
          type='number'
          name='size'
          id='size'
          value={arraySize}
          className={'size-inp'}
          onChange={(e)=>changeSize(e.target.value)}
        />
      </form>
      <Slider
        defaultValue={1}
        color='secondary'
        max={2}
        min={0.5}
        step={0.1}
        valueLabelDisplay='auto'
        onChange={changeSpeed}
      ></Slider>
    </div>
  );
}

export { ArrayHandler }