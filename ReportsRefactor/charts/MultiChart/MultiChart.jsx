import {
  ComposedChart,
  ResponsiveContainer,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import React, { Component } from 'react';
import moment from 'moment';
import CustomTooltip from '../Tooltip';
const Tick = (props) => {
  const { x, y, payload } = props;
	return (
  	<text  x={x} y={y + 4} textAnchor="middle" dominantBaseline="hanging">
      <tspan fontSize='12'>{moment(payload.value).format('DD')}</tspan>
      <tspan fontSize='12'  x={x} y={y + 15}>{moment(payload.value).format('MMM').toUpperCase()}</tspan>
    </text>
  );
}

class BarLineChart extends Component {

  formatter = (prop) => (val) => {
    const formatter = this.props[prop];
    if (!formatter) {
      return val;
    }
    return formatter(val);
  }

  label = prop => {
    const label = this.props[prop];
    if (!label) {
      return null;
    }
    return label
  }

  render() {
    const {
      data,
      barKey,
      barColor,
      lineKey,
      lineColor,
      xAxisKey
    } = this.props;
    return (
      <ResponsiveContainer >
      <ComposedChart data={data} >
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid vertical={false} stroke='#f5f5f5' />
        <Bar formatter={ this.formatter('rightAxisFormat') } name={ this.label('barLabel') } isAnimationActive={false} yAxisId='right' dataKey={barKey} barSize={20} fill={barColor} />
        <Line formatter={ this.formatter('leftAxisFormat') } name={ this.label('lineLabel') } animationDuration={100} connectNulls={true} yAxisId='left' legendType={'circle'} dot={false} strokeWidth={5} dataKey={lineKey} stroke={lineColor} />
        <XAxis tickFormatter={ this.formatter('xAxisFormat') } height={50} tick={Tick} tickLine={false} tickCount={9} dataKey={xAxisKey} />
        <YAxis tickFormatter={ this.formatter('leftAxisFormat') } tickCount={7} tickLine={false} axisLine={false} yAxisId='left' />
        <YAxis tickFormatter={ this.formatter('rightAxisFormat') } tickCount={7} tickLine={false} axisLine={false} yAxisId='right' orientation='right' />
     </ComposedChart>
     </ResponsiveContainer>
   );
  }
}

export default BarLineChart;
