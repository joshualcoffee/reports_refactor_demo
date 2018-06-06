import React, { PureComponent, Children, cloneElement } from 'react';
import { omit } from 'lodash';
export default class DonutChartBuilder extends PureComponent {
  state = {
    activeIndex: null
  }

  mouseOver = (_, i) => {
    this.setState({
      activeIndex: i
    });
  }

  mouseOut = () => {
    this.setState({ activeIndex: null });
  }

  renderChart = (component) => {
    const passedProps = omit(this.props, ['children']);
    const newProps = {
      ...passedProps,
      ...this.state,
      ...component.props,
      mouseOut: this.mouseOut,
      mouseOver: this.mouseOver
    };
    return cloneElement(
      component,
      newProps
    );
  }

  renderLegend = (component) => {
    const data = this.props.data;
    const passedProps = omit(this.props, ['children']);
    const newProps = {
      data: data,
      ...passedProps,
      ...component.props
    };
    return cloneElement(
      component,
      newProps
    );
  }

  renderChildren = () => {
    const children = this.props.children;
    return Children.map( children, (child) => {
      if (child.props.type === 'Legend'){
        return this.renderLegend(child);
      }
      if (child.props.type === 'DonutChart'){
        return this.renderChart(child);
      }
      return null;
    });
  }

  render() {
    return (
      <div className='donut-chart-wrapper'>
        {this.renderChildren()}
      </div>
    );
  }
}
