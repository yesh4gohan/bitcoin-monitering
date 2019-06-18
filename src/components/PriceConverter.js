import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAmount, getAmountDefault } from "../redux-tools/actions";
import ChartComponent from './ChartsComponent';
export class PriceConverter extends Component {
  static propTypes = {
    prop: PropTypes
  };

  state = {
    from: 1,
    to: 0,

    currency_to: "USD"
  };

  async componentDidMount() {
    await this.props.getAmountDefault();
    this.setState({ to: this.props.rate });
  }
  onChange = e =>
    this.setState({ [e.target.id]: e.target.value }, this.changeToValue);

  changeToValue = () => {
    this.state.from &&
      this.props.rate &&
      this.setState({ to: parseFloat(this.state.from * this.props.rate) });
  };
  onToChange = e =>
    this.setState({ currency_to: e.target.value }, this.sendQuery);

  sendQuery = async () => {
    console.log(this.state.currency_to)
    await this.props.getAmount(this.state.currency_to);
    this.setState({ to: this.props.rate,from:1 });
  };
  renderDate = () =>
    this.props.time && (
      <p className="card-text">
        <b>{this.props.time}</b>
      </p>
    );
  renderValues = () => (
    <div className="row m-1">
      <div class="input-group input-group-sm mb-3">
        <div className="col sm-6">
          <input
            className="form-control"
            type="number"
            id="from"
            value={this.state.from}
            onChange={this.onChange}
          />
        </div>
        <div className="col sm-6">
          <input
            className="form-control"
            type="number"
            id="to"
            value={this.state.to}
            onChange={this.onChange}
          />
        </div>
      </div>
    </div>
  );
  renderDropdown = () => (
    <div class="input-group input-group-sm mb-3">
      <div className="col sm-6">
        <select
          disabled
          class="custom-select"
          id="currency_from"
          value="Bitcoin"
        >
          <option defaultValue="Bitcoin">Bitcoin</option>
        </select>
      </div>
      <div className="col sm-6">
        <select
          class="custom-select"
          id="currency_to"
          onChange={this.onToChange}
        >
          <option defaultValue value = "USD">United States Dollar</option>

          <option value="EUR">British Pound Sterling</option>
          <option value="CNY">Chinese Yuan</option>
        </select>
      </div>
    </div>
  );

  render() {

    return (
      <div className="card text-center">
        <div className="card-header">1 Bit coin equals</div>
        <div className="card-body">
          {this.props.rate && (
            <h5 className="card-title">
              <b>{this.props.rate}</b> {this.props.desc}
            </h5>
          )}
          {this.renderValues()}
          <div className="row m-1">{this.renderDropdown()}</div>
          <p className="card-text">{this.renderDate()}</p>
        </div>
        <div className="card-footer text-muted">
          <ChartComponent type = {this.state.currency_to}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rate: state.currency.rate,
  desc: state.currency.desc,
  time: state.currency.time,
  timeFrame:state.timeFrme.timeFrame
});

const mapDispatchToProps = {
  getAmount,
  getAmountDefault
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceConverter);
