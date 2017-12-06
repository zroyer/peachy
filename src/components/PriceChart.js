import React from 'react';
import moment from 'moment';
import '../style/PriceChart.css';
import CustomTooltip from './CustomTooltip'
import {AreaChart, CartesianGrid, Area, XAxis, YAxis, Tooltip} from 'recharts';

const baseUrl = 'https://api.coindesk.com/v1/bpi/historical/close.json';

class PriceChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceData: null,
      selectedOption: '1month',
      url: baseUrl
    }

    this.handleOptionChange.bind(this);
    this.fetchPriceData.bind(this);
  }

  componentDidMount() {
    this.fetchPriceData();
  }

  componentDidUpdate() {
    this.fetchPriceData();
  }

  fetchPriceData() {
    fetch(this.state.url)
      .then(response => response.json())
      .then((priceDataRes) => {
        const priceCalendar = [];
        for (let date in priceDataRes.bpi) {
          priceCalendar.push({
            date: moment(date).format('MM/DD/YY'),
            price: priceDataRes.bpi[date],
          });
        }
        this.setState({
          priceData: priceCalendar,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  priceFormatter(price) {
    return (
      '$'+(price/1000)+'k'
    );
  }

  render() {
    return (
      <div className="container">
        <div className="price-chart-container">
        	<AreaChart
            width={900}
            height={400}
            data={this.state.priceData}>
            <defs>
              <linearGradient id="peachyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFD6BF" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#FFD6BF" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickLine={false}
              tick={{ fontSize: 12, dy: 15 }}
              angle={-45}
              height={40}
              stroke="#808080" />
            <YAxis
              type="number"
              tickLine={false}
              tick={{ fontSize: 16 }}
              tickFormatter={this.priceFormatter}
              stroke="#808080" />
            <CartesianGrid strokeDasharray="2 2" />
            <Tooltip content={<CustomTooltip />}/>
            <Area type="monotone" dataKey="price" stroke="#FFD6BF" fillOpacity={1} fill="url(#peachyGradient)"/>
          </AreaChart>
        </div>


        <div>
          <div className="radio">
            <label>
              <input type="radio"
                value="1month"
                checked={this.state.selectedOption === '1month'}
                onChange={this.handleOptionChange} />
              1 Month
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio"
                value="3month"
                checked={this.state.selectedOption === '3month'}
                onChange={this.handleOptionChange} />
              3 Months
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio"
                value="1year"
                checked={this.state.selectedOption === '1year'}
                onChange={this.handleOptionChange} />
              1 Year
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio"
                value="3year"
                checked={this.state.selectedOption === '3year'}
                onChange={this.handleOptionChange} />
              3 Years
            </label>
          </div>
        </div>

      </div>
    );
  }

  handleOptionChange = (e) => {
    let selectedOption = e.target.value;


    let url = baseUrl;

    let today = moment().format('YYYY-MM-DD');
    let teststring = `${baseUrl}`
    console.log(teststring);
    const urlMap = {
      '1month': 'https://api.coindesk.com/v1/bpi/historical/close.json',
      '3month': 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05'
    }

    if (selectedOption === '3month') {
      url += `?start=${moment().subtract(3, 'months').format('YYYY-MM-DD')}&end=${moment().format('YYYY-MM-DD')}`
    } else if (selectedOption === '1year') {
      url += `?start=${moment().subtract(1, 'year').format('YYYY-MM-DD')}&end=${moment().format('YYYY-MM-DD')}`
    } else if (selectedOption === '3year') {
      url += `?start=${moment().subtract(3, 'year').format('YYYY-MM-DD')}&end=${moment().format('YYYY-MM-DD')}`
    }



    this.setState({
        selectedOption: selectedOption,
        url: url
    });
  }

}

export default PriceChart;
