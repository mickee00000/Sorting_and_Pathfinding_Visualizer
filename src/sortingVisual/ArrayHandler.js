import React from 'react';
import { Slider } from "@material-ui/core";
import {FaBackward} from 'react-icons/fa'
import {FaForward} from 'react-icons/fa'
import {FaPlay} from 'react-icons/fa'
import {FaPause} from 'react-icons/fa'
import {FaRedo} from 'react-icons/fa'
import { useGlobalContext } from './context';
import { insertionSort } from './sortAlgorithms/insertionSort'
import './ArrayChart.css'

const ArrayHandler = () => {
  const { algo, 
    sort,
    arrayStates, 
    copyArray, 
    changeArrayState, 
    changeCompIndexes,
    delayInterval, 
    isPlay,
    setIsPlay, 
    arraySize, 
    resetArray, 
    createNewArray, 
    changeSize, 
    setDelayInterval, 
    prevStep, 
    nextStep 
  } = useGlobalContext();

  // re-renders when isPlay changes
  // React.useEffect(()=>{
  //   if(isPlay && !sort)
  //     runAlgo()
  // },[isPlay])

  // checks the algo and runs the visualization of that algo
  const runAlgo = () => {
    switch(algo){
      case 1:
        insertionSort({
          arrayStates,
          copyArray, 
          changeArrayState, 
          changeCompIndexes
        });
        break;
      case 2:
        insertionSort();
        break;
      case 3:
        insertionSort();
        break;
      case 4:
        insertionSort();
        break;
      case 5:
        insertionSort();
        break;
      case 6:
        insertionSort();
        break;
      default:
        console.log('some issue with selection box')
    }
  }

  // handle play/pause button
  const playOrPause = () => {
    console.log('call', isPlay)
    // console.log(copyArray)
    if(!isPlay){
      setIsPlay(true)
      runAlgo() // create useEffect function
    }else{
      setIsPlay(false)
    }
  }

  // changes the delay according to slider value
  const changeDelay = (e, di) => {
    setDelayInterval(di);
  };
  return (
    <div className='array-btns'>
      <button className='btn' onClick={() => createNewArray(arraySize)}>change Array</button>
      <form>
        <label htmlFor='size'>size</label>
        <input 
          type='number'
          name='size'
          id='size'
          value={arraySize}
          className={'size-inp'}
          onChange={(e) => changeSize(e.target.value)}
        />
      </form>
      <div className='slider-container'>
        delay:{delayInterval}ms
        <Slider
          className='slider'
          defaultValue={60}
          color='secondary'
          max={1000}
          min={10}
          step={10}
          valueLabelDisplay='auto'
          onChange={changeDelay}
        ></Slider>
      </div>
      <div className='pp'>
        <button className='btn icon' onClick={() => resetArray()}>
          <FaRedo/>
        </button>
        <button className='btn icon' onClick={() => prevStep()}>
          <FaBackward/>
        </button>
        <button className='btn icon' onClick={() => playOrPause()}>
          {isPlay ? <FaPause/> : <FaPlay/>} 
        </button>
        <button className='btn icon' onClick={() => nextStep()}>
          <FaForward/>
        </button>
      </div>
    </div>
  );
}

export { ArrayHandler }
