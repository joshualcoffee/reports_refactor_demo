import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isPlainObject } from 'lodash';
const rowExpander = TableRow => {
  class RowExpander extends PureComponent {
    static defaultProps = {
      type: 'TableRow'
    }

    state = {
      rows: [],
      visibleParents: []
    }

    toggleRows = () => {
      this.setState({ expanded: !this.state.expanded });
    }


    setRows = (obj, rows = [], index = 0, parent = null) => {
      const {
        subRow
      } = this.props;
      const newObj =
        { ...obj, expandedRowContent: { i: index, parent, hasChildren: !!obj[subRow] } };
      rows.push(newObj);
      if (newObj[subRow] && Array.isArray(newObj[subRow])) {
        newObj[subRow].forEach(row => this.setRows(row, rows, index + 1, index));
      }
      if (newObj[subRow] && isPlainObject(newObj[subRow])) {
        this.setRows(newObj[subRow], rows, index + 1, index);
      }
      this.setState({ rows });
    }

    componentWillMount() {
      this.setRows(this.props.rowData);
    }

    closeChildren = (index, visibleParents) => {
      const {
        rows
      } = this.state;

      const childRowsIndex =
        rows.filter(row => row.expandedRowContent.parent === index)
        .map(row => row.expandedRowContent.i);
      const newVisibleParents = visibleParents.filter(rowId => (
        !childRowsIndex.includes(rowId)
      ));
      this.setState({ visibleParents: newVisibleParents });
    }

    showChildren = (index) => {
      const childrenShown = this.state.visibleParents.includes(index);
      const mutableParents = [...this.state.visibleParents];
      const visibleParents = childrenShown ?
        this.state.visibleParents.filter(i => i !== index) :
        [...mutableParents, index];

      if (childrenShown) {
        return this.closeChildren(index, visibleParents);
      }
      this.setState({ visibleParents });
    }

    render() {
      const {
        visibleParents,
        rows
      } = this.state;
      const visibleRows =
        rows.filter(row => row.expandedRowContent.parent === null ||
          visibleParents.includes(row.expandedRowContent.parent)
        );
      const renderRows = visibleRows.map((rowData, i) => (
        <TableRow
          handleClick={() => this.showChildren(i)}
          key={i}
          {...this.props}
          hasChildren={rowData.expandedRowContent.hasChildren}
          rowData={rowData}
        />
      ));
      return (
        <tbody>
          {renderRows}
        </tbody>
      );
    }
  }

  return RowExpander;
};

export default rowExpander;
