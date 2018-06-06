import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import rowExpander from './rowExpander';

export class Row extends PureComponent {
  static defaultProps = {
    formatter: ({ value }) => value,
    columns: [],
    rowData: {},
    type: 'TableRow'
  }

  static propTypes = {
    rowData: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    formatter: PropTypes.func
  }

  renderCells = () => {
    const {
      rowData,
      columns,
      formatter
    } = this.props;
    return columns.map((k, i) => {
      const value = formatter({
        columnKey: k,
        value: rowData[k]
      });
      return (
        <td key={`${ k }-${ i }-${ rowData[k] }`}><span>{ value }</span></td>
      );
    });
  }
  render() {
    const cells = this.renderCells();
    const {
      handleClick
    } = this.props;
    return (
      <tr className='basic-row' onClick={handleClick}>
        {cells}
      </tr>
    );
  }
}


export default rowExpander(Row);
