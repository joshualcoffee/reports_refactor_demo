import React from 'react';

import { storiesOf } from '@storybook/react';
import { Tabs, Tab } from 'react-bootstrap';
import TabTitle from '../TabTitle';
import data from '../../MultiChart/story/response.json';
import MultiChart from '../../MultiChart/MultiChart';
import { withInfo } from '@storybook/addon-info';
const ViewsTitle = (props) => (
  <TabTitle
    subText={'1000'}
    title={'Views'}
    color='#f67002'
    tooltip={'tooltip'}
    {...props}
  />
);

const ImpressionsTitle = (props) => (
  <TabTitle
    subText={'1000'}
    title={'Impressions'}
    color='#a26da9'
    tooltip={'tooltip'}
    {...props}
  />
);
storiesOf('Charts/Tabs', module)
  .add('Basic Tabs', withInfo({
    text: 'Our chart tabs will utilize react-bootstrap tabs with a custom tab component.'
  })(() => (
    <Tabs unmountOnExit={true} id={ViewsTitle} defaultActiveKey={1} animation={false} className='tabbed-chart'>
      <Tab eventKey={0} title={<ViewsTitle />} className='chart-content tab-content'>
        Views Chart Content
      </Tab>
      <Tab eventKey={1} title={<ImpressionsTitle />} className='chart-content tab-content'>
        Impressions Chart Content
      </Tab>
    </Tabs>
  )))
  .add('Basic tabs with charts', withInfo()(() => (
    <Tabs unmountOnExit={true} id={ViewsTitle} defaultActiveKey={1} animation={false} className='tabbed-chart'>
      <Tab eventKey={0} title={<ViewsTitle />} className='chart-content tab-content'>
        <div style={{ height: 300, width: '100%' }} >
          <MultiChart
            data={data}
            xAxisKey={'start_date'}
            barKey={'spend'}
            lineKey={'views'}
            lineColor={'#f67002'}
            barColor={'#E6F0C1'}
          />
        </div>
      </Tab>
      <Tab eventKey={1} title={<ImpressionsTitle />} className='chart-content tab-content'>
        <div style={{ height: 300, width: '100%' }} >
          <MultiChart
            data={data}
            xAxisKey={'start_date'}
            barKey={'spend'}
            lineKey={'impressions'}
            lineColor={'#a26da9'}
            barColor={'#E6F0C1'}
          />
        </div>
      </Tab>
    </Tabs>
  )));
