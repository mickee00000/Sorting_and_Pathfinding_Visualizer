let arraySet = [], compIndexes = []
let comparisons = 0

const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

/* This function is same in both iterative and recursive*/
const partition = (arr, l, h) => {
  let x = arr[h]
  let i = (l - 1)
  arraySet.push(arr.slice())
  compIndexes.push([l, h, 1])
  for (let j = l; j <= h-1; j++) {
    arraySet.push(arr.slice())
    compIndexes.push([l, h, 2, j, i]) // i causes error
    comparisons++
    if (arr[j] <= x) {
      i++;
      swap(arr, i, j);
      arraySet.push(arr.slice())
      compIndexes.push([l, h, 4, i, j])
    }
  }
  swap(arr, i+1, h)
  arraySet.push(arr.slice())
  compIndexes.push([l, h, 3, i+1, h])
  return (i + 1)
}

/* A[] --> Array to be sorted,
l --> Starting index,
h --> Ending index */
const quickSort = ({
    arrayStates,
    copyArray,
    changeArrayState,
    changeCompIndexes,
    analyzeTimeWithAlgo,
    analyzeTimeWithArraysize,
    setDiffAlgoTime,
    setDiffSizeTime
}) => {
    let arr = copyArray();
    let l = 0, h = arr.length - 1
    // Create an auxiliary stack
    let stack = [];
    comparisons = 0

    // initialize top of stack
    let top = -1;

    // push initial values of l and h to stack
    stack[++top] = l;
    stack[++top] = h;
    arraySet.push(arr.slice())
    compIndexes.push([l, h, 0])
    // let start = new Date().getTime()
    // Keep popping from stack while is not empty
    while (top >= 0) {
        // Pop h and l
        h = stack[top--];
        l = stack[top--];

        // Set pivot element at its correct position
        // in sorted array
        let p = partition(arr, l, h);

        // arraySet.push(arr.slice())
        // compIndexes.push([l, h, 5])
        
        // If there are elements on left side of pivot,
        // then push left side to stack
        if (p - 1 > l) {
            stack[++top] = l;
            stack[++top] = p - 1;
        }

        // If there are elements on right side of pivot,
        // then push right side to stack
        if (p + 1 < h) {
            stack[++top] = p + 1;
            stack[++top] = h;
        }
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
        return [...prev, {Algo: 'quick algo', Comparisons: comparisons}]
      })
    }
    arraySet.push(arr.slice())
    compIndexes.push([l, h, 5])
    // compIndexes.push([0, arr.length-1, 5])
    changeCompIndexes(compIndexes)
    changeArrayState(arraySet)
    arraySet = []
    compIndexes = []
}


const showVisualArrayQS = ({
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
  let idx4 = cmpIndexes[i][4]
  let operation = cmpIndexes[i][2]

  // unsorted array
  if(operation === 0){
    for(let i =0; i < array_bars.length; i++){
      array_bars[i].style.backgroundColor = 'red'
    }
    setComparisons(0)
  }
  // array position to be sorted, before that positin array is sorted
  // and after that sorted
  if(operation === 1){
    for(let i = idx1; i < idx2; i++){
      array_bars[i].style.backgroundColor = 'red'
    }
    array_bars[idx2].style.backgroundColor = '#f5cb42'
  }
  // for comparison of two array element
  if(operation === 2){
    setComparisons(prev=>prev+1)
    for(let i = idx4+1; i < idx2; i++){
      array_bars[i].style.backgroundColor = 'red'
    }
    for(let i = idx1; i <= idx4; i++){ // values less than pivot
      array_bars[i].style.backgroundColor = '#4287f5'
    }
    array_bars[idx2].style.backgroundColor = '#f5cb42'
    array_bars[idx3].style.backgroundColor = '#7ef542'
  }
  //when pivot reaches its correct position
  if(operation === 3){
    for(let i = idx1; i < idx2; i++){
      array_bars[i].style.backgroundColor = 'red'
    }
    for(let i = idx1; i <= idx3; i++){ // values less than pivot
      // array_bars[i].style.backgroundColor = '#4287f5'
      array_bars[i].style.backgroundColor = 'red'
    }
    // array_bars[idx2].style.backgroundColor = '#f5cb42'
    array_bars[idx2].style.backgroundColor = 'red'
    array_bars[idx3].style.backgroundColor = 'green'
    // array_bars[idx4].style.backgroundColor = '#42d7f5'
  }
  // 
  if(operation === 4){
    for(let i = idx1; i < idx2; i++){
      array_bars[i].style.backgroundColor = 'red'
    }
    for(let i = idx1; i <= idx3; i++){ // values less than pivot
      array_bars[i].style.backgroundColor = '#4287f5'
    }
    array_bars[idx2].style.backgroundColor = '#f5cb42'
    array_bars[idx3].style.backgroundColor = '#42d7f5'
    array_bars[idx4].style.backgroundColor = '#42d7f5'
  }

  // when l to h array is sorted
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

export {quickSort, showVisualArrayQS}