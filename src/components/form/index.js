import React from 'react';
import R from 'ramda';
import Select from 'react-select';

const options = [
  { value: 'ETH', label: 'Ethereum' },
  { value: 'LTC', label: 'Litecoin' },
  { value: 'BTC', label: 'Bitcoin' },
];
export default props =>
  <form type="submit" onSubmit={props.handleSubmit}>
    <Select
      onChange={props.handleSelected}
      options={options}
      placeholder={`Coin: ${props.value.selected}`}
      value={props.value.selected}
      searchable={false}
    />
    Amount Bought:{' '}
    <input type="text" onChange={props.handleAmount} placeholder="Amount Purchased" /> <br />
    Price Per Coin: <input
      type="text"
      placeholder="Price Per Coin"
      onChange={props.handlePrice}
    />{' '}
    <br />
    Total Spent:{' '}
    <input type="text" placeholder="Total Spent (with Fees)" onChange={props.handleTotal} />
    <button hidden type="submit" style={{ display: 'none' }} />
  </form>;
