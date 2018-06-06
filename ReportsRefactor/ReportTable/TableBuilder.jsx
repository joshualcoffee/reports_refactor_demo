import React, { PureComponent, Children, cloneElement } from 'react';
// import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

const tableBuilder = Table => {
  class ReportTable extends PureComponent {

    columns = () => {
      const {
        columns,
        data
      } = this.props;
      if (!data || data.length === 0) {
        return [];
      }
      return columns || Object.keys(data[0]);
    }

    renderTableRows = (Row) => {
      const {
        data
      } = this.props;
      const visibleColumns = this.columns();
      return data.map((rowData) => {
        const newProps = {
          ...Row.props,
          rowData,
          key: rowData.key || uniqueId(),
          columns: visibleColumns
        };
        return cloneElement(Row, newProps);
      });
    }

    renderTableHeader = (Header) => {
      const visibleColumns = this.columns();
      const newProps = {
        ...this.props,
        ...Header.props,
        columns: visibleColumns
      };
      return cloneElement(Header, newProps);
    }

    renderChildren = (children) => (
      Children.map(children, (child) => {
        if (child.props.type === 'TableRow') {
          return this.renderTableRows(child);
        }
        if (child.props.type === 'TableHeader') {
          return this.renderTableHeader(child);
        }
        if ( child.type === 'tbody') {
          return cloneElement(child, this.props, this.renderChildren(child.props.children));
        }
        return child;
      })
    )

    render() {
      const {
        children
      } = this.props;
      return (
        <Table {...this.props}>
          { this.renderChildren(children) }
        </Table>
      );
    }
  }

  return ReportTable;
};

export default tableBuilder;
