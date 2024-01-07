import React, { useEffect, useState } from 'react'
import CoinsList from './CoinsList';

export default function HomePage(props) {
    const [topCoins, setTopCoins] = useState([]);
    const [searchText, setSearchText] = useState('');
    let filteredArr;

    const handleSearch = (e) => {
      let txt = e.target.value
      setSearchText(txt);
      if (!txt) {
        filteredArr = props.data.sort((a, b) => b.openingPrice - a.openingPrice);
      } else {
        filteredArr = props.data.filter(val => val.tradingPair.includes(txt.toUpperCase()))
        .sort((a, b) => b.openingPrice - a.openingPrice);
        }
        setTopCoins(filteredArr.slice(0, 10));
    }

    useEffect(() => {
      if (!searchText) {
        filteredArr = props.data.sort((a, b) => b.openingPrice - a.openingPrice);
        setTopCoins(filteredArr.slice(0, 10));
      }
        
    }, [props.data]);
    
  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
        />
      </div>
        <div>
      <h1>Top 10 Most Expensive Coins</h1>
      <CoinsList data={topCoins} />
    </div>
    </div>
  )
}
