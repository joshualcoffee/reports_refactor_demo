import React, { PureComponent } from 'react';

const visibleColumnRenderer = Component => {
  class ReportTable extends PureComponent {
    state = {
      visibleColumns: 'all'
    }

    setDisplayColumns = columns => {
      this.setState({
        visibleColumns: columns
      });
    }

    columns = () => {
      const {
        data,
        columns
      } = this.props;
      if (columns) {
        return columns;
      }
      if ( !data || data.length === 0 ) {
        return [];
      }
      return Object.keys(data[0]);
    }

    render() {
      const {
        visibleColumns
      } = this.state;
      const columns = visibleColumns === 'all' ?
        this.columns() :
        visibleColumns;
      return (
        <Component {...this.props} setDisplayColumns={this.setDisplayColumns} columns={columns} />
      );
    }
  }
  return ReportTable;
};

export default visibleColumnRenderer;
