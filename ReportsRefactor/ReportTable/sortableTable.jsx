import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
const sortableTable = Component => {
  class SortableTable extends PureComponent {
    state = {
      data: [],
      orderedKey: null,
      orderedDirection: 'desc'
    }

    static defaultProps = {
      data: [],
      isSortable: true
    }

    static propTypes = {
      data: PropTypes.array.isRequired
    }

    componentWillMount() {
      this.setState({ data: this.props.data });
    }

    componentWillReceiveProps(nextProps) {
      this.setState({data: nextProps.data})
    }

    sortData = (key) => {
      const {
        data,
        orderedDirection,
        orderedKey
      } = this.state;
      const sameKey = orderedKey === key;
      let direction = 'desc';
      if (sameKey && orderedDirection === direction) {
        direction = 'asc';
      }
      const sortedData = orderBy(data, [key], direction);
      this.setState({
        data: sortedData,
        orderedKey: key,
        orderedDirection: direction
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          handleHeaderClick={this.sortData}
          {...this.state}
        />
      );
    }
  }
  return SortableTable;
};

export default sortableTable;
