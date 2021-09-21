import React, {useState, useContext } from 'react';
import { createRandomArray } from './array';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [arraySize, setArraySize] = useState(20);
  const [array, setArray] = useState([]);
  // const [comparisons, setComparisons] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [delay, setDelay] = useState(0);
  const [delayInterval, setDelayInterval] = useState(1);
  // const [isPause, setIsPause] = useState(false);
  // const [isnext, setIsNext] = useState(0);
  // const [isPrevious, setIsPrevious] = useState(0);

  const changeSize = (size) =>{
    console.log('size');
    if(size < 5){
      size = 5;
    }
    if(size > 100){
      size = 100;
    }
    setArraySize(size);
  };
  const changeArray = (size) => {
    let arr = createRandomArray(size);
    setArray(arr);
  };
  const resetDealy = () => {
    setDelay(0);
  };
  const changeSpeed = (e, s) => {
    const delayInt = 200 / (s*arraySize);
    setDelayInterval(delayInt);
    setSpeed(s);
  }

  return (
    <AppContext.Provider 
      value={{
        array,
        arraySize,
        speed,
        delay,
        delayInterval,
        changeArray,
        changeSize,
        changeSpeed,
        resetDealy
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