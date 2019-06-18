import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Chart from 'react-google-charts';
import {getHistory} from '../redux-tools/actions';
let date = new Date(Date.now());
const getCorrectFormatDate = num => {
  let str = num.toString();
  return str.length === 1?"0"+str:str;
}
const getCorrectFormatMonth = num => {
  let str = (num+1).toString();
  return str.length === 1?"0"+str:str;
}
export class ChartsComponent extends Component {
  static propTypes = {
    prop: PropTypes
  };
  renderCharts = () => (
    <Chart
    width={'800px'}
    height={'600px'}
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data = {this.props.timeFrame &&
      [
        ['time','price'],
        ...Object.entries(this.props.timeFrame)
      ]
    }
    />
  )
  state = {
    day:true,
    month:false,
    year:false
  }

  onDayClick = async (e) => {
    this.setState({day:true,month:false,year:false});
    let start = date.getFullYear()+"-"+getCorrectFormatMonth(date.getMonth())+"-"+getCorrectFormatDate(date.getDate());
    
    let fivedaysback = new Date(date.getTime()-432000000);
    let end = fivedaysback.getFullYear()+"-"+getCorrectFormatMonth(fivedaysback.getMonth())+"-"+getCorrectFormatDate(fivedaysback.getDate())
    await this.props.getHistory(start,end,this.props.type);
   
  }
  onMonthClick = async (e) => {
    this.setState({month:true,day:false,year:false})
    let start = date.getFullYear()+"-"+getCorrectFormatMonth(date.getMonth())+"-"+getCorrectFormatDate(date.getDate());
    
   
    let fiveMonthsback = new Date(date);
    
    fiveMonthsback.setMonth(fiveMonthsback.getMonth()+1-5);
     let end = fiveMonthsback.getFullYear()+"-"+getCorrectFormatMonth(fiveMonthsback.getMonth())+"-"+getCorrectFormatDate(fiveMonthsback.getDate())
     await this.props.getHistory(start,end,this.props.type);
   
  }

  onYearClick = async (e) => {
    this.setState({month:false,day:false,year:true});
    let start = date.getFullYear()+"-"+getCorrectFormatMonth(date.getMonth())+"-"+getCorrectFormatDate(date.getDate());
    
    let end = (date.getFullYear()-5)+"-"+getCorrectFormatMonth(date.getMonth())+"-"+getCorrectFormatDate(date.getDate());
    await this.props.getHistory(start,end,this.props.type);
  }
  render() {
    return (
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button className={this.state.day?"nav-link active":"nav-link"} onClick = {this.onDayClick}>5 day</button>
            </li>
            <li className="nav-item">
              <button className={this.state.month?"nav-link active":"nav-link"} onClick = {this.onMonthClick}>5 month</button>
            </li>
            <li className="nav-item">
              <button className={this.state.year?"nav-link active":"nav-link"} onClick = {this.onYearClick}>5 year</button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {this.renderCharts()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  timeFrame:state.timeFrme.timeFrame
});

const mapDispatchToProps = {
getHistory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsComponent);
