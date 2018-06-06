import React from 'react';
const labelStyles = {
  backgroundColor: '#cccccc',
  display: 'block',
  color: '#ffffff',
  fontSize: '12px',
  padding: '5px',
  textAlign: 'left',
  borderRadius: 0,

};

const trStyles = {
  borderTop: '1px solid #000000',
  borderBottom: '1px solid #000000'
};

const tdStyles = {
  borderRight: '1px dotted #000000',
  padding: '5px'
}

const wrapperStyles = {
  border: '1px solid #000000',
  backgroundColor: '#ffffff'
};

const colorBlockStyles = {
  width: '10px',
  height: '10px',
  display: 'inline-block',
  marginRight: '5px'
}

const Row = ({
  row
}) => {
  const value = row.formatter ?
    row.formatter(row.payload[row.dataKey]) : row.payload[row.dataKey];
  const blockStyles = Object.assign(colorBlockStyles, { backgroundColor: row.color});
  return (
    <tr style={trStyles}>
      <td style={tdStyles}>
        <div style={blockStyles} />
        {row.name}
      </td>
      <td style={tdStyles}>{value}</td>
    </tr>
  );
};

const Tooltip = ({
  payload,
  label
}) => {
  const renderRows = payload.map(row => <Row row={row} key={row.dataKey} />);
  return (
    <div style={wrapperStyles}>
      <div style={labelStyles} className='label'>
        {label}
      </div>
      <table>
        <tbody>
          { renderRows }
        </tbody>
      </table>
    </div>
  );
};


export default Tooltip;
