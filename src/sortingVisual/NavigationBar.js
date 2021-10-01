import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Select, MenuItem } from '@material-ui/core';
import { useGlobalContext } from './context';
import { ArrayHandler } from './ArrayHandler';
import './NavigationBar.css';

function NavigationBar() {
  const { algo, setAlgo } = useGlobalContext();
  const updateAlgo = (e) => {
    setAlgo(e.target.value)
  }
  return (
    <nav>
      <div className='nav-center'>
        <button className='nav-toggle'>
          <FaBars/>
        </button>
      </div>
      <ArrayHandler/>
      <div className='select-algo'>
        <Select
          value={algo}
          onChange={updateAlgo}
        >
          <MenuItem value={1}>
            Insertion Sort
          </MenuItem>
          <MenuItem value={2}>
            Bubble Sort
          </MenuItem>
          <MenuItem value={3}>
            Bubble Sort
          </MenuItem>
          <MenuItem value={4}>
            Merge Sort
          </MenuItem>
          <MenuItem value={5}>
            Quick Sort
          </MenuItem>
          <MenuItem value={6}>
            Heap Sort
          </MenuItem>
        </Select>
      </div>
    </nav>
  )
}

export { NavigationBar }
