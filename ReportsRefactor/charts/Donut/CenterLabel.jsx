import React from 'react';

const CenterLabel = ({
  value,
  color,
  subText,
  viewBox: {
    cx,
    cy
  }
}) => (
  <g>
    <text x={cx} y={subText ? cy - (cy * 0.05) : cy} fontSize="40px" fill={color} textAnchor={'middle'} dominantBaseline="central" key={'test'}>
      <tspan>{value}</tspan>
      <tspan fontSize="14px" x={cx} dy="2.4em">{subText}</tspan>
    </text>
  </g>
);
CenterLabel.defaultProps = {
  color: '#000000'
};
export default CenterLabel;
