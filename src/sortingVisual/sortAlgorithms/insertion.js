const insertionSort = ({ 
  arrayStates, 
  copyArray, 
  changeArrayState, 
  changeCompIndexes 
}) => {
  console.log('function called')

  let array = copyArray()
  let arraySet = []
  let compIndex = []
  arraySet.push(array.slice())
  compIndex.push([0, 0])
  for(let i = 1; i < array.length; i++){
    const temp = array[i]
    arraySet.push(array.slice()) //new line
    compIndex.push([i, -1].slice())       //new line
    let j = i
    while(temp < array[j-1] && j > 0){
      array[j] = array[j-1]
      arraySet.push(array.slice())
      compIndex.push([j, j-1].slice())
      j--
    }
    array[j] = temp
    arraySet.push(array.slice())
    compIndex.push([j, -2])
  }
  changeCompIndexes(compIndex)
  changeArrayState(arraySet)
  // console.log('print')
  // for(let i = 0; i < arraySet.length; i++){
  //   console.log(arraySet[i])
  //   console.log(arrayStates[i]);
  // }
  console.log('finish', arrayStates.length);
}

const insertionVisual = ({
  isPlay,
  index,
  cmpIndexes,
  arrayStates,
  setIndex,
  delayInterval,
  setIsPlay,
  changeArray
}) => {
    setIsPlay(true);
    const array_bars = document.getElementsByClassName('array-bar');
    let delay = 0;
    console.log(arrayStates.length)
    for(let i = index+1; i < arrayStates.length; i++){
      if(isPlay){
        setTimeout(()=>{
          setIndex(i)
          changeArray(i)
        }, delay += delayInterval)
      }else{
        break
      }
    }
    // const array_bars = document.getElementsByClassName('array-bar')
    for(let i = 0; i < array_bars.length; i++){  
      setTimeout(()=>{
        array_bars[i].style.backgroundColor = 'green'
      }, delay+=delayInterval)
    } 
  }

export { insertionSort, insertionVisual };
