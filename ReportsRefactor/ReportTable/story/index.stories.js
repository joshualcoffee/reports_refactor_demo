import React from 'react';

import { storiesOf } from '@storybook/react';
import DefaultTable from '../Table';
import { withInfo } from '@storybook/addon-info';
import RowExpander, { Row } from '../Row';
import Header from '../Header';
import data from './response.json';
const rows = Object.keys(data).map((k) => (
  {
    ...data[k],
    key: k,
    date: k
  }
));
const columns = [
  'date',
  'impressions',
  'views',
  'clicks',
  'spend',
  'vtr',
  'ctr',
  'cpv',
  'eCPM'
];
storiesOf('Report Table', module)
  .add('Default Table', withInfo({
    text: `
    ## Description
    Default table that allows user to compose sortable,
    column selected and default rendered data tables.
    `
  })(() => (
    <DefaultTable data={rows} columns={columns} >
      <Header />
      <tbody>
        <Row />
      </tbody>
    </DefaultTable>
  )))
  .add('Header Formater', withInfo({
    text: `
    ## Description
    Allows user to pass in a formatter that will format the table headers.
    Accepts react elements or strings.

    #### Formatter Source
    \`\`\`javascript
      const Th = ({v}) => {
        return(<span className='test'>{v.toUpperCase()}</span>)
      };
      const formatter = v => (<Th v={v} />)
    \`\`\`
    `
  })(() => {
    const Th = ({ v }) => (<span className='test'>{v.toUpperCase()}</span>);
    const formatter = v => (<Th v={v} />);
    return (
      <DefaultTable data={rows} columns={columns} >
        <Header formatter={formatter} />
        <tbody>
          <Row />
        </tbody>
      </DefaultTable>
    );
  }))
  .add('Row Formater', withInfo({
    text: `
    ## Description
    Allows user to pass in a formatter that will format the row cells.
    Accepts react elements or strings.

    #### Formatter Source
    \`\`\`javascript
      const Cell = ({ columnKey, value }) => {
        const v = columnKey === 'spend' ?
          \`$\${ value }\` : value;
        return (<span>{ v }</span>);
      };
      const formatter = (options) => (<Cell {...options} />);
    \`\`\`
    `
  })(() => {
    const Cell = ({ columnKey, value }) => {
      const v = columnKey === 'spend' ?
        `$${ value }` : value;
      return (<span style={{border: '1px solid red'}}>{ v }</span>);
    };
    const formatter = (options) => (<Cell {...options} />);
    return (
      <DefaultTable data={rows} columns={columns} >
        <Header />
        <tbody>
          <Row formatter={formatter} />
        </tbody>
      </DefaultTable>
    );
  }))
  .add('Expandable Row', withInfo({
    text: `
    ## Description
    HOC that wraps a table row.  This will allow the row to have nested children that can be expanded.
    `
  })(() => {
    return (
      <div className='daily-reports report-table report-table-flex report-table-flex-sticky-header report-table-flex-sticky-column'>
        <div className='report-table-container'>
          <DefaultTable data={rows} columns={columns} >
            <Header />
            <RowExpander subRow={'campaigns'} />
          </DefaultTable>
        </div>
      </div>
    );
  }));
