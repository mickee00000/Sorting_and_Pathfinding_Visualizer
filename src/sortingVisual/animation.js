// const array_bars = [];

// let speed = 1;
let delay_time = 50;
let c_delay = 0;

const resetDelay = () => {
  c_delay = 0;
}

function chosenBar(bar, height){
  setTimeout(function() {
    bar.classList.remove('sorted-bar')
    bar.classList.add('chosen-bar');
    bar.style.height = `${height}px`;
    console.log("change or not");
  }, c_delay+=delay_time);
}

function sortedBar(bar, height){
  setTimeout(function() {
    bar.classList.remove('chosen-bar');
    bar.classList.add('sorted-bar');
    bar.style.height = `${height}px`;
    console.log("change or not");
  }, c_delay+=delay_time);
}

function unsortedBar(bar, height){
  setTimeout(function() {
    bar.classList.add('unsorted-bar');
    bar.style.height = `${height}px`;
    console.log("change or not");
  }, c_delay+=delay_time);
}

function swapBar(bar, height){
  setTimeout(function() {
    bar.classList.add('swap-bar');
    bar.style.height = `${height}px`;
    console.log("change or not");
  }, c_delay+=delay_time);
}

export {c_delay, resetDelay, chosenBar, sortedBar, swapBar, unsortedBar};