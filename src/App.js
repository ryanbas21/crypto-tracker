import React, { Component } from 'react';
import R from 'ramda';
import CryptoForm from './components/form/index';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    selected: 'Ethereum',
    price: '',
    amount: '',
    total: '',
    ethereum: [],
    bitcoin: [],
    litecoin: [],
  };
  handleSelected = ({ label }) => {
    this.setState({
      selected: label,
      price: '',
      amount: '',
      total: '',
    });
  };
  calculateAllCoins = () => {
    const { ethereum, bitcoin, litecoin } = this.state;
    const allCoins = [...ethereum, ...bitcoin, ...litecoin];
    return R.reduce((acc, coin) => acc + coin.total, 0, allCoins);
  };
  calculateTotal = coins => R.reduce((acc, val) => acc + val.total, 0, coins);
  calculateOwned = coin => R.reduce((acc, val) => acc + val.amount, 0, coin);
  handleTotal = e =>
    Number(e.target.value) ? this.setState({ total: Number(e.target.value) }) : null;
  handlePrice = e =>
    Number(e.target.value) ? this.setState({ price: Number(e.target.value) }) : null;
  handleAmount = e =>
    Number(e.target.value) ? this.setState({ amount: Number(e.target.value) }) : null;
  handleSubmit = e => {
    e.preventDefault();
    const purchase = {
      pricePerCoin: this.state.price,
      amount: this.state.amount,
      total: this.state.total,
      timestamp: Date.now(),
    };
    if (this.state.price !== '' && this.state.amount !== '' && this.state.total !== '') {
      this.setState({
        [R.toLower(this.state.selected)]: R.append(
          purchase,
          this.state[R.toLower(this.state.selected)],
        ),
        price: '',
        amount: '',
        total: '',
        error: '',
      });
    } else {
      this.setState({
        price: '',
        amount: '',
        total: '',
        error: 'Invalid submit',
      });
    }
  };
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Crypto Calculator!</h2>
        </div>
        {this.state.error ? this.state.error : ''}
        <CryptoForm
          value={this.state}
          handleTotal={this.handleTotal}
          handleAmount={this.handleAmount}
          handlePrice={this.handlePrice}
          handleSelected={this.handleSelected}
          handleDropDown={this.handleDropDown}
          handleSubmit={this.handleSubmit}
        />
        <hr />
        Total Spent on Ethereum: {this.calculateTotal(this.state.ethereum)} <br />
        Total Owned Ethereum: {this.calculateOwned(this.state.ethereum)} <br />
        <hr />
        Total Spent on Litecoin: {this.calculateTotal(this.state.litecoin)} <br />
        Total Owned Litecoin: {this.calculateOwned(this.state.litecoin)}
        <br />
        <hr />
        Total Spent on Bitcoin: {this.calculateTotal(this.state.bitcoin)} <br />
        Total Owned Bitcoin: {this.calculateOwned(this.state.bitcoin)}
        <br />
        <hr />
        Total Spent on All Coins: {this.calculateAllCoins()}
      </div>
    );
  }
}

export default App;
