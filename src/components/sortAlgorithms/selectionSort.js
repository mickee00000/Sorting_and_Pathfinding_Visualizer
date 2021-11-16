const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const selectionSort = ({
  arrayStates,
  copyArray,
  changeArrayState,
  changeCompIndexes,
  analyzeTimeWithAlgo,
  analyzeTimeWithArraysize,
  setDiffAlgoTime,
  setDiffSizeTime,
}) =>{
  let arr = copyArray();
  let comparisons = 0
  let arraySet = []
  let compIndexes = []
  arraySet.push(arr.slice())
  compIndexes.push([-1, -1, 0])

  // let start = new Date().getTime()
  let i, j, min_idx, n = arr.length;
  for (i = 0; i < n-1; i++){
    arraySet.push(arr.slice())
    compIndexes.push([i, -1, 1])
    min_idx = i;
    for (j = i+1; j < n; j++){
      arraySet.push(arr.slice())
      compIndexes.push([min_idx, j, 4, i])
      comparisons++
      if (arr[j] < arr[min_idx]){
        // comparisons++
        min_idx = j;
        swap(arr, min_idx, j);
        arraySet.push(arr.slice())
        compIndexes.push([j, min_idx, 2])
      }
    }
    swap(arr, min_idx,i);
    arraySet.push(arr.slice())
    compIndexes.push([i, min_idx, 3])
  }
  // let end = new Date().getTime()
  // let time = end - start
  if(analyzeTimeWithArraysize){
    setDiffSizeTime((prev)=>{
      return [...prev, {Size: arr.length, Comparisons: comparisons}]
    })
  }
  if(analyzeTimeWithAlgo){
    setDiffAlgoTime((prev)=>{
      return [...prev, {Algo: 'selection algo', Comparisons: comparisons}]
    })
  }

  changeCompIndexes(compIndexes)
  changeArrayState(arraySet)
}

// the improved trial for selection sort
const showVisualArraySS = ({
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
  let idx3 = cmpIndexes[i][3]
  let operation = cmpIndexes[i][2]

  // unsorted array
  if(operation === 0){
    setComparisons(0)
    for(let i =0; i < array_bars.length; i++){
      array_bars[i].style.backgroundColor = 'red'
    }
  }
  // array position to be sorted, before that positin array is sorted
  // and after that sorted
  if(operation === 1){
    for(let i = 0; i < idx1; i++){
      array_bars[i].style.backgroundColor = 'green'
    }
    array_bars[idx1].style.backgroundColor = '#f5cb42'
  }
  // for comparison of last
  if(operation === 2){
    // setComparisons(prev=>prev+1)
    // after swapping color them with blue
    array_bars[idx1].style.backgroundColor = '#42d7f5'
    array_bars[idx2].style.backgroundColor = '#42d7f5'
    if(idx2 !== array_bars.length-1) 
      array_bars[array_bars.length-1].style.backgroundColor = 'red'
  }
  //for swapping of two elements
  if(operation === 3){
    // after swapping color them with blue
    array_bars[idx1].style.backgroundColor = '#42d7f5'
    array_bars[idx2].style.backgroundColor = '#42d7f5'
    if(idx2 !== array_bars.length-1) 
      array_bars[array_bars.length-1].style.backgroundColor = 'red'
  }
  // 
  if(operation === 4){
    setComparisons(prev=>prev+1)
    //array_bars[idx1].style.backgroundColor = 'pink'     // '#7ef542'
    array_bars[idx3].style.backgroundColor = '#f5cb42'
    for(let i = idx3+1; i < array_bars.length; i++ ){
      if(i !== idx2)
        array_bars[i].style.backgroundColor = 'red'
      else
        array_bars[idx2].style.backgroundColor = '#7ef542'
        array_bars[idx1].style.backgroundColor = 'pink'
    }
  }
  setArray(arrayStates[i])
  if(i === arrayStates.length-1){
    setIsPlay(false)
  }
}

export {selectionSort, showVisualArraySS }