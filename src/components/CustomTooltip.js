import React from 'react';
import '../style/CustomTooltip.css';

class CustomTooltip extends React.Component {
  propTypes: {
    type: PropTypes.string,
    payload: PropTypes.array,
    label: PropTypes.string,
  }

  render() {
    const { active } = this.props;
    if (active) {
      const { payload, label } = this.props;
      return (
        <div className="custom-tooltip">
          <p className="label-date">{`${label}`}</p>
          <p className="label-price">{`$${payload[0].value.toFixed(2)}`}</p>
        </div>
      )
    }
    return null;
  }
}

export default CustomTooltip;
