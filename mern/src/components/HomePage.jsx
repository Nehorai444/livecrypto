import React, { useEffect, useState } from 'react'
import CoinsList from './CoinsList';
import { useTranslation } from 'react-i18next';

export default function HomePage(props) {
  const [topCoins, setTopCoins] = useState([]);
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  let filteredArr;

  const handleSearch = (e) => {
    let txt = e.target.value; // Get the value from the search input

    setSearchText(txt);

    // If the search input is empty, sort the data by opening price and set the topCoins state to the first 10 items
    if (!txt) {
      filteredArr = props.data.sort((a, b) => b.openingPrice - a.openingPrice);
    } else {
      filteredArr = props.data.filter(val => val.tradingPair.includes(txt.toUpperCase()))
        .sort((a, b) => b.openingPrice - a.openingPrice);
    }

    setTopCoins(filteredArr.slice(0, 10));
  }

  useEffect(() => {
    // If the data is received, sort it by opening price and set the topCoins state to the first 10 items
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
          placeholder={t('searchPlaceholder')}
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div>
        <h1>{t('topCoinsTitle')}</h1>
        <CoinsList data={topCoins} />
      </div>
    </div>
  )
}
