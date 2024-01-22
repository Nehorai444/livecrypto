import React from 'react'
import Coin from './Coin'
import "../App.css"
import Loader from './Loader'
import { useTranslation } from 'react-i18next';
export default function CoinsList(props) {
    const { t } = useTranslation();
    return (
        <div className='coinList'>
            <h2 id='titleCoinList'>{t('receivedTradeDataTitle')}</h2>
            <ul>
                {props.data.length > 0 ? props.data.map((val, index) => (
                    <li key={index}>
                        <Coin val={val} index={index} />
                    </li>
                )) : <Loader />}
            </ul>
        </div>
    )
}
