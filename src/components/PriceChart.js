import React from 'react';
import moment from 'moment';
import '../style/PriceChart.css';
import CustomTooltip from './CustomTooltip'
import {AreaChart, CartesianGrid, Area, XAxis, YAxis, Tooltip} from 'recharts';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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

  handleOptionChange = (e) => {
    let selectedOption = e.target.value;
    let formattedUrl = baseUrl;

    if (selectedOption === '3month') {
      formattedUrl += `?start=${moment().subtract(3, 'months').format('YYYY-MM-DD')}&end=${moment().format('YYYY-MM-DD')}`
    } else if (selectedOption === '1year') {
      formattedUrl += `?start=${moment().subtract(1, 'year').format('YYYY-MM-DD')}&end=${moment().format('YYYY-MM-DD')}`
    } else if (selectedOption === '3year') {
      formattedUrl += `?start=${moment().subtract(3, 'year').format('YYYY-MM-DD')}&end=${moment().format('YYYY-MM-DD')}`
    }

    this.setState({
        selectedOption: selectedOption,
        url: formattedUrl
    }, function() {
      this.fetchPriceData();
    });
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
      <div className="price-chart-container">
        <div className="timeframe-container">
          <RadioGroup
            onChange={this.handleOptionChange}
            defaultValue={this.state.selectedOption}
            className="radio-timeframe">
            <RadioButton value="1month" className="btn-timeframe">1 Month</RadioButton>
            <RadioButton value="3month" className="btn-timeframe">3 Months</RadioButton>
            <RadioButton value="1year" className="btn-timeframe">1 Year</RadioButton>
            <RadioButton value="3years" className="btn-timeframe">3 Years</RadioButton>
          </RadioGroup>
        </div>
        <div className="chart-container">
        	<AreaChart
            width={800}
            height={400}
            data={this.state.priceData}>
            <defs>
              <linearGradient id="peachyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffcba4" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#ffcba4" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickLine={false}
              tick={{ fontSize: 12, dy: 15 }}
              angle={-45}
              height={40}
              />
            <YAxis
              type="number"
              tickLine={false}
              tick={{ fontSize: 16 }}
              tickFormatter={this.priceFormatter}
               />
            <CartesianGrid strokeDasharray="2 2" />
            <Tooltip
              content={<CustomTooltip price={this.state.priceData}/>}
              price={this.state.priceData} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#ffcba4"
              fillOpacity={1}
              fill="url(#peachyGradient)"
              isAnimationActive={false} />
          </AreaChart>
        </div>
      </div>
    );
  }
}

export default PriceChart;
