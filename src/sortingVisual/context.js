import React, {useState, useContext, useEffect } from 'react';
import { createRandomArray } from './array';
import { insertionVisual } from './sortAlgorithms/insertionSort';

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

  // re-renders whenever arrayStates change and array is sorted
  useEffect(()=>{
    if(sort){
      runVisualization()
    }
  }, [arrayStates])

  // checks algorithm and run visualization of that algo
  const runVisualization = () => {
    switch(algo){
      case 1:
        insertionVisual({
          isPlay,
          index,
          arrayStates,
          delayInterval,
          setIndex,
          setIsPlay,
          changeArray
        });
        break;
      case 2:
        insertionVisual();
        break;
      case 3:
        insertionVisual();
        break;
      case 4:
        insertionVisual();
        break;
      case 5:
        insertionVisual();
        break;
      case 6:
        insertionVisual();
        break;
      default:
        console.log('some issue with select box')
    }
  }
  
  // re-renders when size of the array is changed
  useEffect(() => {
    createNewArray(arraySize);
  }, [arraySize]);

  // for changing the size of the array
  const changeSize = (size) =>{
    if(size < 5){
      size = 5;
    }
    if(size > 100){
      size = 100;
    }
    setArraySize(size);
  };

  // const changeIndex = (idx) => {
  //   setIndex(idx)
  // }

  // only called once for changing the arraySet 
  // after array is sorted by sort algo   ===== below both
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

  // change array state using arrayState array for visualization
  const changeArray = (i) => {
    const array_bars = document.getElementsByClassName('array-bar')
    let idx1 = cmpIndexes[i][0]
    let idx2 = cmpIndexes[i][1]
    // console.log(arrayStates[i], idx1, idx2)
    // console.log(idx2)
    
    if((idx2 !== -1) && arrayStates[i][idx1+1] > arrayStates[i][idx1])
      array_bars[idx1+1].style.backgroundColor = 'green'
    if(idx2 === -1 && arrayStates[i][idx1+1] < arrayStates[i][idx1]){
      console.log('red')
      if(array_bars[idx1+1])array_bars[idx1+1].style.backgroundColor = 'red'
    }
    if(idx2 !== -1 && array_bars[idx1]){
      if(i !== arrayStates.length-1)
        setComparisons(prev=>prev+1)
      array_bars[idx1].style.backgroundColor = 'blue'
    }
    if(array_bars[idx2])
      array_bars[idx2].style.backgroundColor = 'pink'
    if(idx2 === -1 || idx2 === -2){
      array_bars[idx1].style.backgroundColor = '#ffa154'
    }
    setTimeout(()=>{
      for(let i = 0; i < idx1-1; i++){
        array_bars[i].style.backgroundColor = 'green'
      }
      if(idx2 > 0)
        array_bars[idx2].style.backgroundColor = 'green'
    }, delayInterval-(delayInterval/2))

    setArray(arrayStates[i])
    if(i === arrayStates.length-1){
      setIsPlay(false)
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
    const array_bars = document.getElementsByClassName('array-bar')
    for(let i = 0; i < arraySize; i++){
      if(array_bars[i])
        array_bars[i].style.backgroundColor = 'red';
    }
  }

  const prevStep = () => {
    setIndex((prev)=>{
      if(prev - 1 >= 0)
        return prev - 1
      return prev
    });
    let idx1 = cmpIndexes[index][0] //-1
    let idx2 = cmpIndexes[index][1]  //-1
    const array_bars = document.getElementsByClassName('array-bar')
    if(idx2 !== -1 && array_bars[idx1])
      setComparisons(prev=>prev-2)
    changeArray(index)               //-1
    
    for(let i = 0; i <= idx2; i++){
      array_bars[i].style.backgroundColor = 'green'
    }
    let i;
    for(i = idx1+1; i+1 < array_bars.length && arrayStates[index][i] <= arrayStates[index][i+1]; i++){
      array_bars[i].style.backgroundColor = '#03f0fc'
    }
    //new
    if(arrayStates[index][i] > arrayStates[index][i-1]){
      array_bars[i].style.backgroundColor = '#03f0fc'
      i++;
    }
    for( ; i < array_bars.length; i++){
      array_bars[i].style.backgroundColor = 'red'
    }
    array_bars[idx1].style.backgroundColor = 'blue'
    if(array_bars[idx2])
      array_bars[idx2].style.backgroundColor = 'pink'
    setArray(arrayStates[index])
  }
  const nextStep = () => {
    setIndex((prev)=>{
      if(prev+1 < arrayStates.length)
        return prev+1
      return prev;
    })
    changeArray(index)
    let idx1 = cmpIndexes[index][0]
    let idx2 = cmpIndexes[index][1]
    const array_bars = document.getElementsByClassName('array-bar')
    for(let i = 0; i <= idx2; i++){
      array_bars[i].style.backgroundColor = 'green'
    }
    // new
    let i;
    for(i = idx1+1; i < array_bars.length && arrayStates[index][i] > arrayStates[index][i-1]; i++){
      array_bars[i].style.backgroundColor = '#03f0fc'
    }
    for( ; i < array_bars.length; i++){
      array_bars[i].style.backgroundColor = 'red'
    }
    // for(let i = idx1+1; i < array_bars.length; i++){
    //   array_bars[i].style.backgroundColor = '#03f0fc'
    // }
    array_bars[idx1].style.backgroundColor = 'blue'
    if(array_bars[idx2])
      array_bars[idx2].style.backgroundColor = 'pink'
    setArray(arrayStates[index])
    if(index === arrayStates.length-1){
      for(let i =0; i < array_bars.length; i++){
        array_bars[i].style.backgroundColor = 'green'
      }
    }
  }

  return (
    <AppContext.Provider 
      value={{
        array,
        isPlay,
        algo,
        arraySize,
        arrayStates,
        comparisons,
        swaps,
        delayInterval,
        setIsPlay,
        resetArray,
        changeArray,
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
