const insertionSort = ({ 
  arrayStates, 
  copyArray, 
  changeArrayState, 
  changeCompIndexes,
  analyzeTimeWithAlgo,
  analyzeTimeWithArraysize,
  setDiffAlgoTime,
  setDiffSizeTime
}) => {
  console.log('function called')
  // let start = new Date().getTime();

  let array = copyArray()
  let comparisons = 0;
  let arraySet = []
  let compIndex = []
  arraySet.push(array.slice())
  compIndex.push([0, 0, 0])

  for(let i = 1; i < array.length; i++){
    const temp = array[i]
    arraySet.push(array.slice()) //new line
    compIndex.push([i, -1, 1])       //new line
    let j = i
    comparisons++
    while(temp < array[j-1] && j > 0){
      comparisons++
      array[j] = array[j-1]
      array[j-1] = temp
      arraySet.push(array.slice())
      compIndex.push([j, j-1, 4, i])
      j--
    }
    array[j] = temp
    arraySet.push(array.slice())
    compIndex.push([j, i, 3])
  }

  // let end = new Date().getTime()
  // let time = end - start
  if(analyzeTimeWithArraysize){
    setDiffSizeTime((prev)=>{
      // return [...prev, {Size: array.length, Time: time}]
      return [...prev, {Size: array.length, Comparisons: comparisons}]
    })
  }
  if(analyzeTimeWithAlgo){
    setDiffAlgoTime((prev)=>{
      return [...prev, {Algo: 'insertion algo', Comparisons: comparisons}]
    })
  }
  arraySet.push(array.slice())
  compIndex.push([0, array.length-1, 5])
  changeCompIndexes(compIndex)
  changeArrayState(arraySet)
}

const showVisualArrayIS = ({
  i, 
  arrayStates,
  cmpIndexes, 
  setComparisons, 
  setArray, 
  setIsPlay
}) =>{
  const array_bars = document.getElementsByClassName('array-bar')
  let idx1 = cmpIndexes[i][0] 
  let idx2 = cmpIndexes[i][1]
  let operation = cmpIndexes[i][2]

  // unsorted array
  if(operation === 0){
    for(let i =0; i < array_bars.length; i++){
      setComparisons(0)
      array_bars[i].style.backgroundColor = 'red'
    }
  }
  // array position to be sorted, before that positin array is sorted
  // and after that sorted
  if(operation === 1){
    setComparisons(prev=>prev+1)
    for(let i = 0; i < idx1; i++){
      array_bars[i].style.backgroundColor = 'green'
    }
    array_bars[idx1].style.backgroundColor = '#f5cb42'
  }
  //for swapping of two elements
  if(operation === 3){
    for(let i = 0; i <= idx2; i++){
      if(i !== idx1)
        array_bars[i].style.backgroundColor = 'green'
      else
        array_bars[i].style.backgroundColor = '#f5cb42'
    }
  }
  // 
  if(operation === 4){
    setComparisons(prev=>prev+1)
    //array_bars[idx1].style.backgroundColor = 'pink'     // '#7ef542'
    // array_bars[idx3].style.backgroundColor = '#f5cb42'
    for(let i = 0; i < idx2; i++ ){
      if(i !== idx2 || i !== idx1)
        array_bars[i].style.backgroundColor = 'green'
      // else
      //   array_bars[idx1].style.backgroundColor = '#42d7f5'
      //   
    }
    array_bars[idx2].style.backgroundColor = 'pink'
    for(let i = idx1; i <= idx1; i++){
      // array_bars[i].style.backgroundColor = '#42d7f5'  // to change the color of shifted bars
      array_bars[i].style.backgroundColor = '#34eb95'
    }
  }
  if(operation === 5){
    for(let i = idx1; i <= idx2; i++){
      array_bars[i].style.backgroundColor = 'green';
    }
  }
  setArray(arrayStates[i])
  if(i === arrayStates.length-1){
    setIsPlay(false)
  }
}

export { insertionSort, showVisualArrayIS };