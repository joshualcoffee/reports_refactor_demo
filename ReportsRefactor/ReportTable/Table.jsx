import React, { PureComponent, Children, cloneElement } from 'react';
// import PropTypes from 'prop-types';
import visibleColumnRenderer from './visibleColumnRenderer';
import tableBuilder from './TableBuilder';
import sortableTable from './sortableTable';
export function Table(props) {
  return (
    <table className='table'>
      {props.children}
    </table>
  );
}


export default sortableTable(
  visibleColumnRenderer(tableBuilder(Table))
);
