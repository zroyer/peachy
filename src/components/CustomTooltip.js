import React from 'react';
import '../style/CustomTooltip.css';

class CustomTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipPrice: 0,
    }
  }

  propTypes: {
    type: PropTypes.string,
    payload: PropTypes.array,
    label: PropTypes.string,
  }

  render() {
    const { active } = this.props;
    if (active) {
      const { payload, label } = this.props;
      if (payload) {
        this.state.tooltipPrice = payload[0].value.toFixed(2);
        return (
          <div className="custom-tooltip">
            <p className="label-date">{`${label}`}</p>
            <p className="label-price">${this.state.tooltipPrice}</p>
          </div>
        );
      }
    }
    return null;
  }
}

export default CustomTooltip;
