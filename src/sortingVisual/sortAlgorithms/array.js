
// global array used by all over app
let array=[];
let array_bars = [];

// copy the array of ArrayChart component to use for sorting
const copyArray = () => {
  let arr = [], idx;
  for(idx in array){
    arr.push(array[idx]);
    let array_bar = document.getElementById(`div-${idx}`);
    console.log('chane color');
    array_bar.classList.remove('sorted-bar', 'unsorted-bar', 'swap-bar', 'chosen-bar');
    array_bar.classList.add('array-bar');
    array_bars[idx] = array_bar;
    // array_bars.push(array_bar);
  }
  console.log(arr);
  return arr;
}

// generates new random array
const genrateRandomArray = () => {
  array = [];
  let unsortedArray = [];
    for (let i = 0; i < 10; i++) {
      unsortedArray.push(Math.floor(Math.random() * 300 + 1));
      array.push(unsortedArray[i]);
    }
    return unsortedArray;
};

export { array, array_bars, copyArray, genrateRandomArray};
