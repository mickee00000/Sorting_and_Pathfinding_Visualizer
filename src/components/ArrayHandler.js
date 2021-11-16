import React from 'react';
import { Select, MenuItem } from '@material-ui/core';
import {FaBackward} from 'react-icons/fa'
import {FaForward} from 'react-icons/fa'
import {FaPlay} from 'react-icons/fa'
import {FaPause} from 'react-icons/fa'
import {FaRedo} from 'react-icons/fa'

import { ComplexityGraph } from './ComplexityGraph'
import { useGlobalContext } from './context';
import { insertionSort } from './sortAlgorithms/insertionSort'
import { selectionSort } from './sortAlgorithms/selectionSort'
import { bubbleSort } from './sortAlgorithms/bubbleSort';
import { quickSort } from './sortAlgorithms/quickSort';
import { shellSort } from './sortAlgorithms/shellSort';

import './ArrayHandler.css'
import { mergeSort } from './sortAlgorithms/mergeSort';

const ArrayHandler = () => {
  const {
    setArraySize,
    setArray,
    setDummyArray,
    algo,
    setAlgo,
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
    analyzeTimeWithAlgo,
    analyzeTimeWithArraysize,
    setDiffAlgoTime,
    setDiffSizeTime,
    changeSize, 
    setDelayInterval, 
    prevStep, 
    nextStep 
  } = useGlobalContext();
  const [userArray, setUserArray] = React.useState()

  // setting algo according to user input
  const updateAlgo = (e) => {
    setDiffSizeTime([])
    setAlgo(e.target.value)
  }

  // checks the algo and runs the visualization of that algo
  const runAlgo = () => {
    switch(algo){
      case 1:
        insertionSort({
          arrayStates,
          copyArray, 
          changeArrayState, 
          changeCompIndexes,
          analyzeTimeWithAlgo,
          analyzeTimeWithArraysize,
          setDiffAlgoTime,
          setDiffSizeTime
        });
        break;
      case 2:
        selectionSort({
          arrayStates,
          copyArray,
          changeArrayState,
          changeCompIndexes,
          analyzeTimeWithAlgo,
          analyzeTimeWithArraysize,
          setDiffAlgoTime,
          setDiffSizeTime
        });
        break;
      case 3:
        bubbleSort({
          arrayStates,
          copyArray,
          changeArrayState,
          changeCompIndexes,
          analyzeTimeWithAlgo,
          analyzeTimeWithArraysize,
          setDiffAlgoTime,
          setDiffSizeTime
        });
        break;
      case 4:
        quickSort({
          arrayStates,
          copyArray,
          changeArrayState,
          changeCompIndexes,
          analyzeTimeWithAlgo,
          analyzeTimeWithArraysize,
          setDiffAlgoTime,
          setDiffSizeTime
        });
        break;
      case 5:
        mergeSort({
          arrayStates,
          copyArray,
          changeArrayState,
          changeCompIndexes,
          analyzeTimeWithAlgo,
          analyzeTimeWithArraysize,
          setDiffAlgoTime,
          setDiffSizeTime
        });
        break;
      case 6:
        shellSort({
          arrayStates,
          copyArray,
          changeArrayState,
          changeCompIndexes,
          analyzeTimeWithAlgo,
          analyzeTimeWithArraysize,
          setDiffAlgoTime,
          setDiffSizeTime
        });
        break;
      default:
        console.log('some issue with selection box')
    }
  }

  // handle play/pause button
  const playOrPause = () => {
    console.log('call', isPlay)
    if(!isPlay){
      setIsPlay(true)
      runAlgo() // create useEffect function
    }else{
      setIsPlay(false)
      let id = window.setTimeout(function() {}, 0);
      while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
      }
    }
  }

  // changes the delay according to slider value
  const changeDelay = (di) => {
    let n = parseInt(di)
    setDelayInterval(n);
  };

  // function for user input
  const handleSubmit = (e) => {
    e.preventDefault();
    let a = []
    userArray.split(',').map(function(item) {
      let t = parseInt(item, 10)
      a.push(t)
      return t
    });
    setArraySize(a.length)
    setDummyArray(a)
    setArray(a)
  }
  return (
    <nav>
      <div className='array-btns'>
        <div className='new-arr comm-design-btn'>
          <button className='btn'
            disabled={analyzeTimeWithAlgo || analyzeTimeWithArraysize}
            onClick={() => createNewArray(arraySize)}
          >
            New Array
          </button>
        </div>
        <div className='group length'>
          <label>Length: {arraySize} </label>
          <br/>
          <input
            className='range-input'
            disabled={analyzeTimeWithAlgo}
            defaultValue={arraySize}
            type='range'
            onChange={(e) => changeSize(e.target.value)}
            min={5}
            max={500}
            step={1}
          ></input>
        </div>
        <div className='group speed'>
          <label>Delay: {delayInterval}ms</label>
          <br/>
          <input
            className='range-input'
            defaultValue={delayInterval}
            type='range'
            onChange={(e) => changeDelay(e.target.value)}
            min={10}
            max={1000}
            step={10}
          ></input>
        </div>
        <div  className='pp'>
          <button className='icon-btn' onClick={() => resetArray()}>
            <FaRedo className='icon'/>
          </button>
          <button className='icon-btn' onClick={() => prevStep()}>
            <FaBackward className='icon'/>
          </button>
          <button className='icon-btn' onClick={() => playOrPause()}>
            {isPlay ? <FaPause className='icon'/> : <FaPlay className='icon'/>} 
          </button>
          <button className='icon-btn' onClick={() => nextStep()}>
            <FaForward className='icon'/>
          </button>
        </div>
        <div className='select-algo'>
            <Select
              className='select'
              disabled={analyzeTimeWithArraysize} 
              value={algo}
              onChange={updateAlgo}
            >
              <MenuItem value={1}>
                Insertion Sort
              </MenuItem>
              <MenuItem value={2}>
                Selection Sort
              </MenuItem>
              <MenuItem value={3}>
                Bubble Sort
              </MenuItem>
              <MenuItem value={4}>
                Quick Sort
              </MenuItem>
              <MenuItem value={5}>
                Merge Sort
              </MenuItem>
              {/* <MenuItem value={6}>
                Shell Sort
              </MenuItem> */}
            </Select>
          </div>
          <form className='user-array-form' onSubmit={handleSubmit}>
              <input
                type='text'
                className='user-array'
                placeholder='pattern: 1, 2, 3, 4, 5'
                value={userArray}
                onChange={(e) => setUserArray(e.target.value)}
              />
              <button  className='submit-btn'>
                Enter Array
              </button>
          </form>
          
        </div>
        <ComplexityGraph />
    </nav>
  );
}

export { ArrayHandler }