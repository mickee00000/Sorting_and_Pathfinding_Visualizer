import React from 'react';
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

import { useGlobalContext } from './context';


function ComplexityGraph() {
  const { diffAlgoTime,
        diffSizeTime,
        analyzeTimeWithAlgo,
        analyzeTimeWithArraysize,
        isAnalyzeTimeWithAlgo,
        isAnalyzeTimeWithArraysize, } = useGlobalContext()
  return (
      <div className='graph-container'>
        <div className="comm-design-btn">
          <button className='btn graph-btn' disabled={analyzeTimeWithArraysize} onClick={()=>{
            isAnalyzeTimeWithAlgo(!analyzeTimeWithAlgo)
            }}>
            analyze different algo time on same array
          </button>
        </div>
        {analyzeTimeWithAlgo &&
        <div className='line-chart-container'>
          <ResponsiveContainer className='responsive-container' width="100%" aspect={3}>
            <LineChart className='line-chart' data={diffAlgoTime}>
              <CartesianGrid />
              <XAxis dataKey="Algo" stroke="white"
                interval={'preserveStartEnd'} />
              <YAxis stroke="white"></YAxis>
              <Legend />
              <Tooltip />
              <Line dataKey="Comparisons"
                stroke="#49fc03" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      }
      <div className='comm-design-btn'>
        <button className='btn graph-btn' disabled={analyzeTimeWithAlgo} onClick={()=>{
          isAnalyzeTimeWithArraysize(!analyzeTimeWithArraysize)
          }}>
          analyze an algo time on different array sizes
        </button>
      </div>
      {analyzeTimeWithArraysize &&
        <div className='line-chart-container'>
          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart className='line-chart' data={diffSizeTime}>  
              <CartesianGrid />
              <XAxis dataKey="Size" 
                stroke="white"
                interval={'preserveStartEnd'} />
              <YAxis stroke="white"></YAxis>
              <Legend />
              <Tooltip stroke="#403727"/>
              <Line dataKey="Comparisons"
                stroke="green" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      }
      </div>
  )
}

export { ComplexityGraph }
