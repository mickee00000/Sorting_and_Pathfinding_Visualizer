import React, {useState, useContext, useEffect } from 'react';
import { createRandomArray } from './array';
import { showVisualArrayIS } from './sortAlgorithms/insertionSort';
import { showVisualArraySS } from './sortAlgorithms/selectionSort';
import { showVisualArrayBS } from './sortAlgorithms/bubbleSort';
import { showVisualArrayShS } from './sortAlgorithms/shellSort';
import { showVisualArrayQS } from './sortAlgorithms/quickSort';
import { showVisualArrayMS } from './sortAlgorithms/mergeSort';
// import { quickVisual } from './sortAlgorithms/quickSort';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [arraySize, setArraySize] = useState(20)
  const [array, setArray] = useState([])
  const [dummyArray, setDummyArray] = useState([])
  const [arrayStates, setArrayStates] = useState([])
  const [index, setIndex] = useState(0)
  const [comparisons, setComparisons] = useState(0)
  const [swaps, setSwaps] = useState(0)
  const [cmpIndexes, setCmpIndexes] = useState([])
  const [delayInterval, setDelayInterval] = useState(60)
  const [sort, setSort] = useState(false)
  const [isPlay, setIsPlay] = useState(false)
  const [algo, setAlgo] = useState(1)
  const [width, setWidth] = useState(window.innerWidth/30) // new line
  const [analyzeTimeWithAlgo, isAnalyzeTimeWithAlgo] = useState(false)
  const [analyzeTimeWithArraysize, isAnalyzeTimeWithArraysize] = useState(false)
  const [diffAlgoTime, setDiffAlgoTime] = useState([])
  const [diffSizeTime, setDiffSizeTime] = useState([])

  // re-renders whenever arrayStates change and array is sorted
  useEffect(()=>{
    if(sort){
      runVisualization()
    }
  }, [arrayStates])

  // re-renders whenever index changes   new try---------
  useEffect(()=>{
    if(sort){
      chooseArrayVisual(index)
    }
  }, [index])

  // checks algorithm and run visualization of that algo
  const runVisualization = () => {
    setIsPlay(true);
    let delay = 0;
    console.log(arrayStates.length, delayInterval)
    for(let i = index+1; i < arrayStates.length; i++){
      if(isPlay){
        setTimeout(()=>{
          setIndex(i)
        }, delay += delayInterval)
      }else{
        break
      }
    }
    const array_bars = document.getElementsByClassName('array-bar')
    for(let i = 0; i < array_bars.length; i++){  
      setTimeout(()=>{
        array_bars[i].style.backgroundColor = 'green'
      }, delay+=delayInterval)
    }
  }
  
  // re-renders when size of the array is changed
  // useEffect(() => {
  //   createNewArray(arraySize);
  // }, [arraySize]);

  // for changing the size of the array
  const changeSize = (size) =>{
    if(size < 5){
      size = 5;
    }
    if(size > 500){
      size = 500;
    }
    setWidth(window.innerWidth/(1.5*size))
    setArraySize(size);
    createNewArray(size); // new line in order remove cliche in user array problem
  };

  // only called once for changing the arraySet   ]
  // after array is sorted by sort algo           ]=====> below both
  const changeArrayState = (arr) => {
    setSort(true)
    setArrayStates(prevState=>{ return arr;});
  }
  const changeCompIndexes = (arr) => {
    setCmpIndexes(arr)
  }

  // creates new Random array and save it to state
  const createNewArray = (size) => {
    let arr = createRandomArray(size)
    setDiffAlgoTime([])
    setSort(false)
    setIndex(0)
    setComparisons(0)
    setSwaps(0)
    setArrayStates([])
    setArray(arr)
    setDummyArray(arr)
    const array_bars = document.getElementsByClassName('array-bar')
    for(let i = 0; i < arraySize; i++){
      if(array_bars[i])
        array_bars[i].style.backgroundColor = 'red';
    }
  }

  // sorting is performed on copied array from array usestate
  const copyArray = () => {
    let arr = [];
    for(let i = 0; i < arraySize; i++){
      arr.push(array[i]);
    }
    return arr;
  };

  // reset Array to previous unsorted so that we can perform
  // different algorithms on same array and observes time taken
  // also reset all other states which should 
  const resetArray = ()=>{
    console.log('reset')
    setSort(false)
    setArrayStates([])
    setComparisons(0)
    setSwaps(0)
    setArray(dummyArray)
    setIndex(0)
    //setDiffAlgoTime()
    const array_bars = document.getElementsByClassName('array-bar')
    for(let i = 0; i < arraySize; i++){
      if(array_bars[i])
        array_bars[i].style.backgroundColor = 'red';
    }
  }

  // whenever index changes this will be called
  const chooseArrayVisual = (i) => {
    switch(algo){
      case 1:
        showVisualArrayIS({
          i,
          arrayStates,
          cmpIndexes, 
          setComparisons, 
          setArray, 
          setIsPlay
        })
        break;
      case 2:
        showVisualArraySS({
          i, 
          arrayStates,
          cmpIndexes, 
          setComparisons, 
          setArray, 
          setIsPlay
        })
        break;
      case 3:
        showVisualArrayBS({
          i, 
          arrayStates,
          cmpIndexes, 
          setComparisons, 
          setArray, 
          setIsPlay
        })
        break;
      case 4:
        showVisualArrayQS({
          i, 
          arrayStates,
          cmpIndexes, 
          setComparisons, 
          setArray, 
          setIsPlay
        })
        break;
      case 5:
        showVisualArrayMS({
          i, 
          arrayStates,
          cmpIndexes, 
          setComparisons, 
          setArray, 
          setIsPlay
        })
        break;
      case 6:
        showVisualArrayShS({
          i, 
          arrayStates,
          cmpIndexes, 
          setComparisons, 
          setArray, 
          setIsPlay
        })
        break;
      default:
        console.log('some issue with select box')
    }
  }

  const prevStep = () => {
    setIndex((prev)=>{
      if(prev - 1 >= 0)
        return prev - 1
      return prev
    });
    setArray(arrayStates[index]) 
  }
  const nextStep = () => {
    setIndex((prev)=>{
      if(prev+1 < arrayStates.length)
        return prev+1
      return prev;
    })
    setArray(arrayStates[index])
  }

  return (
    <AppContext.Provider 
      value={{
        array,
        setDummyArray,
        width,
        isPlay,
        algo,
        arraySize,
        arrayStates,
        comparisons,
        swaps,
        delayInterval,
        diffAlgoTime,
        diffSizeTime,
        analyzeTimeWithAlgo,
        analyzeTimeWithArraysize,
        setDiffAlgoTime,
        setDiffSizeTime,
        isAnalyzeTimeWithAlgo,
        isAnalyzeTimeWithArraysize,
        setIsPlay,
        setArray,
        setArraySize,
        resetArray,
        changeArrayState,
        changeCompIndexes,
        setIndex,
        setAlgo,
        createNewArray,
        copyArray,
        changeSize,
        setDelayInterval,
        nextStep,
        prevStep
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };