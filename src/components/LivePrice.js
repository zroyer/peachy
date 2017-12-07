import React from 'react';
import TimeAgo from 'react-timeago';
import '../style/LivePrice.css';

class LivePrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      lastUpdated: null,
    }
  }

  componentDidMount() {
    this.fetchPrice = async () => {
      const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
      fetch(url)
        .then(response => response.json())
        .then((priceRes) => {
          this.setState({
            price: priceRes.bpi.USD.rate_float,
            lastUpdated: priceRes.time.updated,
          })
        })
        .catch((e) => {
          console.log(e);
        });
    }

    this.fetchPrice();

    // the API updates every 90 seconds
    this.refreshPrice = setInterval(() => this.fetchPrice(), 90000);
  }

  componentWillUnmount(){
    clearInterval(this.refreshPrice);
  }

  render() {
    return (
      <div id="price-container">
        <div className='price-headline'>
          {this.state.price.toLocaleString('us-EN', {
            style: 'currency',
            currency: 'USD',
          })}
        </div>
        <div className='last-updated-info'>
          Price updated <TimeAgo date={this.state.lastUpdated} unit="second" />
          &nbsp;
          <a
            href="https://github.com/zroyer/peachy-btc-monitor"
            target="_blank"
            className="link"
            rel="noopener noreferrer">
            <span role="img" className="peach" aria-labelledby="peach">🍑</span>
          </a>
        </div>
      </div>
    );
  }
}

export default LivePrice;
