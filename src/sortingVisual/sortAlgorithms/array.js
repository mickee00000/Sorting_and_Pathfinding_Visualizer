export const createRandomArray = (size) => {
  const arr = [];
  for(let i = 0; i < size; i++){
    var num = Math.floor(Math.random() * 300) + 1;
    arr.push(num);
  }
  return arr;
};
