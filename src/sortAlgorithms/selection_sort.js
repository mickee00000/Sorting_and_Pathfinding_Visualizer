import { array_bars, copyArray } from "./array";
import { chosenBar, resetDelay } from "../animation";
const selectionSort = (modifyComparisons) => {
  resetDelay();
  let array = copyArray();

  let comparison = 0;

  for (let i = 0; i < array.length; i++) {
    chosenBar(array_bars[i], array[i], 'red');
    


    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      chosenBar(array_bars[j], array[j], 'red');
      comparison++;
      if (array[j] < array[minIndex]) {
        if (minIndex !== i) {
          chosenBar(array_bars[minIndex], array[minIndex], 'blue');
        }
        minIndex = j;
        chosenBar(array_bars[minIndex], array[minIndex], 'red', modifyComparisons,  comparison);
      }
      else {
        chosenBar(array_bars[j], array[j], 'blue', modifyComparisons, comparison);
      }
    }
      if (minIndex !== i) {
        var temp = array[minIndex];
        array[minIndex] = array[i];
        array[i] = temp;

        chosenBar(array_bars[minIndex], array[minIndex], "red");//Height update
        chosenBar(array_bars[i], array[i], "red");//Height update
        chosenBar(array_bars[minIndex], array[minIndex], "blue");//Color update
      }
      chosenBar(array_bars[i], array[i], "green");//Color update
    }
    // chosenBar(array_bars[i], array[i], "green");//Color update   

    // [array[i], array[minIndex]] = [array[minIndex], array[i]];

    console.log('work complete')
    for(let i = 0; i < array.length; i++){
      console.log(array[i]);
      
    }
  return array;

}


export { selectionSort };

