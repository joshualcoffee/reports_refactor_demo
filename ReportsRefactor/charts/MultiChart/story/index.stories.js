import React from 'react';
import data from './response.json';
import { storiesOf } from '@storybook/react';
import MultiChart from '../MultiChart';
import { withKnobs, select, color, text } from '@storybook/addon-knobs/react';
import { currencyNoFormat } from 'LIB/currency';
storiesOf('Charts/MultiChart', module)
  .addDecorator(withKnobs)
  .add('Basic MultiChart', () => {
    const defaultBarKey = 'spend';
    const defaultLineKey = 'views';
    const options = {
      impressions: 'impressions',
      views: 'views',
      spend: 'spend',
      clicks: 'clicks'
    };
    const defaultFormatterKey = 'no-format';
    const formatterOptions = {
      0: 'null',
      1: 'currency'
    };

    const formatters = {
      0: null,
      1: (val) => currencyNoFormat('en-US', val)
    };
    const lineLabel = text('Line Label', '');
    const barLabel = text('Bar Label', '');

    const renderLineLabel = lineLabel.length > 0 ? lineLabel : null;
    const renderBarLabel = barLabel.length > 0 ? barLabel : null;
    const selectedFormatter =
      formatters[select('Right Axis format', formatterOptions, defaultFormatterKey)];
    return (
      <div style={{ marginTop: 100, height: 300, width: '100%' }} >
        <MultiChart
          data={data}
          lineLabel={renderLineLabel}
          barLabel={renderBarLabel}
          xAxisKey={'start_date'}
          rightAxisFormat={ selectedFormatter }
          barKey={select('Bar Metric', options, defaultBarKey)}
          lineKey={select('Line Metric', options, defaultLineKey)}
          lineColor={color('Line Color', '#f67002')}
          barColor={color('Bar Color', '#E6F0C1')}
        />
      </div>
    );
  });
