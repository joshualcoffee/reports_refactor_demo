import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import CustomTooltip from '../Tooltip/DonutTooltip';
import ActiveShape from './ActiveShape';
const DonutChart = ({
  data,
  dataKey,
  nameKey,
  innerRadius,
  outerRadius,
  children,
  mouseOut,
  mouseOver,
  activeIndex,
  width,
  height
}) => (
  <div className='chart' style={{width: width, height: height, margin: '0 auto'}} >
    <ResponsiveContainer>
    <PieChart width={width} height={height}>
      <Tooltip
        data={data}
        dataKey={dataKey}
        nameKey={nameKey}
        content={<CustomTooltip />}
        activeIndex={activeIndex}
        wrapperStyle={{ visibility: 'visible' }}
      />
      {children}
      <Pie
        dataKey={dataKey}
        nameKey={nameKey}
        activeIndex={activeIndex}
        activeShape={ActiveShape}
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
        data={data}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        isAnimationActive={false}
      >
        {children}
        {
          data.map((entry, index) => <Cell key={index} fill={entry.color}/>)
        }
      </Pie>
     </PieChart>
     </ResponsiveContainer>
  </div>
);

DonutChart.defaultProps = {
  innerRadius: '60%',
  outerRadius: '75%',
  type: 'DonutChart',
  width: 200,
  height: 200
};

export default DonutChart;
