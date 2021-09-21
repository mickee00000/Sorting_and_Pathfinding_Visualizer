export const createRandomArray = (size) => {
    const arr = [];
    for(let i = 0; i < size; i++){
      var num = Math.floor(Math.random() * 100) + 1;
      arr.push(num);
    }
    return arr;
  };
  
  // function range(start, end){
  //   let arr = [];
  //   for(let i = start; i <= end; i++){
  //     arr.push({value:i, label:`s:${i}`});
  //   }
  //   return arr;
  // }
  
  // export const speedValues = range(0.5, 2.0);