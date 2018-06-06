import React, { PureComponent, Children } from 'react';
import Loader from 'COMMON/components/LoadingWrapper/InlineLoader';
import { Tabs, Tab } from 'react-bootstrap';
import TabTitle from './TabTitle';
export class ChartTab extends PureComponent {
  render() {
    const {
      isLoading,
      children
    } = this.props;
    if (isLoading) {
      return (
        <div style={{ height: 320 }}>
          <Loader isLoading={true} ><span /></Loader>
        </div>
      )
    }
    return children;
  }
}
export class ChartTabs extends PureComponent {
  renderChildren = () => (
    Children.map(this.props.children, (child, i) => {
      let renderedChild = child;
      if ( child.type.name !== 'ChartTab' ) {
        const props = {
          ...child.props,
          ...this.props
        };
        renderedChild = child.type(props);
      }
      const titleProps = {
        subText: renderedChild.props.subText,
        title: renderedChild.props.title,
        color: renderedChild.props.color,
        tooltip: renderedChild.props.tooltip
      };

      return (
        <Tab
          eventKey={i}
          title={<TabTitle {...titleProps} />}
          className='chart-content tab-content'
        >
          {renderedChild}
        </Tab>
      );
    })
  )
  render() {
    const {
      defaultActiveKey
    } = this.props;
    return (
      <Tabs unmountOnExit={true} id={"tabs"} defaultActiveKey={defaultActiveKey || 0} animation={false} className='tabbed-chart'>
        {this.renderChildren()}
      </Tabs>
    );
  }
}

export default ChartTabs;
