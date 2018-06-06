import React from 'react';
import { Sector } from 'recharts';
const DonutActiveShape = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill
}) => (
  <Sector
    cx={cx}
    cy={cy}
    innerRadius={innerRadius}
    outerRadius={outerRadius + (outerRadius * 0.05) }
    startAngle={startAngle}
    endAngle={endAngle}
    fill={fill}
  />
);

export default DonutActiveShape;
