import React from 'react';
import moment from 'moment';
import '../style/PriceChart.css';
import CustomTooltip from './CustomTooltip'
import {AreaChart, CartesianGrid, Area, XAxis, YAxis, Tooltip} from 'recharts';

class PriceChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceData: null,
      selectedOption: 'option1',
      url: 'https://api.coindesk.com/v1/bpi/historical/close.json'
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
        console.log(this.state.priceData)
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
                value="option1"
                checked={this.state.selectedOption === 'option1'}
                onChange={this.handleOptionChange} />
              Option 1
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio"
                value="option2"
                checked={this.state.selectedOption === 'option2'}
                onChange={this.handleOptionChange} />
              Option 2
            </label>
          </div>
        </div>
        {this.state.selectedOption}
        {this.state.url}
      </div>
    );
  }

  handleOptionChange = (e) => {
    const urlMap = {
      'option1': 'https://api.coindesk.com/v1/bpi/historical/close.json',
      'option2': 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05'
    }

    this.setState({
        selectedOption: e.target.value,
        url: urlMap[e.target.value]
    });
  }

}

export default PriceChart;
