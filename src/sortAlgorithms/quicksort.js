import { array_bars, copyArray } from "./array";
import { chosenBar, resetDelay } from "../animation";


function quick_partition (array, start, end,modifyComparisons)
{
    var i = start + 1;
    let comparison = 0;
    var piv = array[start] ;//make the first element as pivot element.
    
    chosenBar(array_bars[start],array[start],"yellow");//Color update

        for(var j =start + 1; j <= end ; j++ )
        {
            comparison++;
            //re-arrange the array by putting elements which are less than pivot on one side and which are greater that on other.
            if (array[ j ] < piv)
            {
                chosenBar(array_bars[j],array[j],"yellow");//Color update

                chosenBar(array_bars[i],array[i],"red");//Color update
                chosenBar(array_bars[j],array[j],'red',modifyComparisons, comparison);//Color update

                var temp=array[i];
                array[i]=array[j];
                array[j]=temp;

                chosenBar(array_bars[i],array[i],"red");//Height update
                chosenBar(array_bars[j],array[j],"red");//Height update

                chosenBar(array_bars[i],array[i],"blue");//Height update
                chosenBar(array_bars[j],array[j],"blue");//Height update

                i += 1;
            }
    }
    chosenBar(array_bars[start],array[start],"red");//Color update
    chosenBar(array_bars[i-1],array[i-1],"red");//Color update
    
    temp=array[start];//put the pivot element in its proper place.
    array[start]=array[i-1];
    array[i-1]=temp;

    chosenBar(array_bars[start],array[start],"red");//Height update
    chosenBar(array_bars[i-1],array[i-1],"red");//Height update

    for(var t=start;t<=i;t++)
    {
        chosenBar(array_bars[t],array[t],"black");//Color update
    }

    return i-1;//return the position of the pivot
}

const quickSort = (array, start, end) => {
if( start < end )
    {
        //stores the position of pivot element
        var piv_pos = quick_partition (array, start, end ) ;     
        quickSort (array, start, piv_pos -1);//sorts the left side of pivot.
        quickSort(array, piv_pos +1, end) ;//sorts the right side of pivot.
    }
};



function quick_sort(){
    // console.log("yes");
    resetDelay();
   
    let array = copyArray();
    
    quickSort(array, 0, array.length)
}





export { quick_sort }
