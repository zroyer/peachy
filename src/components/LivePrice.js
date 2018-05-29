import React from 'react';
import TimeAgo from 'react-timeago';
import FadeIn from 'react-fade-in';
import '../style/LivePrice.css';

class LivePrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      lastUpdated: null,
      hasErrored: false,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.fetchPrice = async () => {
      this.setState({ isLoading: true });
      const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
      fetch(url)
        .then(response => response.json())
        .then((priceRes) => {
          this.setState({
            price: priceRes.bpi.USD.rate_float,
            lastUpdated: priceRes.time.updated,
            isLoading: false,
          })
        })
        .catch((e) => {
          console.log(e);
          this.setState({ hasErrored: true });
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
    if (this.state.hasErrored) {
      return (
        <div id="price-container">
          <div className='price-headline'>
            Sorry!
          </div>
          <p className='last-updated-info'>
            There was an error fetching the price. Try again later!
          </p>
        </div>
      )
    }

    if (this.state.isLoading) {
      return (
        <div id="price-container">
          <div className='price-headline'>
            Loading...
          </div>
        </div>
      )
    }

    return (
      <FadeIn>
        <div id="price-container">
          <div className='price-headline'>
            {this.state.price.toLocaleString('us-EN', {
              style: 'currency',
              currency: 'USD',
            })}
          </div>
            <p className='last-updated-info'>
              Price updated <TimeAgo date={this.state.lastUpdated} unit="second" />
              <a
                href="https://github.com/zroyer/peachy-btc-monitor"
                target="_blank"
                className="link"
                rel="noopener noreferrer">
                <span role="img" className="peach" aria-labelledby="peach">&nbsp;🍑</span>
              </a>
            </p>
        </div>
      </FadeIn>
    );
  }
}

export default LivePrice;
