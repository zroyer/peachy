import React from 'react';
import '../style/CustomTooltip.css';

class CustomTooltip extends React.Component {
  render() {
    const { active, payload, label } = this.props;
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <span className="label-date">{`${label}`}</span>
          <span className="label-price">${payload[0].value.toFixed(2)}</span>
        </div>
      );
    }
    return null;
  }
}

export default CustomTooltip;
