import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import rowExpander from './rowExpander';
import classnames from 'classnames';
export class TableHeader extends PureComponent {
  static defaultProps = {
    formatter: val => val,
    type: 'TableHeader'
  }

  sortableButton = (k, val) => {
    const {
      orderedDirection,
      orderedKey
    } = this.props;
    const classes = classnames('btn', 'btn-sm', 'btn-sort', {
      'sorted-desc': orderedKey === k && orderedDirection === 'desc',
      'sorted-asc': orderedKey === k && orderedDirection === 'asc'
    });
    return (
      <button type='button' className={ classes }>
        {val}
      </button>
    );
  }

  render() {
    const {
      columns,
      formatter,
      handleHeaderClick,
      isSortable
    } = this.props;
    const cells = columns.map((k) => {
      const val = formatter(k);
      return (
        <td
          onClick={() => handleHeaderClick(k)}
          className='table-label text-right'
          key={`table-header-${ k }`}
        >
          { isSortable ? this.sortableButton(k,val) : val }
        </td>
      );
    });

    return (
      <thead>
        <tr>
          {cells}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
