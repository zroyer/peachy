import React from 'react';
import '../style/CustomTooltip.css';

class CustomTooltip extends React.Component {
  render() {
    const { active, payload, label } = this.props;
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <p className="label-date">{`${label}`}</p>
          <p className="label-price">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  }
}

export default CustomTooltip;
