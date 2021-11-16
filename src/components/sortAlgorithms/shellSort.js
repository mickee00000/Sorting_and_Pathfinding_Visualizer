const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const shellSort = ({
  arrayStates,
  copyArray,
  changeArrayState,
  changeCompIndexes
}) =>{
  let arr = copyArray();
  let arraySet = []
  let compIndexes = []
  arraySet.push(arr.slice())
  compIndexes.push([-1, -1, 0])

  let n = arr.length;
  for (let gap = n/2; gap > 0; gap /= 2){
    for (let i = gap; i < n; i++){        
      for (let j = i-gap; j >= 0; j -= gap){
        arraySet.push(arr.slice())
        compIndexes.push([-1, -1, 0])
        if(arr[j+gap] > arr[j])
          break;
        else
          swap(arr, j+gap, j)
        arraySet.push(arr.slice())
        compIndexes.push([-1, -1, 0])
      }
    }
    arraySet.push(arr.slice())
    compIndexes.push([-1, -1, 0])
  }
  arraySet.push(arr.slice())
  compIndexes.push([-1, -1, 0])
  for(let i = 0; i < n; i++){
    console.log(arr[i])
  }
  changeCompIndexes(compIndexes)
  changeArrayState(arraySet)
}


const showVisualArrayShS = ({
  i, 
  arrayStates,
  cmpIndexes, 
  setComparisons, 
  setArray, 
  setIsPlay
}) =>{
  // let i = index
  // console.log(i)
  const array_bars = document.getElementsByClassName('array-bar')
  let idx1 = cmpIndexes[i][0] 
  let idx2 = cmpIndexes[i][1]
  let idx3 = cmpIndexes[i][3]
  let operation = cmpIndexes[i][2]

  // unsorted array
  if(operation === 0){
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
  // for comparison of two array element
  if(operation === 2){
    array_bars[idx1].style.backgroundColor = ''     // '#7ef542'
    array_bars[idx2].style.backgroundColor = '#7ef542'
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

export { shellSort, showVisualArrayShS }


// let arrSet = [], compIndexes = []
// const merge = (arr, start, mid, end) => {
//     let start2 = mid + 1;
//     if (arr[mid] <= arr[start2]) {
//       return;
//     }
//     // Two pointers to maintain start
//     // of both arrays to merge
//     while (start <= mid && start2 <= end) {
//         arrSet.push(arr.slice())
//         compIndexes.push([start, start2, 2, mid])
//         // If element 1 is in right place
//         if (arr[start] <= arr[start2]) {
//           start++;
//         }
//         else {
//             let value = arr[start2];
//             let index = start2;
//             // Shift all the elements between element 1
//             // element 2, right by 1.
//             while (index !== start) {
//                 arrSet.push(arr.slice())
//                 compIndexes.push([start, mid, 3, start2])
//                 arr[index] = arr[index - 1];
//                 arrSet.push(arr.slice())
//                 compIndexes.push([start, mid, 3, start2])
//                 index--;
//             }
//             arr[start] = value;
//             arrSet.push(arr.slice())
//             compIndexes.push([start, start2, 2, mid])
//             // Update all the pointers
//             start++;
//             mid++;
//             start2++;
//         }
//     }
// }
// const min = (a, b) => {
//     if(a <= b){
//         return a
//     }else{
//         return b
//     }
// }
// /* l is for left index and r is right index of the
//    sub-array of arr to be sorted */
// const mergeSort = ({
//     arrayStates,
//     copyArray,
//     changeArrayState,
//     changeCompIndexes,
//     analyzeTimeWithAlgo,
//     analyzeTimeWithArraysize,
//     setDiffAlgoTime,
//     setDiffSizeTime
// }) =>{
//     arrSet = [] 
//     compIndexes = []
//     let arr = copyArray()
//     let n = arr.length
//     let curr_size;
//     let left_start;
//     arrSet.push(arr.slice())
//     compIndexes.push([-1, -1, 0])
//     let start = new Date().getTime()
//     for (curr_size=1; curr_size<=n-1; curr_size = 2*curr_size)
//     {
//         for (left_start=0; left_start<n-1; left_start += 2*curr_size){
//             let mid = min(left_start + curr_size - 1, n-1);
//             let right_end = min(left_start + 2*curr_size - 1, n-1);
//             arrSet.push(arr.slice())
//             compIndexes.push([left_start, right_end, 1, mid])
//            // Merge Subarrays arr[left_start...mid] & arr[mid+1...right_end]
//             merge(arr, left_start, mid, right_end);
//         }
//     }
//     let end = new Date().getTime()
//     let time = end - start
//     if(analyzeTimeWithArraysize){
//       setDiffSizeTime((prev)=>{
//         console.log('added size time', time)
//         return [...prev, {Size: arr.length, Time: time}]
//       })
//     }
//     if(analyzeTimeWithAlgo){
//       setDiffAlgoTime((prev)=>{
//         console.log('aded algo time', time)
//         return [...prev, {Algo: 'merge algo', Time: time}]
//       })
//     }
//     changeCompIndexes(compIndexes)
//     changeArrayState(arrSet)
// }


// const showVisualArrayMS = ({
//   i, 
//   arrayStates,
//   cmpIndexes, 
//   setComparisons, 
//   setArray, 
//   setIsPlay
// }) =>{
//   const array_bars = document.getElementsByClassName('array-bar')
//   let idx1 = cmpIndexes[i][0] 
//   let idx2 = cmpIndexes[i][1]
//   let idx3 = cmpIndexes[i][3]
//   let idx4 = cmpIndexes[i][4]
//   let operation = cmpIndexes[i][2]

//   // unsorted array
//   if(operation === 0){
//     for(let i =0; i < array_bars.length; i++){
//       array_bars[i].style.backgroundColor = 'red'
//     }
//   }
//   // array position to be sorted, before that positin array is sorted
//   // and after that sorted
//   if(operation === 1){
//     for(let i = idx1; i <= idx2; i++){
//       array_bars[i].style.backgroundColor = 'red'
//     }
//     if(array_bars[idx4]) array_bars[idx4].style.backgroundColor = '#f5cb42'
//   }
//   // for comparison of two array element
//   if(operation === 2){
//     setComparisons(prev=>prev+1)
//     for(let i = idx4+1; i < idx2; i++){
//       array_bars[i].style.backgroundColor = 'red'
//     }
//     for(let i = idx1; i <= idx4; i++){ // values less than pivot
//       array_bars[i].style.backgroundColor = '#4287f5'
//     }
//     array_bars[idx2].style.backgroundColor = '#f5cb42'
//     array_bars[idx3].style.backgroundColor = '#7ef542'
//   }
//   //when pivot reaces its correct position
//   if(operation === 3){
//     for(let i = idx1; i < idx2; i++){
//       array_bars[i].style.backgroundColor = 'red'
//     }
//     for(let i = idx1; i <= idx3; i++){ // values less than pivot
//       array_bars[i].style.backgroundColor = '#4287f5'
//     }
//     array_bars[idx2].style.backgroundColor = '#f5cb42'
//     array_bars[idx3].style.backgroundColor = 'green'
//     if(array_bars[idx4]) array_bars[idx4].style.backgroundColor = '#42d7f5'
//   }
//   // 
//   if(operation === 4){
//     for(let i = idx1; i < idx2; i++){
//       array_bars[i].style.backgroundColor = 'red'
//     }
//     for(let i = idx1; i <= idx3; i++){ // values less than pivot
//       array_bars[i].style.backgroundColor = '#4287f5'
//     }
//     array_bars[idx2].style.backgroundColor = '#f5cb42'
//     array_bars[idx3].style.backgroundColor = '#42d7f5'
//     array_bars[idx4].style.backgroundColor = '#42d7f5'
//   }

//   // when l to h array is sorted
//   if(operation === 5){
//     for(let i = idx1; i <= idx2; i++){
//       array_bars[i].style.backgroundColor = 'green';
//     }
//   }
//   setArray(arrayStates[i])
//   if(i === arrayStates.length-1){
//     setIsPlay(false)
//   }
// }

// export { mergeSort, showVisualArrayMS }