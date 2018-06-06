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

const Tooltip = (props) => {
  const {
    data,
    nameKey,
    dataKey,
    activeIndex
  } = props;

  const metric = data[activeIndex];
  if ( !metric ) { return null; }
  const fill = metric.color || null;
  const blockStyles = Object.assign(colorBlockStyles, { backgroundColor: fill });
  return (
    <div style={wrapperStyles}>
      <table>
        <tbody>
          <tr style={trStyles}>
            <td style={tdStyles}>
              <div style={blockStyles} />
              {metric[nameKey]}
            </td>
            <td style={tdStyles}>{metric[dataKey]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


export default Tooltip;
