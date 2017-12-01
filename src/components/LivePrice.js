import React from 'react';

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
          console.log('got the price');
          console.log(priceRes);
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
    this.refresh = setInterval(() => this.fetchPrice(), 90000);
  }

  componentWillUnmount(){
    clearInterval(this.refresh);
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
          (Last updated {this.state.lastUpdated})
        </div>
      </div>
    )
  }
}

export default LivePrice;
