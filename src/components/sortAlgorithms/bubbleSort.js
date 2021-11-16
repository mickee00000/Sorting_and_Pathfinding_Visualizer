const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const bubbleSort = ({
  arrayStates,
  copyArray,
  changeArrayState,
  changeCompIndexes,
  analyzeTimeWithAlgo,
  analyzeTimeWithArraysize,
  setDiffAlgoTime,
  setDiffSizeTime
}) =>{
  let arr = copyArray();
  let comparisons = 0
  let arraySet = []
  let compIndexes = []
  arraySet.push(arr.slice())
  compIndexes.push([-1, -1, 0])

  // let start = new Date().getTime()
  let n = arr.length;
  for(let i = 0; i < n; i++){
    for(let j = 0; j < n-i; j++){
      arraySet.push(arr.slice())
      compIndexes.push([j, j+1, 2, n-i])
      comparisons++
      if(arr[j] > arr[j+1]){
        // comparisons++
        swap(arr, j, j+1)
        arraySet.push(arr.slice())
        compIndexes.push([j, j+1, 3, n-i])
      }
    }
    arraySet.push(arr.slice())
    compIndexes.push([n-i-1, -1, 4])
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
      return [...prev, {Algo: 'bubble sort', Comparisons: comparisons}]
    })
  }
  changeCompIndexes(compIndexes)
  changeArrayState(arraySet)
}

const showVisualArrayBS = ({
  i, 
  arrayStates,
  cmpIndexes, 
  setComparisons, 
  setArray, 
  setIsPlay
}) =>{
  const array_bars = document.getElementsByClassName('array-bar')
  let idx1 = cmpIndexes[i][0] 
  let idx3 = cmpIndexes[i][3]
  let idx2 = cmpIndexes[i][1]
  let operation = cmpIndexes[i][2]

  // unsorted array
  if(operation === 0){
    setComparisons(0)
    for(let i =0; i < array_bars.length; i++){
      array_bars[i].style.backgroundColor = 'red'
    }
  }
  // comparison
  if(operation === 2){
    setComparisons(prev=>prev+1)
    for(let i = idx3; i < array_bars.length; i++){
      array_bars[i].style.backgroundColor = 'green'
    }
    for(let i = 0; i < idx3-1; i++){
      if(i !== idx1 && i !== idx2)
        array_bars[i].style.backgroundColor = 'red'
      else
        array_bars[i].style.backgroundColor = 'pink'
    }
  }
  //for swapping of two elements
  if(operation === 3){
    for(let i = idx3; i < array_bars.length; i++){
      array_bars[i].style.backgroundColor = 'green'
    }
    for(let i = 0; i < idx3-1; i++){
      if(i !== idx1 && i !== idx2)
        array_bars[i].style.backgroundColor = 'red'
      else
        array_bars[i].style.backgroundColor = '#42d7f5'
    }
  }

  // 
  if(operation === 4){
    // setComparisons(prev=>prev+1)
    array_bars[idx1].style.backgroundColor = 'yellow'
    for(let i = idx1+1; i < array_bars.length; i++ ){
      array_bars[i].style.backgroundColor = 'green'
    }
    for(let i = 0; i < idx1; i++){
      array_bars[i].style.backgroundColor = 'red'
    }
  }
  setArray(arrayStates[i])
  if(i === arrayStates.length-1){
    setIsPlay(false)
  }
}

export { bubbleSort, showVisualArrayBS }