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
    }
  }

  componentDidMount() {
    this.fetchPriceData = () => {
      const url = 'https://api.coindesk.com/v1/bpi/historical/close.json';
      fetch(url)
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

    this.fetchPriceData();
  }

  priceFormatter(price) {
    return (
      '$'+(price/1000)+'k'
    );
  }

  render() {
    return (
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
    );
  }
}

export default PriceChart;
