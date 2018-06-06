import React from 'react';
import response from './response.json';
import { storiesOf } from '@storybook/react';
import { DonutChart, Donut } from '../index';
import Legend from '../../Legend/index';
import CenterLabel from '../CenterLabel';
import { withInfo } from '@storybook/addon-info';
import { abbreviateNumber } from 'LIB/numberFormat';
import { Label } from 'recharts';
const colors = {
  undetermined: 'rgba(200, 0, 255, 0.57)',
  male: 'rgba(200, 0, 255, 1)',
  female: 'rgba(200, 0, 255, 0.24)'
};
const data = Object.keys(response).map((k) => (
  { ...response[k], name: k, color: colors[k] }
));
const total = data.reduce((a, b) => a + b.total, 0);

storiesOf('Charts/Donut', module)
  .add('Basic DonutChart', withInfo()(() => (
    <div style={{ height: '500px', width: '300px', margin: '0 auto' }} >
      <DonutChart
        data={data}
        dataKey={'percent'}
        nameKey={'name'}
      >
        <Donut />
      </DonutChart>
    </div>
  )))
  .add('Chart with center label', withInfo()(() => (
    <div style={{ height: '300px', width: '300px', margin: '0 auto' }} >
      <DonutChart
        data={data}
        dataKey={'percent'}
        nameKey={'name'}
      >
        <Donut >
          <Label content={<CenterLabel color={'#9b9b9b'} subText={'Impressions'} value={abbreviateNumber(total)} />} position={'center'} />
        </Donut>
      </DonutChart>
    </div>
  )))
  .add('Chart with legend and label', withInfo()(() => (
    <div style={{ height: '500px', width: '300px', margin: '0 auto' }} >
      <DonutChart
        data={data}
        dataKey={'percent'}
        nameKey={'name'}
      >
        <Donut width={300} height={300}>
          <Label content={<CenterLabel color={'#9b9b9b'} subText={'Impressions'} value={abbreviateNumber(total)} />} position={'center'} />
        </Donut>
        <Legend />
      </DonutChart>
    </div>
  )))
  .add('Chart legend with formatters', withInfo()(() => {
    const nameFormatter = val => val.charAt(0).toUpperCase() + val.slice(1);
    const valueFormatter = val => `${ val }%`;
    const content = (
      <CenterLabel color={'#9b9b9b'} subText={'Impressions'} value={abbreviateNumber(total)} />
    );
    return (
      <div style={{ height: '500px', width: '100%', margin: '0 auto' }} >
        <DonutChart
          data={data}
          dataKey={'percent'}
          nameKey={'name'}
        >
          <Donut>
            <Label
              content={content}
              position={'center'}
            />
          </Donut>
          <Legend
            nameFormatter={nameFormatter}
            valueFormatter={valueFormatter}
          />
        </DonutChart>
      </div>
    );
  }));
