import React, { useEffect, useState } from 'react'
import CoinsList from './CoinsList';
import { useTranslation } from 'react-i18next';

export default function HomePage(props) {
  const [topCoins, setTopCoins] = useState([]);
  const [searchText, setSearchText] = useState('');
  let filteredArr;
  const { t } = useTranslation();

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
