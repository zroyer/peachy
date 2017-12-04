import React from 'react';
import '../style/Footer.css';

class Footer extends React.Component {

  render() {
    return (
      <div className="footer">
        <a href="https://github.com/zroyer/peachy-btc-monitor" target="_blank" className="link">
          <span role="img" aria-labelledby="peach">🍑</span>
        </a>
      </div>
    )
  }
}

export default Footer;
