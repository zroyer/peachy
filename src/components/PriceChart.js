import React from 'react';
import moment from 'moment';
import FadeIn from 'react-fade-in';
import CustomTooltip from './CustomTooltip'
import {AreaChart, CartesianGrid, Area, XAxis, YAxis, Tooltip} from 'recharts';
import { Radio } from 'antd';
import '../style/PriceChart.css';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const baseUrl = 'https://api.coindesk.com/v1/bpi/historical/close.json';

class PriceChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceData: null,
      selectedOption: '1months',
      url: baseUrl,
    }
  }

  componentDidMount() {
    this.fetchPriceData();
  }

  handleOptionChange = (e) => {
    let selectedOption = e.target.value;
    let num = e.target.value.split("")[0];
    let base = e.target.value.split("").splice(1).join("");
    let formattedUrl = baseUrl + `?start=${moment().subtract(num, base).format('YYYY-MM-DD')}&end=${moment().format('YYYY-MM-DD')}`;

    this.setState({
        selectedOption,
        url: formattedUrl
    }, function() {
      this.fetchPriceData();
    });
  }

  fetchPriceData = () => {
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
      `$${price/1000}k`
    );
  }

  render() {
    return (
      <FadeIn>
        <div className="price-chart-container">
          <div className="chart-container">
          	<AreaChart
              width={900}
              height={400}
              margin={{ top: 20, right: 50, left: 50 }}
              data={this.state.priceData}>
              cornerRadius={0}
              <defs>
                <linearGradient id="peachyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffcba4" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#ffcba4" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickLine={false}
                tick={{ fontSize: 14, dx: 18, dy: -20 }}
                angle={-45}
                height={40}
                orientation="top"
                axisLine={false}
                />
              <YAxis
                type="number"
                tickLine={false}
                tick={{ fontSize: 16, dx: -5}}
                tickFormatter={this.priceFormatter}
                axisLine={false}
                 />
              <CartesianGrid strokeDasharray="3 3" />
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
          <div className="timeframe-container">
            <RadioGroup
              onChange={this.handleOptionChange}
              defaultValue={this.state.selectedOption}
              className="radio-timeframe">
              <RadioButton value="1months" className="btn-timeframe">1 Month</RadioButton>
              <RadioButton value="3months" className="btn-timeframe">3 Months</RadioButton>
              <RadioButton value="1year" className="btn-timeframe">1 Year</RadioButton>
              <RadioButton value="3year" className="btn-timeframe">3 Years</RadioButton>
            </RadioGroup>
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default PriceChart;
