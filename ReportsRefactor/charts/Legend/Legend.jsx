import React, { PureComponent } from 'react';

class Legend extends PureComponent {
  static defaultProps = {
    valueFormatter: val => val,
    nameFormatter: val => val,
    type: 'Legend',
    sortFunc: (data, dataKey) => data.sort((a, b) => b[dataKey] - a[dataKey])
  }

  render() {
    const {
      data,
      nameFormatter,
      valueFormatter,
      sortFunc,
      nameKey,
      dataKey
    } = this.props;

    return (
      <div className='legend'>
        <table className='table'>
          <tbody>
            {
              sortFunc(data, dataKey).map((entry, index) => (
                <tr className='donut-chart-row' key={`item-${index}`}>
                  <td className='donut-chart-column'>
                    <svg className='legend-swatch color-icon-circle' width='10' height='10'>
                      <circle cx='5' cy='5' r='5' style={{ fill: entry.color }} />
                    </svg>
                    {nameFormatter(entry[nameKey])}
                  </td>
                  <td style={{textAlign: 'right'}} className='donut-chart-column'>
                    {valueFormatter(entry[dataKey])}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Legend;
