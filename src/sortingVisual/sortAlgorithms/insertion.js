import { array_bars, copyArray } from "./array";
import { resetDelay, chosenBar, sortedBar, swapBar, unsortedBar } from "../animation";

const insertionSort = () => {
  // reset dealy each time calling a sort algo because
  // if it's value too high than we have to wait alot
  resetDelay();

  // copy array and creating dom object of array
  let arr = copyArray();
  
  for(let i = 1; i < arr.length; i++){
    // const arrBar1 = ;
    chosenBar(array_bars[i], arr[i]);

    console.log('after one second');
    const temp = arr[i];
    let j = i;
    // let x = 0;
    while(temp < arr[j-1] && j > 0){
      swapBar(array_bars[j], arr[j]);
      swapBar(array_bars[j-1], arr[j-1]);

      arr[j] = arr[j-1];

      swapBar(array_bars[j], arr[j]);
      swapBar(array_bars[j-1], arr[j-1]);

      // if(j-1 == i){
      //   chosenBar(array_bars[j], arr[j]);
      // }else{
      //   sortedBar(array_bars[j], arr[j]);
      // }
      j--;
      // x++;
      // if(x > 20){break;}
    }
    arr[j] = temp;
    for(let x = 0; x < i; x++){
      sortedBar(array_bars[x], arr[x]);
    }
  }
  console.log('work finished');
  for(let i = 0; i < arr.length; i++){
    sortedBar(array_bars[i], arr[i]);
    console.log(arr[i]);
    console.log(array_bars[i]);
  }
}

export { insertionSort };