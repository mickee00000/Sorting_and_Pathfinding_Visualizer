let arrSet = [], compIndexes = []
let comparisons = 0
const merge = (arr, l, m, r) => {
    let k;
    let n1 = m - l + 1;
    let n2 =  r - m;
    let L = [], R = [];
    for(let i = 0; i < n1; i++)
      L.push(arr[l + i])
    for(let j = 0; j < n2; j++)
      R.push(arr[m + 1+ j])
    let i = 0;
    let j = 0;
    k = l;
    while (i < n1 && j < n2)
    { 
      comparisons++
      arrSet.push(arr.slice())
      compIndexes.push([i, j, 2, l, r])
      if (L[i] <= R[j])
      {
        arr[k] = L[i];
        i++;
      }
      else
      {
        arr[k] = R[j];
        j++;
      }
      k++;
    }
    while (i < n1)
    {
      arr[k] = L[i];
      i++;
      k++;
    }
    while (j < n2)
    {
      arr[k] = R[j];
      j++;
      k++;
    }
    arrSet.push(arr.slice())
    compIndexes.push([l, r, 3])
}
const min = (a, b) => {
    if(a <= b){
      return a
    }else{
      return b
    }
}
/* l is for left index and r is right index of the
   sub-array of arr to be sorted */
const mergeSort = ({
    arrayStates,
    copyArray,
    changeArrayState,
    changeCompIndexes,
    analyzeTimeWithAlgo,
    analyzeTimeWithArraysize,
    setDiffAlgoTime,
    setDiffSizeTime
}) =>{
    arrSet = [] 
    compIndexes = []
    let arr = copyArray()
    let n = arr.length
    let curr_size;
    let left_start;
    arrSet.push(arr.slice())
    compIndexes.push([-1, -1, 0])
    // let start = new Date().getTime()
    for (curr_size=1; curr_size<=n-1; curr_size = 2*curr_size)
    {
        for (left_start=0; left_start<n-1; left_start += 2*curr_size){
            let mid = min(left_start + curr_size - 1, n-1);
            let right_end = min(left_start + 2*curr_size - 1, n-1);
            arrSet.push(arr.slice())
            compIndexes.push([left_start, right_end, 1, mid])
           // Merge Subarrays arr[left_start...mid] & arr[mid+1...right_end]
            merge(arr, left_start, mid, right_end);
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
        return [...prev, {Algo: 'merge algo', Comparisons: comparisons}]
      })
    }
    changeCompIndexes(compIndexes)
    changeArrayState(arrSet)
}

const showVisualArrayMS = ({
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
    setComparisons(0)
    for(let i =0; i < array_bars.length; i++){
      array_bars[i].style.backgroundColor = 'red'
    }
  }
  // array position to be sorted, before that positin array is sorted
  // and after that sorted
  if(operation === 1){
    for(let i = idx1; i <= idx2; i++){
      array_bars[i].style.backgroundColor = 'red'
    }
    if(array_bars[idx4]) array_bars[idx4].style.backgroundColor = '#f5cb42'
  }
  // for comparison of two array element
  if(operation === 2){
    setComparisons(prev=>prev+1)
    for(let i = idx3; i <= idx4; i++){
      array_bars[i].style.backgroundColor = 'red'
    }
    // for(let i = idx1; i <= idx4; i++){ // values less than pivot
    //   array_bars[i].style.backgroundColor = '#4287f5'
    // }
    array_bars[idx1].style.backgroundColor = '#7ef542'
    array_bars[idx2].style.backgroundColor = '#7ef542'
  }
  // if(operation === 2){
  //   setComparisons(prev=>prev+1)
  //   for(let i = idx4+1; i < idx2; i++){
  //     array_bars[i].style.backgroundColor = 'red'
  //   }
  //   for(let i = idx1; i <= idx4; i++){ // values less than pivot
  //     array_bars[i].style.backgroundColor = '#4287f5'
  //   }
  //   array_bars[idx2].style.backgroundColor = '#f5cb42'
  //   array_bars[idx3].style.backgroundColor = '#7ef542'
  // }
  //when pivot reaces its correct position
  if(operation === 3){
    for(let i = idx1; i <= idx2; i++){
      array_bars[i].style.backgroundColor = 'green'
    }
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

export { mergeSort, showVisualArrayMS }